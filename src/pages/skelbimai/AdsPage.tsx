//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { beBaseurl } from '../../config';
import { AdsObjType } from '../../types/types';
import AddCard from '../../components/ads/AddCard';

function AdsPage() {
  const [adsArr, setAdsArr] = useState<
    (AdsObjType & { email: string })[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  console.log('adsArr ===', adsArr);

  const [filterVal, setFilterVal] = useState('');

  //filter?price=300
  useEffect(() => {
    if (filterVal) {
      getPosts(`${beBaseurl}/ads/${filterVal}`);
    } else {
      getPosts(`${beBaseurl}/ads`);
    }
  }, [filterVal]);

  function getPosts(url: string) {
    setIsLoading(true);
    // su axios gaunam postus ir irasome i tripsArr
    axios
      .get(url)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setAdsArr(resp.data);
      })
      .catch((error: Error) => {
        console.log('error ===', error);
        setIsError('Something went wrong, please try later');
        return null;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className='adsPage'>
      <div className='container adsContainer'>
        <h1 className='title'>Adds</h1>
        <p className='text'>Welcome to Adds Page</p>
        {isLoading && <p className='adsAlert'>Loading...</p>}
        {isError && <p className='adsError'>{isError}</p>}
        <div className='container'>
          <ul className='adsUl'>
            {adsArr?.map((aObj) => (
              <li key={aObj.id}>
                <AddCard item={aObj} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdsPage;
