import { useEffect, useState } from 'react';
import { INPUT_ID, TWEET_GENERATE_ENDPOINT } from 'utils/constants';

import useFetch from './useFetch';

const useGenerate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [subject, setSubject] = useState(null);
  const { response, error, fetchData } = useFetch(TWEET_GENERATE_ENDPOINT, {
    subject: JSON.stringify(subject),
  });

  const generateTweets = (submit) => {
    setIsGenerating(true);
    setSubject(submit[INPUT_ID]);
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
