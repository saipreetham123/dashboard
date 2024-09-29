import React, { useState } from 'react';
import $ from 'jquery';
import { Link, useNavigate } from 'react-router-dom';
import APIConnector from '../../../apiconnector';
import { Urls } from '../../../data.js';
import Notifications from '../../../messages.js';

import { Button } from '../../../shadcn/button.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../shadcn/card.js';
import { Input } from '../../../shadcn/input.js';
import { Label } from '../../../shadcn/label.js';
import { LoadingContext } from '../../../LoadingContext';

function LoginPage(props) {
  const navigate = useNavigate();
  const { onLoaderRaise } = useContext(LoadingContext);


  const handleLogin = (event) => {
    event.preventDefault();

    let data = { userEmail: $('#email').val(), password: $('#password').val() };

    onLoaderRaise(true, 'Confirming login ...', { marginTop: '155px' });
    APIConnector.Post(Urls.loginUrl, data).then(async function (response)
    {
      onLoaderRaise(false);
      if (response && response.token && response.userID) {
        Notifications.ShowSuccessMessage('Successfully Loggedin');
        navigate('/dashboard');
      } else {
        Notifications.ShowErrorMessage('Login Failed.Please try again.');
      }
    });
  };

  return (
    <div className='login-form m-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
          .
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
              <Link
                to='/forgotpassword'
                className='ml-auto inline-block text-sm underline'
              >
                Forgot your password?
              </Link>
            </div>
            <Input id='password' type='password' required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className='w-full' onClick={handleLogin}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
