import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Navbar.css';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';





const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const authId = sessionStorage.getItem('id');
    if (authId) {
      setUid(authId);
    }
    if (uid) dispatch(getUser(uid));

  }, [uid, dispatch]);



  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;