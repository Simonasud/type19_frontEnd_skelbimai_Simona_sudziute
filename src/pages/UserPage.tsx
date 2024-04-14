//Vartotojo informacija su forma kuria galima atnaujinti vartotojo varda ir paveiksleli

import { useEffect, useState } from 'react';

import { usersUrl } from '../config';
import axios, { AxiosResponse } from 'axios';
import { useAuthCtx } from '../store/AuthProvieder';
import { UserObjType } from '../types/types';
import { getNiceDate } from '../utils/helper';

export default function UserPage() {
  const { email, userId } = useAuthCtx();

  const [userFromBackObj, setUserFromBackObj] = useState<UserObjType>({
    NAME: '',
    created_at: '',
    email: '',
    PASSWORD: '',
    avatar_url: '',
  });
  const [username, setUsername] = useState(userFromBackObj.NAME);
  console.log('userFromBackObj ===', userFromBackObj);

  useEffect(() => {
    getUser(`${usersUrl}/${userId}`);
  }, [userId]);

  function getUser(url: string) {
    axios
      .get(url)
      .then((resp: AxiosResponse<UserObjType>) => {
        console.log('resp.data ===', resp.data);
        setUserFromBackObj(resp.data);
      })

      .catch((error) => {
        console.warn('ivyko klaida:', error);
      });
  }
  return (
    <div>
      <div className='container'>
        <div>
          {userId ? ( // Check if userId is available
            <div>
              <h1>Welcome {email}</h1>
              {/* Your API call using userId */}
            </div>
          ) : (
            <p className='alert'>Please log in to view your profile.</p>
          )}
        </div>

        <h3 className='userName'>Username: </h3>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            placeholder='Username'
          />
          <button className='btn'>Update</button>
        </div>

        <div>
          <input type='image' />
          <button className='btn'>Update avatar</button>
        </div>

        <div>
          <button className='btn'>Read more</button>

          <button className='deleteBtn'>Delete</button>

          <p className=''>
            Created on: {getNiceDate(userFromBackObj.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
