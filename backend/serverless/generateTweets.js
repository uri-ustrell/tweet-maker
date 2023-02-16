const generateTweets = async (event) => {
  const { rawQuery: subject } = event;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      subject,
    }),
  };
};

exports.handler = generateTweets;
