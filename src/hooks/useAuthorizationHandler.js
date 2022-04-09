import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
import app from '../firebase.init';


export default function useAuthorizationHandler() {
    const auth = getAuth(app);
    const [userData, setUserData] = useState({});

    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

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
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = authProvider.credentialFromError(error);
                // ...
            });

    }
    const googleAuthorizationHandler = () => authorizationHandler(googleProvider, GoogleAuthProvider)
    const githubAuthorizationHandler = () => authorizationHandler(gitProvider, GithubAuthProvider)
    const facebookAuthorizationHandler = () => authorizationHandler(facebookProvider, FacebookAuthProvider)

    const handleSignOut = () => {

        signOut(auth).then(() => {
            setUserData({})
        }).catch((error) => {
            setUserData({})
        });
    }

    return [googleAuthorizationHandler, githubAuthorizationHandler, facebookAuthorizationHandler, handleSignOut, userData]
}
