//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseurl } from '../../config';
import { AdsObjType } from '../../types/types';

import AddCard from '../../components/ads/AddCard';
import FilterBox from '../../components/UI/FilterBox';

function AdsPage() {
  const [adsArr, setAdsArr] = useState<AdsObjType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  console.log('adsArr ===', adsArr);

  useEffect(() => {
    setIsLoading(true);
    getAds(`${beBaseurl}/ads`).then((data) => {
      setAdsArr(data);
      setIsLoading(false);
    });
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
        setIsError('Something went wrong, please try later');
        return null;
      });
  }

  return (
    <div className='container'>
      <div className='adsContainer'>
        <h1 className='title'>Adds</h1>
        <p className='text'>Welcome to Adds Page</p>
        {isLoading && <p className='adsAlert'>Loading...</p>}
        {isError && <p className='adsError'>{isError}</p>}
        <ul className='adsUl'>
          {adsArr?.map((aObj) => (
            <li key={aObj.id}>
              <AddCard item={aObj} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AdsFilters() {
  return (
    <div>
      <FilterBox title='Filter by town'>
        <div>pagal</div>
        <div>pagal</div>
        <div>pagal</div>
      </FilterBox>
    </div>
  );
}

export default AdsPage;
