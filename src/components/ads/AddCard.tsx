import { Link } from 'react-router-dom';
import { AdsObjType } from '../../types/types';
import { useAuthCtx } from '../../store/AuthProvieder';
import cl from 'classnames';

//
type AddCardProps = {
  item: Omit<AdsObjType, 'description'> & { email: string };
};

export default function AddCard({ item }: AddCardProps) {
  const { email } = useAuthCtx();
  const cardClass = cl('adsCard', {
    adsCardByUser: email === item.email,
    loggedInUserCard: email === item.email,
  });

  return (
    // <div className={cl('adsCard', { adsCardByUser: email === item.email })}>
    <div className={cardClass}>
      <img src={'/img/' + item.main_image_url} alt={item.title} className='' />
      <h2>{item.title}</h2>
      <p>{item.email}</p>
      <p>{item.price}</p>

      <Link to={`/ads/${item.id}`}>
        <button className='btn'>
          Sužinok daugiau <i className='bi bi-caret-right'></i>
        </button>
      </Link>
    </div>
  );
}
