import fastify from 'fastify'
import { ResponsePayload } from './interfaces';
import { Translate } from './translator';
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
  const translatedText = await Translate(body.content, 'ja-JP', 'en-US')
  const response: ResponsePayload = {
    content: translatedText,
    language: 'en-US',
    voice: {
      type: 'en-US-Standard-D',
      speed: 1
    }
  };
  reply.code(200).send(response);
});

app.post('/ja-translate', async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, 'en-US', 'ja-JP')
  const response: ResponsePayload = {
    content: translatedText,
    language: 'ja-JP',
    voice: {
      type: 'ja-JP-Standard-C',
      speed: 1
    }
  };
  reply.code(200).send(response);
});

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err
  app.log.info(`server listening on ${address}`)
});