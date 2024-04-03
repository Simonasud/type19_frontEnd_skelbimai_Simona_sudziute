//
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  useEffect(() => {
    getAdd(`${beBaseurl}/ads/${adsId}`);
  }, [adsId]);

  async function getAdd(url: string) {
    try {
      const resp = await axios.get(url);
      console.log('resp ===', resp);
      setCurrentAdd(resp.data);
    } catch (error) {
      console.warn('getAdd', error);
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
        </div>
        <div className='midle'>
          <img
            src={'/img/' + currentAdd?.main_image_url}
            alt={currentAdd?.title}
          />
        </div>
        <div className='right'>
          <h1>{currentAdd?.title}</h1>
          <p>{currentAdd?.description}</p>
          <div className='bottom'>
            <button className='btn'>Go back</button>
            <button className='btn'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAddPage;
