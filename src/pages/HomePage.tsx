//

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AdsObjType } from '../types/types';
import { beBaseurl } from '../config';
import { AdsFilters } from '../components/ads/AdsFilters';
import AddsList from '../components/ads/AddsList';

function HomePage() {
  const [adsArr, setAdsArr] = useState<
    (AdsObjType & { email: string })[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string>('');
  console.log('adsArr ===', adsArr);

  const [sortOptVal, setSortOptVal] = useState('');

  let sortedArr = adsArr ? [...adsArr] : [];

  switch (sortOptVal) {
    case 'price-min-to-max':
      console.log('price-min-to-max sort');
      sortedArr.sort((a, b) => a.price - b.price);
      break;
    case 'price-max-to-min':
      console.log('price-max-to-min sort');
      sortedArr.sort((a, b) => b.price - a.price);
      break;
    case 'date-max-to-min':
      console.log('date-max-to-min sort');
      sortedArr.sort((a, b) => {
        const aDateMs = new Date(a.category_id).getTime();
        const bDateMs = new Date(b.category_id).getTime();
        return aDateMs - bDateMs;
      });
      break;
    default:
      console.log('default sort');
      sortedArr = adsArr;
      break;
  }

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
          <AdsFilters onFilterChange={setFilterVal} />
          {/* <ul className='adsUl'>
            {adsArr?.map((aObj) => (
              <li key={aObj.id}>
                <AddCard item={aObj} />
              </li>
            ))}
          </ul> */}
        </div>
        <div>
          <p>active sort: {sortOptVal}</p>
          <select
            value={sortOptVal}
            onChange={(e) => setSortOptVal(e.target.value)}
          >
            <option value={''}>Sort By</option>
            <option value={'date-min-to-max'}>Pagal data</option>
            <option value={'price-min-to-max'}>Min price to max</option>
            <option value={'price-max-to-min'}>max price to min</option>
            <option value={'date-max-to-min'}>Latest</option>
            <option value={'town-a-to-z'}>By town a-z</option>
            <option value={'category-a-to-z'}>By category a-z</option>
            <option value={'type'}>By type</option>
          </select>
          <AddsList list={sortedArr} />
        </div>
        <div className='container'>
          <AdsFilters onFilterChange={setFilterVal} />
          {/* <ul className='adsUl'>
            {adsArr?.map((aObj) => (
              <li key={aObj.id}>
                <AddCard item={aObj} />
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
