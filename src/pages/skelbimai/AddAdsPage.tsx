import { useFormik } from 'formik';
import { AdsFormType } from '../../types/types';
import InputEl from '../../components/UI/InputEl';
import { useEffect, useState } from 'react';
import MySelectDropdown from '../../components/UI/SelectEl';

const initFormValues: AdsFormType = {
  title: '',
  description: '',
  price: 0,
  phone: '',
  type: '',
  town: '',
  category: '',
};

export default function AddAdsPage() {
  const [fillAdd, setFillAdd] = useState(false);
  const [theme, setTheme] = useState('light'); // Temos būsena

  useEffect(() => {
    const isDarkModeEnabled = /* Jūsų sąlyga */ false; // Čia nustatote, ar tamsusis režimas įjungtas
    if (isDarkModeEnabled) {
      setTheme('dark'); // Jei tamsusis režimas įjungtas, nustatykite temą kaip tamsiąją
    } else {
      setTheme('light'); // Kitu atveju, nustatykite temą kaip šviesiąją
    }
  }, []);

  const formik = useFormik<AdsFormType>({
    initialValues: { ...initFormValues },
    onSubmit: (values) => {
      console.log('values ===', JSON.stringify(values, null, 2));
      // sendDataToBe(data)
    },
  });

  function sendDataToBe(data) {
    //
  }

  console.log('formik ===', formik);
  return (
    <div
      className={`container adsContainer header ${
        theme === 'dark' ? 'darkMode' : ''
      }`}
    >
      <div className=''>
        <h1 className='title'>Create New Listing Page</h1>
        <p className='text'>
          Ready to sell, rent, or trade? Create your listing now and let the
          world know!
        </p>
        <button onClick={() => setFillAdd(!fillAdd)} className='btn'>
          <i className='bi bi-plus-square'></i> Sukurti naują skelbimą
        </button>
      </div>
      {fillAdd && (
        <form onSubmit={formik.handleSubmit} noValidate className='adsForm'>
          <InputEl
            children='Title'
            formik={formik}
            id='title'
            type='text'
            placeholder='Enter listing title'
          />

          <InputEl
            children='Description'
            formik={formik}
            type='textarea'
            id='description'
            placeholder='Describe listing in a few words'
          />

          <InputEl
            children='Price'
            formik={formik}
            type='number'
            id='price'
            placeholder=''
          />

          <InputEl
            children='Phone'
            formik={formik}
            type='text'
            id='phone'
            placeholder='Provide contact number'
          />

          <MySelectDropdown
            placeholder='-- type --'
            value={formik.values.type}
            onChange={(selected) =>
              formik.setFieldValue('type', selected.value)
            }
            options={[
              { value: 'option1', label: 'buy' },
              { value: 'option2', label: 'sell' },
              { value: 'option3', label: 'rent' },
            ]}
          />

          <MySelectDropdown
            placeholder='-- town --'
            value={formik.values.town}
            onChange={(selected) =>
              formik.setFieldValue('town', selected.value)
            }
            options={[
              { value: 'option1', label: 'Vilnius' },
              { value: 'option2', label: 'Kaunas' },
              { value: 'option3', label: 'Klaipeda' },
            ]}
          />

          <MySelectDropdown
            placeholder='-- category --'
            value={formik.values.category}
            onChange={(selected) =>
              formik.setFieldValue('category', selected.value)
            }
            options={[
              { value: 'option1', label: 'Nekilnojamas turtas' },
              { value: 'option2', label: 'Automobiliai' },
              { value: 'option3', label: 'Drabužiai' },
            ]}
          />

          <button type='submit' className='btn'>
            Patvirtinti <i className='bi bi-check'></i>
          </button>
        </form>
      )}
    </div>
  );
}
