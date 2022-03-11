import fastify from "fastify";
import { Translate } from "./translator";
import fetch from "node-fetch";

const app = fastify({
  logger: true,
});

app.get("/ping", async (request, reply) => {
  reply.code(200).send({ pong: 1 });
});

app.post("/warai", async (request, reply) => {
  const body = request.body as RequestPayload;

  const laughs = {
    hw: { regex: new RegExp(`hw+|ｈｗ+$`), prefix: "", iter: "は" },
    aw: { regex: new RegExp(`aw+|ａｗ+$`), prefix: "あ", iter: "は" },
    kw: { regex: new RegExp(`kw+|ｋｗ+$`), prefix: "", iter: "クッ" },
    ow: { regex: new RegExp(`ow+|ｏｗ+$`), prefix: "お", iter: "ほ" },
    yw: { regex: new RegExp(`yw+|ｙｗ+$`), prefix: "や", iter: "は" },
  };

  const max = 20;

  for (const [key, value] of Object.entries(laughs)) {
    body.content = body.content.replace(value.regex, (a, pos, c) => {
      let len = c.slice(pos).length > max ? max : c.slice(pos).length - 1;
      return value.prefix + value.iter.repeat(len);
    });
  }

  const response: ResponsePayload = {
    content: body.content,
    language: "ja-JP",
    voice: {
      type: body.voice.type,
      pitch: body.voice.pitch,
      speed: body.voice.speed,
    },
  };

  reply.code(200).send(response);
});

app.post("/ja2onduru", async (request, reply) => {
  const body = request.body as RequestPayload;
  const encoded = encodeURI(body.content);
  const res = await fetch(
    "https://smdn.jp/works/tools/junk/OndulishTranslator/bin/OndulishTranslator.exe",
    { method: "post", body: `text=${encoded}` }
  );
  const text = await res.text();
  const response: ResponsePayload = {
    content: text,
    language: "ja-JP",
    voice: {
      type: "ja-JP-Standard-C",
      speed: 1,
    },
  };
  reply.code(200).send(response);
});

app.post("/ja2en", async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, "ja-JP", "en-US");
  const response: ResponsePayload = {
    content: translatedText,
    language: "en-US",
    voice: {
      type: "en-US-Standard-D",
      speed: 1,
    },
  };
  reply.code(200).send(response);
});

app.post("/en2ja", async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, "en-US", "ja-JP");
  const response: ResponsePayload = {
    content: translatedText,
    language: "ja-JP",
    voice: {
      type: "ja-JP-Standard-C",
      speed: 1,
    },
  };
  reply.code(200).send(response);
});

app.post("/ja2id", async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, "ja-JP", "id-ID");
  const response: ResponsePayload = {
    content: translatedText,
    language: "id-ID",
    voice: {
      type: "id-ID-Standard-B",
      speed: 1,
    },
  };
  console.log(response);
  reply.code(200).send(response);
});

app.post("/id2ja", async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, "id-ID", "ja-JP");
  const response: ResponsePayload = {
    content: translatedText,
    language: "ja-JP",
    voice: {
      type: "ja-JP-Standard-C",
      speed: 1,
    },
  };
  console.log(response);
  reply.code(200).send(response);
});

app.post("/ja2fr", async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, "ja-JP", "fr-CA");
  const response: ResponsePayload = {
    content: translatedText,
    language: "fr-CA",
    voice: {
      type: "fr-CA-Standard-B",
      speed: 1,
    },
  };
  console.log(response);
  reply.code(200).send(response);
});

app.post("/fr2ja", async (request, reply) => {
  const body = request.body as RequestPayload;
  const translatedText = await Translate(body.content, "fr-CA", "ja-JP");
  const response: ResponsePayload = {
    content: translatedText,
    language: "ja-JP",
    voice: {
      type: "ja-JP-Standard-C",
      speed: 1,
    },
  };
  console.log(response);
  reply.code(200).send(response);
});

app.listen(3000, "0.0.0.0", (err, address) => {
  if (err) throw err;
  app.log.info(`server listening on ${address}`);
});
