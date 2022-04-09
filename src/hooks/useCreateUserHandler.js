import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import app from '../firebase.init';

export default function useCreateUserHandler() {
    const [userData, setUserData] = useState('');
    const [errorMessages, setErrorMessage] = useState('');

    const auth = getAuth(app);

    const verifyEmailAddress = () => {
        sendEmailVerification(auth.currentUser)
            .then((res) => {
                console.log(res);
            })
    }
    const createNewUserHandler = ({ name,email, password }) => {
        if (password.length < 6) return setErrorMessage('Password should be at least 6 characters.brother.');
        ;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUserData(user)
                setErrorMessage('')
                updateUser(name)
                // verifyEmailAddress();
            })
            .catch((error) => {
                const errorMessage = error.message;
                setUserData(errorMessage)
                setErrorMessage(errorMessage || '')
            })
            


    }
    const existingUserHandler = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUserData(user)
                setErrorMessage('')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage)


            });



    }
    const updateUser = (name) => {
        console.log('name',name);
        updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            // Profile updated!
            // ...
            setErrorMessage('User Register successfully!')
          }).catch((error) => {
            setErrorMessage(error.message)
            // An error occurred
            // ...
          });
    }
    const resetPassword = ({ email }) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage('Reset email sent')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage)
            });
    }


    return [createNewUserHandler, existingUserHandler, resetPassword,updateUser, errorMessages, userData]
}
