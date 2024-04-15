//

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AdsObjType, TownType } from '../../types/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { beBaseurl, townUrl } from '../../config';

export default function SingleTownPage() {
  const { townId } = useParams() as { townId: string };

  console.log('townId ===', townId);

  const [curentTown, setCurentTown] = useState<TownType | null>(null);
  const [adsArr, setAdsArr] = useState<AdsObjType>([]);
  const currentTownUrl = `${townUrl}/${townId}`;

  useEffect(() => {
    axios;
    getTownData(currentTownUrl);
    getAddData(`${beBaseurl}/ads/byTown/${townId}`);
  }, [currentTownUrl, townId]);

  function getTownData(url: string) {
    axios
      .get(url)
      .then((resp: AxiosResponse<TownType>) => {
        console.log('resp.data ===', resp.data);
        setCurentTown(resp.data);
      })
      .catch((error: AxiosError) => {
        console.warn('ivyko klaida', error);
        console.warn('ivyko klaida', error.response?.data);
      });
  }
  function getAddData(url: string) {
    axios
      .get(url)
      .then((resp: AxiosResponse) => {
        console.log('resp.data ===', resp.data);
        setAdsArr(resp.data);
      })
      .catch((error: AxiosError) => {
        console.warn('getAds ivyko klaida', error);
        console.warn('getAds ivyko klaida', error.response?.data);
      });
  }
  return (
    <div>
      <h1>{curentTown?.name}</h1>
      <p>Welcome to SingleTownPage</p>
      <p>{curentTown?.created_at}</p>
      <p>{curentTown?.area}</p>
      <p>{curentTown?.population}</p>
    </div>
  );
}
