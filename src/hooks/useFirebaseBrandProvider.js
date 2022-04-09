import { FacebookAuthProvider, getAuth, getRedirectResult, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import app from '../utilitis/firebase.init';

export default function useFirebaseBrandProvider() {
  const { user, message, setMessage } = useContext(GlobalContext)
  const [userData, setUserData] = useState();
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user)
      } else {
        setUserData({})
      }
    });

  }, [])

  const authorizationHandler = (provider, authProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = authProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        setUserData(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage)
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = authProvider.credentialFromError(error);
        // ...
      });

  }
  const signInWithRedirect = (provider, authProvider) => {
    getRedirectResult(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = authProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUserData(user)

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage)

        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = authProvider.credentialFromError(error);
        // ...
      });
  }
  const handleSignOut = () => {

    signOut(auth).then(() => {
      setUserData({})
    }).catch((error) => {
      setUserData({})
    });
  }

  const googleAuthorizationHandler = () => authorizationHandler(googleProvider, GoogleAuthProvider)
  const githubAuthorizationHandler = () => authorizationHandler(gitProvider, GithubAuthProvider)
  const facebookAuthorizationHandler = () => authorizationHandler(facebookProvider, FacebookAuthProvider)

  const googleRedirectAuthorization = () => signInWithRedirect(googleProvider, GoogleAuthProvider)
  return { googleAuthorizationHandler, githubAuthorizationHandler, facebookAuthorizationHandler, googleRedirectAuthorization, handleSignOut }
}
