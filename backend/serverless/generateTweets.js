const { Configuration, OpenAIApi } = require('openai');

const openAIRequestTweetsAbout = async (subject) => {
  const configuration = new Configuration({
    apiKey: process.env.API_KEY_OPENAI,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `Give me 3 tweets about: "${subject}". Return all tweets in a stringified javascript array of strings.`,
      temperature: 0.75,
      max_tokens: 300,
    });

    return completion;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    return error;
  }
};

const generateTweets = async (event) => {
  const query = new URLSearchParams(event.rawQuery).get('subject');
  const subject = decodeURIComponent(query);
  const tweets = await openAIRequestTweetsAbout(subject);

  return {
    statusCode: 200,
    body: JSON.stringify({
      tweets,
      subject,
    }),
  };
};

exports.handler = generateTweets;
