import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';


export default function PrivateRoute({ children }) {
  const { auth } = useContext(GlobalContext)
  const [user] = useAuthState(auth);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}