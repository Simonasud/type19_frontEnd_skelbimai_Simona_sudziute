//
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AdsObjType } from '../../types/types';
import { beBaseurl } from '../../config';
import axios, { AxiosError } from 'axios';
import { getNiceDate } from '../../utils/helper';
import SinglePageSwiper from '../../components/UI/SinglePageSwiper';
import { useAuthCtx } from '../../store/AuthProvieder';

type AddParam = {
  adsId: string;
};

function SingleAddPage() {
  const { adsId }: AddParam = useParams() as AddParam;

  const { email, userId } = useAuthCtx();

  const [currentAdd, setCurrentAdd] = useState<
    (AdsObjType & { email: string }) | null
  >(null);
  console.log('currentAdd ===', currentAdd);
  // const isOwner = email === currentAdd?.email;
  const isOwner = true;

  // parsisiusti Add objekta

  const cUrl = `${beBaseurl}/ads/${adsId}`;

  useEffect(() => {
    getAdd(cUrl);
    console.log('cUrl ===', cUrl);
  }, [cUrl]);

  async function getAdd(url: string) {
    try {
      const resp = await axios.get(url);
      console.log('resp ===', resp);
      setCurrentAdd(resp.data);
    } catch (error) {
      console.warn('getAdd', error);
    }
  }

  const navigate = useNavigate();
  async function handleDeleteAdd() {
    try {
      const resp = await axios.delete(`${beBaseurl}/ads/${adsId}`, {
        data: { userId },
      });
      console.log('resp ===', resp);
      navigate('/ads');
    } catch (error) {
      const axiosErr = error as AxiosError;
      axiosErr.response?.data;
      console.log('axiosErr.response?.data ===', axiosErr.response?.data);
      console.warn('klaida traukiant');
    }
  }

  return (
    <div className='container  singleAdd'>
      <div className='singleAddContainer'>
        <div className='top'>
          <p className='adsType'>{currentAdd?.type}</p>
          <div className='singleAddTop'>
            <h1 className='singleTitle'>{currentAdd?.title}</h1>
            <p className='adsDate'>
              <span className='adsDateSpan'>Listed on:</span>{' '}
              {getNiceDate(currentAdd?.created_at || '')}
            </p>
          </div>
        </div>

        <div className='midle'>
          <SinglePageSwiper
            images={[
              currentAdd?.main_image_url || '',
              currentAdd?.image_1 || '',
              currentAdd?.image_2 || '',
              currentAdd?.image_3 || '',
              currentAdd?.image_4 || '',
              currentAdd?.image_5 || '',
            ]}
          />
        </div>
        <div className='bottom'>
          <p className='singleAddDescr'>{currentAdd?.description}</p>
          <p className='adsPrice'>Price starts: {currentAdd?.price}$</p>
          <p className='adsPhone'>Phone: {currentAdd?.phone}</p>

          <button className='btn'>
            <Link to={'/ads'}>
              <i className='bi bi-arrow-left'></i> Go back
            </Link>
          </button>
          {isOwner && (
            <button onClick={handleDeleteAdd} className='deleteBtn'>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleAddPage;
