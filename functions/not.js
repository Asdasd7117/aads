const axios = require('axios');

exports.handler = async function(event, context) {
  const API_KEY = 'VKJWBCOHQYK8HP4JQPIP0TA9ICRHFVXQRA5K4Y3WW56MKNJA80FKMIGL6TS5ZCKYLBM01K2SZCSEWPRA';
  console.log('Function started, API_KEY:', API_KEY ? 'Found' : 'Not found');

  const TARGET_URL = 'https://btc240.netlify.app/';
  const jsScenario = {
    instructions: [
      { wait: 1 } // تقليل الانتظار إلى 1 ثانية
    ]
  };

  const params = {
    api_key: API_KEY,
    url: TARGET_URL,
    render_js: false, // تعطيل التنفيذ لتقليل الوقت
    js_scenario: JSON.stringify(jsScenario)
  };

  try {
    console.log('Sending request to ScrapingBee with params:', JSON.stringify(params));
    const response = await axios.get('https://app.scrapingbee.com/api/v1/', { params, timeout: 3000 }); // تقليل إلى 3 ثوانٍ
    console.log('Response received, status:', response.status);
    const result = {
      statusCode: 200,
      body: JSON.stringify({
        message: response.data.includes('ad-') || response.data.includes('advert')
          ? 'Ad loaded successfully'
          : 'Ad not loaded',
        dataSnippet: response.data.substring(0, 200)
      })
    };
    return result;
  } catch (error) {
    console.error('Error details:', error.message, error.response ? error.response.status : 'No status');
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: `Request failed: ${error.message}`,
        status: error.response ? error.response.status : 'Unknown'
      })
    };
  }
};
