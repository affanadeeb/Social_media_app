const axios = require('axios');

const translateText = async (text, targetLanguage) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
      },
      data: `q=${encodeURIComponent(text)}&target=${targetLanguage}&source=en`
    };

    const response = await axios.request(options);
    
    if (response.data?.data?.translations?.[0]?.translatedText) {
      return response.data.data.translations[0].translatedText;
    } else {
      throw new Error('Invalid translation response');
    }
  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    return `${text} (Translation failed: ${error.response?.data?.message || error.message})`;
  }
};

const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      {
        inputs: text,
        parameters: {
          max_length: 130,
          min_length: 30,
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data[0] && response.data[0].summary_text) {
      return response.data[0].summary_text;
    } else {
      throw new Error('Invalid summarization response');
    }
  } catch (error) {
    console.error('Summarization error:', error.response?.data || error.message);
    // Fallback to simple summarization if API fails
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    if (sentences.length <= 2) return text;
    return `${sentences[0]}. ${sentences[sentences.length - 1]}.`;
  }
};

module.exports = { translateText, summarizeText }; 