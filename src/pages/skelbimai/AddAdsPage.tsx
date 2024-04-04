import { useFormik } from 'formik';

//
type InputElProps = {
  name: string;

  type?: 'text' | 'email' | 'number' | 'date' | 'textarea';
  id: string;
};

function InputEl({ name, type = 'text', id }: InputElProps) {
  return (
    <label>
      {name}
      <input type={type} id={id} name={name} />
    </label>
  );
}

export default function AddAdsPage() {
  // add formik
  const formik = useFormik({});
  return (
    <div className='container'>
      <div className='adsContainer'>
        <h1 className='title'>Naujo skelbimo puslapis</h1>
        <p className='text'>Sveiki atvyke į skelbimo pridėjimo puslapąį.</p>
      </div>
      <form noValidate className='adsForm'>
        <InputEl name='Enter Title' id='title' type='text' />
        <label>Title: </label>
        <input type='text' name='title' placeholder='Enter title' />

        <label>Description: </label>
        <input
          type='text'
          name='description'
          placeholder='Provide Description'
        />

        <label>Price: </label>
        <input type='text' name='price' placeholder='Price' />

        <label>Phone: </label>
        <input type='text' name='phone' placeholder='Phone' />

        <label>Type:</label>
        <select id='type' name='type'>
          <option value='type1'>sell</option>
          <option value='type2'>buy</option>
          <option value='type3'>rent</option>
        </select>

        <label>Town:</label>
        <select id='town' name='town'>
          <option value='town1'>Vilnius</option>
          <option value='town2'>Kaunas</option>
          <option value='town3'>Klaipeda</option>
        </select>

        <label>Category:</label>
        <select id='category' name='category'>
          <option value='category1'>Neklinojamas turtas</option>
          <option value='category2'>Automobiliai</option>
          <option value='category3'>Drabuziai</option>
        </select>

        <button className='btn'>
          Pridėti skelbimą <i className='bi bi-plus-square'></i>
        </button>
      </form>
    </div>
  );
}
