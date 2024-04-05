import { useFormik } from 'formik';
import { AdsFormType } from '../../types/types';
import InputEl from '../../components/UI/InputEl';
import { useState } from 'react';

const initFormValues: AdsFormType = {
  title: 'Zolepjove "Huskis"',
  description: 'Nauja, greita, pirkta pries metus, puikiai pjauna zole',
  price: 90,
  phone: '+37807353',
  TYPE: 'sell',
  town: 'Klaipeda',
  category: 'Automobiliai',
};

export default function AddAdsPage() {
  const [fillAdd, setFillAdd] = useState(false);
  // add formik
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
    <div className='container'>
      <div className='adsContainer'>
        <h1 className='title'>Naujo skelbimo puslapis</h1>
        <p className='text'>Sveiki atvyke į skelbimo pridėjimo puslapąį.</p>

        <button onClick={() => setFillAdd(!fillAdd)} className='btn'>
          <i className='bi bi-plus-square'></i> Sukurti naują skelbimą
        </button>
      </div>
      <form onSubmit={formik.handleSubmit} noValidate className='adsForm'>
        <InputEl
          formik={formik}
          id='title'
          type='text'
          placeholder='Skelbimo pavadinimas'
        />

        <InputEl
          formik={formik}
          type='text'
          id='description'
          placeholder='Aprašykite savo skelbimą'
        />

        <InputEl
          formik={formik}
          type='number'
          id='price '
          placeholder='Kaina'
        />

        <InputEl
          formik={formik}
          type='text'
          id='phone'
          placeholder='Kontaktinis telefonas'
        />

        <select id='type' name='type'>
          <option value='' disabled selected>
            Pasirinkite skelbimo tipą
          </option>
          <option value='type1'>sell</option>
          <option value='type2'>buy</option>
          <option value='type3'>rent</option>
        </select>

        <select id='town' name='town'>
          <option value='' disabled selected>
            Pasirinkite miestą
          </option>
          <option value='town1'>Vilnius</option>
          <option value='town2'>Kaunas</option>
          <option value='town3'>Klaipeda</option>
        </select>

        <select id='category' name='category'>
          <option value='' disabled selected>
            Pasirinkite kategorija
          </option>
          <option value='category1'>Neklinojamas turtas</option>
          <option value='category2'>Automobiliai</option>
          <option value='category3'>Drabuziai</option>
        </select>

        <button type='submit' className='btn'>
          Patvirtinti <i className='bi bi-check'></i>
        </button>
      </form>
    </div>
  );
}
