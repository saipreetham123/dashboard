import React, { useRef, useState, useEffect, useContext } from 'react';
import APIConnector from '../../../apiconnector';
import Notifications from '../../../messages.js';
import { Button } from '../../../shadcn/button';
import { Urls } from '../../../data';
import { Input } from '../../../shadcn/input';
import { Label } from '../../../shadcn/label';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../shadcn/dialog';
import {Switch} from '../../../shadcn/switch.js'
import { LoadingContext } from '../../../LoadingContext';

const EditUser = ({ User, onEdit, onClose, props }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const { onLoaderRaise } = useContext(LoadingContext);

  const handleUserEdit = (userId) => {
    const updatedUser = {
      id: userId,
      userName: nameRef.current.value,
      userEmail: emailRef.current.value,
      password: passwordRef.current.value,
      isActive: isActive,
    };

    onLoaderRaise(true, 'Editing User ...', { marginTop: '155px' });
    APIConnector.Post(Urls.UpdateUser, updatedUser).then(async function (
      response
    ) {
      onLoaderRaise(false);
      if (response && !response.isFailure) {
        Notifications.ShowSuccessMessage('Successfully Edited Project');
        onEdit();
      } else {
        Notifications.ShowErrorMessage('Edit Failed.Please try again.');
      }
    });
  };

  useEffect(() => {
    if (User) {
      setIsActive(User.isActive || false);
    }
  }, [User]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {console.log(User)}
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit User here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue={User.userName}
              ref={nameRef}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='Email' className='text-right'>
              Email
            </Label>
            <Input
              id='Email'
              defaultValue={User.userEmail}
              ref={emailRef}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='Password' className='text-right'>
              Password
            </Label>
            <Input
              id='Password'
              defaultValue={User.password}
              ref={passwordRef}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='IsActive' className='text-right'>
              IsActive
            </Label>
            <Switch
              id='isactive'
              checked={isActive}
              onCheckedChange={setIsActive}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='submit' onClick={() => handleUserEdit(User.id)}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
