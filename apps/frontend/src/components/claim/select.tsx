import { useFormContext } from 'react-hook-form';

const Select = (props: any) => {
  const {
    formState: { errors, isSubmitSuccessful },
    register,
  } = useFormContext();
  const { label, children } = props;
  return (
    <div className="flex flex-col">
      <div className="mb-2">{label}</div>
      <select
        disabled={isSubmitSuccessful}
        {...register(props.name, { required: true })}
        className="p-2 text-black placeholder-black"
        {...props}
      >
        {children}
      </select>
      <div style={{ color: 'red', fontSize: 12, height: 15 }}>
        {!!errors[props.name] && 'Invalid Data'}
      </div>
    </div>
  );
};

export default Select;
