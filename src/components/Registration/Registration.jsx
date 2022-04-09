import { LockClosedIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { GlobalContext } from '../../context/GlobalContext';
import useFirebaseBrandProvider from '../../hooks/useFirebaseBrandProvider';

export default function Registration() {
  const {message, setMessage,auth } = useContext(GlobalContext)
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="\images\logo.webp"
              alt="Firebase"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registration</h2>
            <div className='my-4'>
              <button
                type="button"
                onClick={()=>signInWithGoogle()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaGoogle className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                </span>
                Google
              </button>
            </div>
            {/* <div className='my-4'>
              <button
                type="button"
                onClick={facebookAuthorizationHandler}
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
                onClick={githubAuthorizationHandler}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaGithub className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                </span>
                Github
              </button>
            </div> */}
            {<p className="font-medium text-indigo-600 hover:text-indigo-500 text-center my-5">
              {
                message?.includes('(auth/weak-password)') ? "Password should be at least 6 characters." :
                  message?.includes('(auth/email-already-in-use)') ? "This email is used once." :
                    message?.includes('(auth/wrong-password)') ? "Oops,looks like password is incorrect."
                      : message

              }

            </p>}
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}

            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your full name"
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
