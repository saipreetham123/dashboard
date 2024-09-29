import React, { useState, useEffect, useContext } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import APIConnector from '../apiconnector.js';
import Notifications from '../messages.js';
import Login from './components/login.js';
import Signup from './components/Signup.js';
import { Button } from '../shadcn/button';
import checkAuthentication from '../Routing/checkAuthentication.js';
import { Separator } from '../shadcn/separator.js';
import { Urls } from '../data.js';
import { LoadingContext } from '../LoadingContext.js';

export default function LoginPage(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { onLoaderRaise } = useContext(LoadingContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      onLoaderRaise(true, 'Checking authentication...');
      const Authenticated = await checkAuthentication();
      onLoaderRaise(false);

      if (Authenticated) {
        // Redirect to dashboard if already authenticated
        if (window.location.pathname.includes('dashboard')) {
          navigate(window.location.pathname);
        } else {
          navigate('/dashboard');
        }
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    let data = { userEmail: $('#email').val(), password: $('#password').val() };

    onLoaderRaise(true, 'Confirming login ...', { marginTop: '155px' });
    APIConnector.Post(Urls.loginUrl, data).then(async function (response) {
      onLoaderRaise(false);
      if (response && response.data?.token && response.data?.user.id) {
        Notifications.ShowSuccessMessage('Successfully Loggedin');
        if (window.location.pathname.includes('dashboard')) {
          navigate(window.location.pathname);
        } else {
          navigate('/dashboard');
        }
      } else {
        Notifications.ShowErrorMessage('Login Failed.Please try again.');
      }
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin); // Switch between login and signup
  };

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    let userData = {
      userName: data.username,
      userEmail: data.email,
      password: data.password,
      isActive: true,
    };

    onLoaderRaise(true, 'Confirming login ...', { marginTop: '155px' });

    APIConnector.Post(Urls.Signup, userData).then(async function (response) {
      onLoaderRaise(false);
      if (response && response.data) {
        Notifications.ShowSuccessMessage('Successfully Registered');

        let orgData = {
          organizationName: data.organizationName,
          organizationDescription: data.organizationDescription,
        };
        APIConnector.Post(Urls.CreateOrganization, orgData).then(
          async function (response) {
            onLoaderRaise(false);
            if (response && response.data) {
              navigate('/');
            } else {
              Notifications.ShowErrorMessage(
                'Org Creation Failed.Please try again.'
              );
            }
          }
        );

        navigate('/');
      } else {
        Notifications.ShowErrorMessage('Login Failed.Please try again.');
      }
    });
  }

  return (
    <div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          5thBridge Data Technologies
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>&ldquo;Project Addu.&rdquo;</p>
            <footer className='text-sm'>Sai Preetham</footer>
          </blockquote>
        </div>
      </div>
      {/* Right Side (Conditional Rendering) */}
      <div className='lg:p-8 relative'>
        {/* Conditionally render Login or Signup */}

        <div
          className={`transition-opacity duration-1000 ${
            isLogin ? 'opacity-100' : 'opacity-0'
          } `}
        >
          {isLogin && <Login isLoading={isLoading} onSubmit={handleLogin} />}
        </div>

        <div
          className={`transition-opacity duration-1000 ${
            !isLogin ? 'opacity-100' : 'opacity-0'
          } `}
        >
          {!isLogin && <Signup isLoading={isLoading} onSubmit={onSubmit} />}
        </div>
        <div className='mb-8 mt-4 text-center'>
          <div className='mb-4 relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <Separator
                className='my-4'
                text={
                  isLogin
                    ? "Don't have an account? Sign up here"
                    : 'Already have an account? Login here'
                }
              />
            </div>
          </div>
          <Button
            variant='default'
            onClick={toggleAuthMode}
            className='relative group'
            size='lg'
          >
            <span className='relative z-10 group-hover:text-black dark:group-hover:text-white'>
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
            <span className='absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left bg-gray-100 dark:bg-gray-800 z-0' />
          </Button>
        </div>
      </div>
    </div>
  );
}
