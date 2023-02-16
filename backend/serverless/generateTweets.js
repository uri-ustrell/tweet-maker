const generateTweets = async (event) => {
  const subject = new URLSearchParams(event.rawQuery).get('subject');

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      subject,
    }),
  };
};

exports.handler = generateTweets;
