import { Link } from 'react-router-dom';
import { AdsObjType } from '../../types/types';

//
type AddCardProps = {
  item: Omit<AdsObjType, 'description'>;
};

export default function AddCard({ item }: AddCardProps) {
  return (
    <div className='adsCard'>
      <img src={'/img/' + item.main_image_url} alt={item.title} className='' />
      <h2>{item.title}</h2>
      <p className='adsPrice'>
        {item.price} <span className='adsSpan'>eur</span>
      </p>
      <Link to={'/'}>
        <button className='btn'>Read more</button>
      </Link>
    </div>
  );
}
