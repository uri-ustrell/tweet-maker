import { rest } from 'msw';
import { TWEET_GENERATE_ENDPOINT } from 'utils/constants';

const handlers = [
  rest.get(TWEET_GENERATE_ENDPOINT, (req, res, ctx) => {
    const query = new URLSearchParams(req.url.search).get('subject');
    const subject = decodeURIComponent(query);
    console.log(subject);

    return res(
      ctx.json({
        tweets:
          'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        request: req,
      })
    );
  }),
];

export default handlers;
