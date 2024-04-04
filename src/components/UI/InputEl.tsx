type InputElProps = {
  placeholder: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: string;
  formik: any;
};

export default function InputEl({
  formik,
  type = 'text',
  id,
  placeholder,
}: InputElProps) {
  return (
    <label className='formlabel'>
      <input
        value={formik.values[id]}
        onChange={formik.handleChange}
        className='formInput'
        type={type}
        id={id}
        placeholder={placeholder}
      />
    </label>
  );
}
