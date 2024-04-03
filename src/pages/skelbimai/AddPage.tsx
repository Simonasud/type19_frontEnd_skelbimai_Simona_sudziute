//

import axios from 'axios';
import { useEffect, useState } from 'react';

function AddPage() {
  const [adsArr, setAdsArr] = useState(null);

  useEffect(() => {}, []);

  function getAds() {
    // su axios gaunam postus ir irasome i tripsArr
    axios.get();
  }

  return (
    <div>
      <div className='container'>
        <h1>AddPage</h1>
        <p>Wlcome to Add Page</p>
      </div>
    </div>
  );
}

export default AddPage;
