import { useState } from 'react';
import useSWR from 'swr';
import { TWEET_GENERATE_ENDPOINT } from 'utils/constants';

const tweetsFetcher = (url, ...args) =>
  fetch(url, ...args).then((res) => res.json());

const useGenerate = () => {
  const [subject, setSubject] = useState();
  const { data, error, isLoading } = useSWR(
    subject && TWEET_GENERATE_ENDPOINT,
    tweetsFetcher
  );

  const generateTweets = (subject) => {
    setSubject(subject);
  };

  return { error, generateTweets, isGenerating: isLoading, tweets: data };
};

export default useGenerate;
