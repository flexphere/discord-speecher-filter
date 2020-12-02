import fastify from 'fastify'
import { applyFilters, removeCodeBlock, removeQuote, removeURL, emojiToLabel } from "./filters";
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;
const googleCreds = require('../key.json');

interface RequestPayload {
  content: string
}

const app = fastify({
  logger: true
})

app.get('/ping', async (request, reply) => {
  reply.code(200).send({ pong: 1 })
});

app.post('/en-translate', async (request, reply) => {
  const body = request.body as RequestPayload;
  const content = applyFilters(body.content, [removeCodeBlock, removeQuote, removeURL, emojiToLabel]);
  const translationClient = new TranslationServiceClient();
  const [result] = await translationClient.translateText({
    parent: translationClient.locationPath(googleCreds.project_id, 'global'),
    contents: [content],
    mimeType: 'text/plain',
    sourceLanguageCode: 'ja-JP',
    targetLanguageCode: 'en-US',
  });
  reply.code(200).send({ content: result.translations[0].translatedText, language: 'en-US' })
});

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err
  app.log.info(`server listening on ${address}`)
});