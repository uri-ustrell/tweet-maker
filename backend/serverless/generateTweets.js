const generateTweets = async (event) => {
  const query = new URLSearchParams(event.rawQuery).get('subject');
  const subject = decodeURIComponent(query);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      subject,
    }),
  };
};

exports.handler = generateTweets;
