import React from 'react';
import { Button } from '../../shadcn/button';
import { Input } from '../../shadcn/input';
import { Label } from '../../shadcn/label';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = ({ isLoading, onSubmit }) => {

    return (
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to login to your account.
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className='grid gap-5'>
              <div className='grid gap-1'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='name@example.com'
                  type='email'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isLoading}
                />
              </div>
              <div className='grid gap-1'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'>Password</Label>
                  <Link to='/forgotpassword' className='text-sm underline'>
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  disabled={isLoading}
                  required
                />
              </div>
              <Button
                disabled={isLoading}
                className='relative group overflow-hidden'
              >
                {isLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin z-10 ' />
                )}
                <span className='relative z-10 group-hover:text-black dark:group-hover:text-white'>
                  Sign In with Email
                </span>

                {/* Hover effect background */}
                <span className='absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left bg-gray-100 dark:bg-gray-800 z-0' />
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Login;