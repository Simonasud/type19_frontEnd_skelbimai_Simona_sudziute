//

import { useEffect, useState } from 'react';
import { AdsObjType } from '../types/types';
import axios from 'axios';
import AddCard from '../components/ads/AddCard';
import { beBaseurl } from '../config';
import { useAuthCtx } from '../store/AuthProvieder';

function UserAds() {
  const { userId } = useAuthCtx();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myAdsArr, setMyAdsArr] = useState<AdsObjType[] | null>(null);
  const [isError, setIsError] = useState<string>('');
  // parsiusti visus adus
  useEffect(() => {
    if (userId) {
      getUserAds(`${beBaseurl}/ads/user/id/userId`);
    }
  }, [userId]);

  function getUserAds(url: string) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        setMyAdsArr(resp.data);
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

  // kreiptis i backend
  // GET - /ads/user/1 - 1 yra userId sis routes is backend  parsiuncia visus adds
  return (
    <div className='container'>
      <h1 className='title'>UserAds</h1>
      <p className='text'>Welcome to UserAds</p>
      {isLoading && <p className='adsAlert'>Loading...</p>}
      {isError && <p className='adsError'>{isError}</p>}
      <ul className='myAds'>
        {myAdsArr?.map((mObj) => (
          <li key={mObj.user_id}>
            <AddCard item={mObj} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserAds;
