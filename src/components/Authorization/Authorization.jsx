import { LockClosedIcon } from '@heroicons/react/solid';
import React, { useContext, useEffect, useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
export default function Authorization({ login }) {
    const { auth } = useContext(GlobalContext)
    const [newUser, setNewUser] = useState({});
    const [user, loading, error] = useAuthState(auth);
    const [userMassage, setUserMassage] = useState('');
    const [authError, setAuthError] = useState('error');


    const [signInWithGoogle, , , googleSignInError = error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, , , facebookSignInError = error] = useSignInWithFacebook(auth);
    const [signInWithGithub, , , githubSignInError = error] = useSignInWithGithub(auth);

    const [signInWithEmailAndPassword, , , signInError = error] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword, , , registerError = error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updatingError = error] = useUpdateProfile(auth);

    let navigate = useNavigate();
    let location = useLocation();


    useEffect(() => {
        switch (authError) {
            case 'registerError':
                setUserMassage(registerError)
                break;
            case 'signInError':
                setUserMassage(signInError)
                break;
            case 'updatingError':
                setUserMassage(updatingError)
                break;
            case 'googleSignInError':
                setUserMassage(googleSignInError)
                break;
            case 'facebookSignInError':
                setUserMassage(facebookSignInError)
                break;
            case 'githubSignInError':
                setUserMassage(githubSignInError)
                break;
            case 'error':
                setUserMassage(error)
                break;
            default:
                setUserMassage('')
        }
    }, [authError, error, registerError, signInError, updatingError, googleSignInError, facebookSignInError, githubSignInError])

    useEffect(() => {
        let from = location.state?.from?.pathname || "/";
        user && navigate(from, { replace: true });
    }, [user])

    // Add new user
    const onBlurHandler = ({ target: { name, value } }) => {
        setNewUser(prev => ({ ...prev, [name]: value }))

    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (login) {
            const { email, password } = newUser
            signInWithEmailAndPassword(email, password)
            setAuthError('signInError')

        } else {
            const { name, email, password } = newUser
            createUserWithEmailAndPassword(email, password)
                .then(() => {
                    updateProfile({ displayName: name })
                    setAuthError('updatingError')
                })
            setAuthError('registerError')
        }
    }



    if (loading) {
        return <p>Loading...</p>;
    } else {
        console.log('error.message', userMassage);

    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center pt-5 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="\images\logo.webp"
                            alt="Firebase"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{login ? 'Welcome back' : 'Registration'}</h2>
                        <div className='my-4'>
                            <button
                                type="button"
                                onClick={() => {
                                    signInWithGoogle()
                                    setAuthError('googleSignInError')
                                }}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FaGoogle className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                                </span>
                                Google
                            </button>
                        </div>
                        <div className='my-4'>
                            <button
                                type="button"
                                onClick={() => {
                                    signInWithFacebook()
                                    setAuthError('facebookSignInError')
                                }}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FaFacebook className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                                </span>
                                Facebook
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    signInWithGithub()
                                    setAuthError('githubSignInError')
                                }}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <FaGithub className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                                </span>
                                Github
                            </button>
                        </div>
                        <p className="font-medium text-indigo-600 hover:text-indigo-500 text-center my-5">
                            {
                                userMassage?.message?.includes('(auth/weak-password)') ? "Password should be at least 6 characters." :
                                    userMassage?.message?.includes('(auth/email-already-in-use)') ? "This email is used once." :
                                        userMassage?.message?.includes('(auth/wrong-password)') ? "Oops,looks like password is incorrect." :
                                            userMassage?.message?.includes('(auth/user-not-found)') ? "Please register before login." :
                                                userMassage?.message?.includes('(auth/operation-not-allowed)') ? "Try another options."
                                                    : userMassage?.message

                            }

                        </p>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
                            {login || (
                                <div>
                                    <label htmlFor="full-name" className="sr-only">
                                        Your full name
                                    </label>
                                    <input
                                        id="full-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Your full name"
                                        onBlur={onBlurHandler}
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    onBlur={onBlurHandler}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onBlur={onBlurHandler}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">

                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                {login ? 'Sign In' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
