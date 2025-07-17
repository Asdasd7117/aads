const axios = require('axios');

exports.handler = async function(event, context) {
  const API_KEY = 'VKJWBCOHQYK8HP4JQPIP0TA9ICRHFVXQRA5K4Y3WW56MKNJA80FKMIGL6TS5ZCKYLBM01K2SZCSEWPRA';
  const TARGET_URL = 'https://btc240.netlify.app/';
  const waitTime = Math.floor(Math.random() * 21) + 20;

  const jsScenario = {
    instructions: [
      { wait: 10 },
      { wait: waitTime },
      { scroll_y: 500 },
      { scroll_y: 1000 },
      { wait: 5 }
    ]
  };

  const params = {
    api_key: API_KEY,
    url: TARGET_URL,
    render_js: true,
    js_scenario: JSON.stringify(jsScenario)
  };

  try {
    const response = await axios.get('https://app.scrapingbee.com/api/v1/', { params, timeout: 150000 });
    if (response.data.includes('ad-') || response.data.includes('advert')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Ad loaded successfully' })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Ad not loaded', response: response.data.substring(0, 500) })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
