const axios = require('axios');
require('dotenv').config();

// Translation using RapidAPI (Google Translate)
async function translateText(text, targetLanguage) {
  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: {
      q: text,
      target: targetLanguage
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text');
  }
}

// Summarization using Hugging Face API
async function summarizeText(text) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: text,
        parameters: {
          max_length: 130,
          min_length: 30
        }
      }
    });

    return response.data[0].summary_text;
  } catch (error) {
    console.error('Summarization error:', error);
    throw new Error('Failed to summarize text');
  }
}

// Text to Audio (placeholder - you can implement this later)
async function textToAudio(text) {
  // Implement text-to-audio conversion here
  throw new Error('Text to audio conversion not implemented');
}

module.exports = {
  translateText,
  summarizeText,
  textToAudio
}; 