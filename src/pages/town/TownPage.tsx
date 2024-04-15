import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { TownType } from '../../types/types';
import { beBaseurl } from '../../config';
import { Link } from 'react-router-dom';

export default function TownPage() {
  const [townArr, setTownArr] = useState<TownType[] | null>(null);
  console.log(townArr);

  useEffect(() => {
    getTowns(`${beBaseurl}/town`);
  }, []);

  function getTowns(url: string) {
    axios
      .get(url)
      .then((resp: AxiosResponse) => {
        console.log('resp ===', resp.data);
        setTownArr(resp.data);
      })
      .catch((error: AxiosError) => {
        console.warn('ivyko klaida:', error.response?.data);
      });
  }

  return (
    <div className='container townPageContainer'>
      <h1 className='title'>TownPage</h1>
      <p className='text'>Welcome to town page</p>
      <ul className='cardContainerTown'>
        {townArr?.map((tObj) => (
          <li className='townCard' key={tObj.id}>
            <Link to={`/town/${tObj.id}`}>
              <h4 className='townTitle'>{tObj.name}</h4>
              <p className='townText'>{tObj.created_at}</p>
              <p className='townText'>Area: {tObj.area}km²</p>
              <p className='townText'>Population: {tObj.population}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
