import { useForm } from 'react-hook-form';
import { FORM_ID, INPUT_ID } from 'utils/constants';
import labels from 'utils/constants/labels';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={FORM_ID}>
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
