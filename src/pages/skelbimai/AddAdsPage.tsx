import { useFormik } from 'formik';
import { AdsObjTypeNoId } from '../../types/types';
import InputEl from '../../components/UI/InputEl';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { beBaseurl } from '../../config';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/AuthProvieder';

const initFormValues: AdsObjTypeNoId = {
  title: '',
  description: '',
  price: 0,
  phone: '',
  type: '',
  user_id: 0,
  category_id: 0,
  town_id: 0,
  main_image_url: '',
};

export default function AddAdsPage() {
  const { userId } = useAuthCtx;
  const [fillAdd, setFillAdd] = useState(false);

  useEffect(() => {
    //
  }, []);

  const adsValidationsSchema = Yup.object({
    title: Yup.string().min(3).max(255).required(),
    description: Yup.string().min(3).max(255).required(),
    price: Yup.number().min(0).required(),
    phone: Yup.string().min(3).max(255).required(),
    type: Yup.string().required(),
    user_id: Yup.number(),
    town_id: Yup.number(),
    category_id: Yup.number(),
    main_image_url: Yup.string().min(3).required(),
  });

  const formik = useFormik<AdsObjTypeNoId>({
    initialValues: { ...initFormValues, user_id: userId },
    validationSchema: adsValidationsSchema,

    onSubmit: (values) => {
      console.log('values ===', JSON.stringify(values, null, 2));
      sendDataToBe(values);
    },
  });

  const navigate = useNavigate();

  function sendDataToBe(data: AdsObjTypeNoId) {
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
        const axiosErr = error as AxiosError;
        console.warn('sendDataTobe ivyko klaida: ');
        console.log(JSON.stringify(axiosErr.response?.data, null, 2));
        if (axiosErr.response?.data) {
          formik.setErrors(axiosErr.response.data);
        }
      });
    //
  }

  return (
    <div className='container adsContainer'>
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

          <InputEl
            children='Type'
            formik={formik}
            type='text'
            id='type'
            placeholder='Select type'
          />
          <option value='Type'></option>

          <InputEl
            children='Category'
            formik={formik}
            type='text'
            id='category_id'
            placeholder='Category'
          />

          <InputEl
            children='Town'
            formik={formik}
            type='text'
            id='town_id'
            placeholder='Town'
          />

          <button type='submit' className='btn'>
            Patvirtinti <i className='bi bi-check'></i>
          </button>
        </form>
      )}
    </div>
  );
}
