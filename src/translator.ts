import googleCreds from '../key.json';
const { TranslationServiceClient } = require('@google-cloud/translate').v3beta1;

export const Translate = async(content:string, from:string, to:string) => {
  const translationClient = new TranslationServiceClient();
  const [result] = await translationClient.translateText({
    parent: translationClient.locationPath(googleCreds.project_id, 'global'),
    contents: [content],
    mimeType: 'text/plain',
    sourceLanguageCode: from,
    targetLanguageCode: to,
  });
  return result.translations[0].translatedText;
}