import { AdsObjType } from '../../types/types';
import AddCard from './AddCard';

//
type AdsListProps = {
  list?: (AdsObjType & { email: string })[];
};

export default function AddsList({ list }: AdsListProps) {
  return (
    <ul>
      {list?.map((aObj) => (
        <li key={aObj.id}>
          <AddCard item={aObj} />
        </li>
      ))}
    </ul>
  );
}
