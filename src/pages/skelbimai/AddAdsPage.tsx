import { useFormik } from 'formik';
import { AdsFormType } from '../../types/types';
import InputEl from '../../components/UI/InputEl';
import { useEffect, useState } from 'react';
import MySelectDropdown from '../../components/UI/SelectEl';
import axios from 'axios';
import { beBaseurl } from '../../config';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const initFormValues: AdsFormType = {
  title: '',
  description: '',
  price: 0,
  phone: '',
  TYPE: '',
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

  const AdsValidationSchema = Yup.object({
    title: Yup.string().min(3).max(255).required(),
    description: Yup.string().min(3).max(255).required(),
    price: Yup.number().min(0).required(),
    phone: Yup.string().min(3).max(255).required(),
    TYPE: Yup.string().required(),
    town: Yup.string().required(),
    category: Yup.string().required(),
  });

  const formik = useFormik<AdsFormType>({
    initialValues: { ...initFormValues },
    validationSchema: AdsValidationSchema,

    onSubmit: (values) => {
      console.log('values ===', JSON.stringify(values, null, 2));
      sendDataToBe(values);
    },
  });

  const navigate = useNavigate();

  function sendDataToBe(data: AdsFormType) {
    axios
      .post(`${beBaseurl}/ads`, data)
      .then((resp) => {
        console.log('resp ===', resp);
        if (resp.status === 200) {
          navigate('/ads');
        } else {
          console.warn('something wrong with back end status');
        }
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
    //
  }

  console.log('formik.errors ===', formik.errors);

  console.log('formik ===', formik.values);

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
            TYPE={formik.values.TYPE} // Pakeičiama 'value' į 'TYPE'
            onChange={
              (selected) => formik.setFieldValue('TYPE', selected.value) // Pakeičiama 'type' į 'TYPE'
            }
            options={[
              { value: 'option1', label: 'buy' },
              { value: 'option2', label: 'sell' },
              { value: 'option3', label: 'rent' },
            ]}
            errorMessage={formik.errors.TYPE} // Pakeičiama 'errorMessage' į 'formik.errors.TYPE'
          />

          <MySelectDropdown
            placeholder='-- town --'
            town={formik.values.town} // Pakeičiama 'value' į 'town'
            onChange={(selected) =>
              formik.setFieldValue('town', selected.value)
            }
            options={[
              { value: 'option1', label: 'Vilnius' },
              { value: 'option2', label: 'Kaunas' },
              { value: 'option3', label: 'Klaipeda' },
            ]}
            errorMessage={formik.errors.town} // Pakeičiama 'errorMessage' į 'formik.errors.town'
          />
          <MySelectDropdown
            placeholder='-- category --'
            category={formik.values.category} // Pakeičiama 'value' į 'category'
            onChange={(selected) =>
              formik.setFieldValue('category', selected.value)
            }
            options={[
              { value: 'option1', label: 'Nekilnojamas turtas' },
              { value: 'option2', label: 'Automobiliai' },
              { value: 'option3', label: 'Drabužiai' },
            ]}
            errorMessage={formik.errors.category} // Pakeičiama 'errorMessage' į 'formik.errors.category'
          />

          <button type='submit' className='btn'>
            Patvirtinti <i className='bi bi-check'></i>
          </button>
        </form>
      )}
    </div>
  );
}
