import { useEffect, useState } from 'react';
import FilterBox from '../UI/FilterBox';
import axios from 'axios';
import { beBaseurl } from '../../config';

//Filtravimas pagal miesta, kategorija, tipa, kaina

type AdsFilterProps = {
  onFilterChange: React.Dispatch<React.SetStateAction<string>>;
};
export function AdsFilters({ onFilterChange }: AdsFilterProps) {
  const [townSelVal, setTownSelVal] = useState('all');
  const [categorySelVal, setCategorySelVal] = useState('all');
  const [typeSelVal, setTypeSelVal] = useState('all');
  const [priceSelVal, setPriceSelVal] = useState('all');

  useEffect(() => {
    let finalFilterString = `/filter?`;
    if (townSelVal !== 'all') finalFilterString += `town=${townSelVal}`;
    if (categorySelVal !== 'all')
      finalFilterString += `&category=${categorySelVal}`;
    if (typeSelVal !== 'all') finalFilterString += `&type=${typeSelVal}`;
    if (priceSelVal !== 'all') finalFilterString += `&price=${priceSelVal}`;
    console.log('finalFilterString ===', finalFilterString);
    onFilterChange(finalFilterString);
  }, [townSelVal]);

  const [townsArr, setTownsArr] = useState<{ town_name: string }[]>([]);
  const [categoriesArr, setCategoriesArr] = useState<{ category: string }[]>(
    []
  );
  const [typesArr, setTypesArr] = useState<{ type: string }[]>([]);
  const [priceArr, setPriceArr] = useState<{ price: number }[]>([]);

  useEffect(() => {
    getTown();
    getCategories();
    getTypes();
    getPrice();
  }, []);

  function getTown() {
    axios
      .get(`${beBaseurl}/ads/town`)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setTownsArr(resp.data);
      })
      .catch((error) => {
        console.warn('error ===', error);
      });
  }

  function getCategories() {
    axios
      .get(`${beBaseurl}/ads/filter/categories`)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setCategoriesArr(resp.data);
      })
      .catch((error) => {
        console.warn('error ===', error);
      });
  }

  function getTypes() {
    axios
      .get(`${beBaseurl}/ads/types`)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setTypesArr(resp.data);
      })
      .catch((error) => {
        console.warn('error ===', error);
      });
  }

  function getPrice() {
    axios
      .get(`${beBaseurl}/ads/price`)
      .then((resp) => {
        // console.log('resp.data ===', resp.data);
        setPriceArr(resp.data);
      })
      .catch((error) => {
        console.warn('error ===', error);
      });
  }

  const noActiveFilter =
    townSelVal === 'all' &&
    categorySelVal === 'all' &&
    typeSelVal === 'all' &&
    priceSelVal === 'all';

  return (
    <div>
      {!noActiveFilter && (
        <FilterBox className='filterTitleSecond' title='Active Filters'>
          {townSelVal !== 'all' && <p>Town: {townSelVal}</p>}
          {categorySelVal !== 'all' && <p>Category: {categorySelVal}</p>}
          {typeSelVal !== 'all' && <p>Type: {typeSelVal}</p>}
          {priceSelVal !== 'all' && <p>Price: {priceSelVal}</p>}
        </FilterBox>
      )}
      <FilterBox title='Filter by town'>
        <select
          value={townSelVal}
          onChange={(e) => setTownSelVal(e.target.value)}
          className='filterBox'
          aria-label='filter by town'
        >
          <option value={'all'}>Filter by town</option>
          {townsArr.map((tObj) => (
            <option key={tObj.town_name} value={tObj.town_name}>
              {tObj.town_name}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox title='Filter by category'>
        <select
          value={categorySelVal}
          onChange={(e) => setCategorySelVal(e.target.value)}
          className='filterBox'
          aria-label='filter by category'
        >
          {categoriesArr.map((cObj) => (
            <option key={cObj.category} value={cObj.category}>
              {cObj.category}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox title='Filter by type'>
        <select
          value={typeSelVal}
          onChange={(e) => setTypeSelVal(e.target.value)}
          className='filterBox'
          aria-label='filter by type'
        >
          {typesArr.map((cObj) => (
            <option key={cObj.type} value={cObj.type}>
              {cObj.type}
            </option>
          ))}
        </select>
      </FilterBox>
      <FilterBox title='Filter by price'>
        <select
          value={priceSelVal}
          onChange={(e) => setPriceSelVal(e.target.value)}
          className='filterBox'
          aria-label='filter by price'
        >
          {priceArr.map((cObj) => (
            <option key={cObj.price} value={cObj.price}>
              {cObj.price}
            </option>
          ))}
        </select>
      </FilterBox>
    </div>
  );
}
