//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseurl } from '../../config';
import { AdsObjType } from '../../types/types';

function AddsPage() {
  const [adsArr, setAdsArr] = useState<AdsObjType[] | null>(null);
  console.log('adsArr ===', adsArr);

  useEffect(() => {
    getAds(`${beBaseurl}/ads`).then((data) => setAdsArr(data));
  }, []);

  function getAds(url: string): Promise<AdsObjType[] | null> {
    // su axios gaunam postus ir irasome i tripsArr
    return axios
      .get(url)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        return resp.data;
      })
      .catch((error: Error) => {
        console.log('error ===', error);
        return null;
      });
  }

  return (
    <div className='container'>
      <div className='adsContainer'>
        <h1 className='adsTitle'>Adds</h1>
        <p className='adsText'>Welcome to Adds Page</p>
        <ul className='adsUl'>
          {adsArr?.map((aObj) => (
            <li className='' key={aObj.id}>
              {aObj.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddsPage;
