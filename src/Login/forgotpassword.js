import React from 'react';
import { Link } from "react-router-dom"
import Notifications from "../messages"
import $ from "jquery";
import { Button } from '../shadcn/button.js'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/card.js"
import { Input } from "../shadcn/input.js"
import { Label } from "../shadcn/label.js"

function Forgotpassword(props) {
    const handleLogin = (event) => {
        event.preventDefault();
        // let data = { userEmail: $("#username").val(), password: $("#Password").val() }
        /*APIConnector.Post(CommonVariables.urls.loginUrl,data).then(async function (response)
   {
      if (response && response.token && response.userID) {
        Notifications.ShowSuccessMessage("Successfully Loggedin")
      }
      else {
          Notifications.ShowErrorMessage("Login Failed.Please try again.")
      }
  }
      */
        Notifications.ShowErrorMessage('Login Failed.Please try again.');
      };

    return (
      <div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
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
        <div className='login-form lg:p-8 relative'>
          <Card className='w-full max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Forgot Password?</CardTitle>
              <CardDescription>Enter your email.</CardDescription>
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

              <Button type='submit' className='w-full' onClick={handleLogin}>
                Submit
              </Button>
              <div className='mt-4 text-center text-sm'>
                Already have an account?{' '}
                <Link to='/' className='underline'>
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
}

export default Forgotpassword;