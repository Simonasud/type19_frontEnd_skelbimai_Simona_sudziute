//Vartotojo informacija su forma kuria galima atnaujinti vartotojo varda ir paveiksleli

import { useEffect, useState } from 'react';

import { beBaseurl, usersUrl } from '../config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAuthCtx } from '../store/AuthProvieder';
import { UserObjType } from '../types/types';
import { getNiceDate } from '../utils/helper';
import UpdateUserForm from '../components/auth/UpdateUserForm';

export default function UserPage() {
  const { email, userId } = useAuthCtx();

  const [userFromBackObj, setUserFromBackObj] = useState<UserObjType>({
    NAME: '',
    created_at: '',
    email: '',
    PASSWORD: '',
    avatar_url: '',
  });
  const [username, setUsername] = useState('');
  console.log('userFromBackObj ===', userFromBackObj);

  useEffect(() => {
    function getUser(url: string) {
      axios
        .get(url)
        .then((resp: AxiosResponse<UserObjType>) => {
          console.log('resp.data ===', resp.data);
          setUserFromBackObj(resp.data);
          setUsername(resp.data.NAME || '');
        })

        .catch((error) => {
          console.warn('ivyko klaida:', error);
        });
    }
    getUser(`${usersUrl}/${userId}`);
  }, [userId]);

  async function updateUsername() {
    try {
      await axios.put(`${beBaseurl}/update/name/${userId}`, {
        updateName: username,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.warn('ivyko klaida:', error.response?.data);
      } else {
        console.warn('ivyko klaida:', error);
      }
    }
  }

  return (
    <div>
      <div className='container'>
        <div>
          <h1>Welcome {email}</h1>
        </div>

        <h3 className='userName'>Username: </h3>
        <div>
          <input
            value={username} // Use current username state value
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder={username} // Optional: Use placeholder based on username state
          />
          <button className='btn' onClick={updateUsername}>
            Update
          </button>
        </div>

        <div>
          <button className='btn'>Read more</button>

          <button className='deleteBtn'>Delete</button>

          <p className=''>
            Created on: {getNiceDate(userFromBackObj.created_at)}
          </p>
          <hr />
          <UpdateUserForm
            email={userFromBackObj.email}
            name={userFromBackObj.NAME || ''}
            userId={userId}
            avatar_url={userFromBackObj.avatar_url || ''}
          />
        </div>
      </div>
    </div>
  );
}
