import React from 'react';
import { Button } from '../../shadcn/button';
import { Input } from '../../shadcn/input';
import { Label } from '../../shadcn/label';
import { Loader2 } from 'lucide-react';

const Signup = ({ isLoading, onSubmit }) => {
  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
        <p className='text-sm text-muted-foreground'>
          Enter your details to create a new account.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className='grid gap-6'>
          <div className='relative grid gap-1'>
            <Input
              id='username'
              name='username'
              placeholder=''
              type='text'
              autoCapitalize='none'
              autoComplete='username'
              autoCorrect='off'
              className='py-2.5 px-0 w-full text-sm peer'
              disabled={isLoading}
            />
            <Label
              htmlFor='username'
              className='absolute left-1 text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-1.5 z-10 origin-[0] peer-focus:start-0 peer-focus:text-zinc-950 peer-focus:dark:text-gray-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Name
            </Label>
          </div>
          <div className='relative grid gap-1'>
            <Input
              id='email'
              name='email'
              placeholder=''
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              className='py-2.5 px-0 w-full text-sm peer'
              disabled={isLoading}
            />
            <Label
              htmlFor='email'
              className='absolute left-1 text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-1.5 z-10 origin-[0] peer-focus:start-0 peer-focus:text-zinc-950 peer-focus:dark:text-gray-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Email
            </Label>
          </div>

          <div className='relative grid gap-1'>
            <Input
              id='password'
              name='password'
              placeholder=''
              type='password'
              className='py-2.5 px-0 w-full text-sm peer'
              autoCorrect='off'
              disabled={isLoading}
              required
            />
            <Label
              htmlFor='password'
              className='absolute left-1 text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-1.5 z-10 origin-[0] peer-focus:start-0 peer-focus:text-zinc-950 peer-focus:dark:text-gray-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Password
            </Label>
          </div>

          <div className='relative grid gap-1'>
            <Input
              id='confirm-password'
              name='confirmpassword'
              placeholder=''
              type='password'
              className='py-2.5 px-0 w-full text-sm peer'
              disabled={isLoading}
              required
            />
            <Label
              htmlFor='confirm-password'
              className='absolute left-1 text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-1.5 z-10 origin-[0] peer-focus:start-0 peer-focus:text-zinc-950 peer-focus:dark:text-gray-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Confirm Password
            </Label>
          </div>

          <div className='relative grid gap-1'>
            <Input
              id='organizationName'
              name='organizationName'
              placeholder=''
              type='text'
              className='py-2.5 px-0 w-full text-sm peer'
              disabled={isLoading}
              required
            />
            <Label
              htmlFor='organizationName'
              className='absolute left-1 text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-1.5 z-10 origin-[0] peer-focus:start-0 peer-focus:text-zinc-950 peer-focus:dark:text-gray-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Organization Name
            </Label>
          </div>

          <div className='relative grid gap-1'>
            <Input
              id='organizationDescription'
              name='organizationDescription'
              placeholder=''
              type='text'
              className='py-2.5 px-0 w-full text-sm peer'
              disabled={isLoading}
              required
            />
            <Label
              htmlFor='organizationDescription'
              className='absolute left-1 text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-100 top-1.5 z-10 origin-[0] peer-focus:start-0 peer-focus:text-zinc-950 peer-focus:dark:text-gray-50 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
            >
              Organization Description
            </Label>
          </div>

          <Button
            disabled={isLoading}
            className='relative group overflow-hidden'
            type='submit'
          >
            {isLoading && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin z-10' />
            )}

            <span className='relative z-10 group-hover:text-black dark:group-hover:text-white'>
              Sign Up with Email
            </span>

            <span className='absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left bg-gray-100 dark:bg-gray-800' />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
