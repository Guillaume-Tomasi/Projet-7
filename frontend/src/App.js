import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/Routes/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const authId = sessionStorage.getItem('id');
    if (authId) {
      console.log(uid);
      setUid(authId);
    }
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;