import { rest } from 'msw';
import { TWEET_GENERATE_ENDPOINT } from 'utils/constants';

const handlers = [
  rest.get(TWEET_GENERATE_ENDPOINT, (req, res, ctx) => {
    return res(
      ctx.json({
        tweets:
          'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        requestPayload: req.json(),
      })
    );
  }),
];

export default handlers;
