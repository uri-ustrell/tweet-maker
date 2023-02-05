import { useEffect, useState } from 'react';
import { TWEET_GENERATE_ENDPOINT } from 'utils/constants';

import useFetch from './useFetch';

const useGenerate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [subject, setSubject] = useState(null);
  const { response, error, fetchData } = useFetch(TWEET_GENERATE_ENDPOINT, {
    body: JSON.stringify(subject),
  });

  const generateTweets = (subject) => {
    setIsGenerating(true);
    setSubject(subject);
  };

  useEffect(() => {
    if (response || error) {
      setIsGenerating(false);
    }
  }, [response, error]);

  useEffect(() => {
    if (subject) {
      fetchData();
    }
  }, [subject]);

  return { error, generateTweets, isGenerating, tweets: response };
};

export default useGenerate;
