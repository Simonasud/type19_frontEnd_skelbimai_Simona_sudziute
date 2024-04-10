//
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdsObjType } from '../../types/types';
import { beBaseurl } from '../../config';
import axios from 'axios';
import { getNiceDate } from '../../utils/helper';

type AddParam = {
  adsId: string;
};

function SingleAddPage() {
  const { adsId }: AddParam = useParams() as AddParam;

  const [currentAdd, setCurrentAdd] = useState<AdsObjType | null>(null);
  // parsisiusti Add objekta

  const cUrl = `${beBaseurl}/ads/${adsId}`;

  useEffect(() => {
    getAdd(cUrl);
    console.log('cUrl ===', cUrl);
  }, [cUrl]);

  async function getAdd(url: string) {
    try {
      const resp = await axios.get(url);
      console.log('resp ===', resp);
      setCurrentAdd(resp.data);
    } catch (error) {
      console.warn('getAdd', error);
    }
  }

  const navigate = useNavigate();
  async function handleDeleteAdd() {
    try {
      const resp = await axios.delete(`${beBaseurl}/:adsId`);
      console.log('resp ===', resp);
      navigate('/ads');
    } catch (error) {
      console.warn('error ===', error);
      console.warn('klaida traukiant');
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='left'>
          <p className=''>
            Add listed on: {getNiceDate(currentAdd?.created_at || '')}
          </p>
          <p>Price: {currentAdd?.price}</p>
          <p>{currentAdd?.TYPE}</p>
        </div>
        <div className='midle'>
          <img
            src={'/img/' + currentAdd?.main_image_url}
            alt={currentAdd?.title}
          />
        </div>
        <div className=''>
          <img src={'/img/' + currentAdd?.image_1} alt={currentAdd?.title} />
          <img src={'/img/' + currentAdd?.image_2} alt={currentAdd?.title} />
          <img src={'/img/' + currentAdd?.image_3} alt={currentAdd?.title} />
          <img src={'/img/' + currentAdd?.image_4} alt={currentAdd?.title} />
          <img src={'/img/' + currentAdd?.image_5} alt={currentAdd?.title} />
        </div>
        <div className='right'>
          <h1>{currentAdd?.title}</h1>
          <p>{currentAdd?.description}</p>

          <div className='bottom'>
            <button className='btn'>
              <i className='bi bi-arrow-left'></i> Go back
            </button>
            <button onClick={handleDeleteAdd} className='deleteBtn'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAddPage;
