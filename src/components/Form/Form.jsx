import useGenerate from 'hooks/useGenerate';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FORM_ID, INPUT_ID } from 'utils/constants';
import labels from 'utils/constants/labels';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { error, generateTweets, isGenerating, tweets } = useGenerate();

  // testing serverless functions:
  useEffect(() => {
    if (tweets) console.log(tweets);
  }, [tweets]);

  return (
    <form onSubmit={handleSubmit(generateTweets)} id={FORM_ID}>
      <label htmlFor={INPUT_ID}>{labels.form.input.label}</label>
      <input
        id={INPUT_ID}
        aria-invalid={errors.firstName ? 'true' : 'false'}
        {...register(INPUT_ID, { required: true })}
      />
      {errors.firstName && <span role='alert'>{labels.form.input.error}</span>}

      <button type='submit'>{labels.form.submit.label}</button>
    </form>
  );
}

export default Form;
