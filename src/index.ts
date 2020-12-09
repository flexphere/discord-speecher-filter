import fastify from 'fastify'
import { Translate } from './translator';

const app = fastify({
  logger: true
})

app.get('/ping', async (request, reply) => {
  reply.code(200).send({ pong: 1 })
});

app.post('/ja2en', async (request, reply) => {
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

app.post('/en2ja', async (request, reply) => {
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

app.post('/ja2id', async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, 'ja-JP', 'id-ID')
  const response: ResponsePayload = {
    content: translatedText,
    language: 'id-ID',
    voice: {
      type: 'id-ID-Standard-B',
      speed: 1
    }
  };
  console.log(response);
  reply.code(200).send(response);
});

app.post('/id2ja', async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, 'id-ID', 'ja-JP')
  const response: ResponsePayload = {
    content: translatedText,
    language: 'ja-JP',
    voice: {
      type: 'ja-JP-Standard-C',
      speed: 1
    }
  };
  console.log(response);
  reply.code(200).send(response);
});

app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err
  app.log.info(`server listening on ${address}`)
});