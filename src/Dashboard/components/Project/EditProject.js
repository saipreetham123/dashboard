import React, { useState, useEffect, useContext } from "react";
import apiMethods from '../../../apiconnector'
import Notifications from '../../../messages.js';
import { Button } from "../../../shadcn/button";
import { Urls }  from '../../../data';
import {Switch} from '../../../shadcn/switch.js'
import { Input } from "../../../shadcn/input";
import { Label } from "../../../shadcn/label";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../shadcn/dialog"
import { LoadingContext } from '../../../LoadingContext';

const EditProject = ({ project, onEdit, onClose }) => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const { onLoaderRaise } = useContext(LoadingContext);
  
  const handleProjectEdit = () => {
    let data = {
      ProjectId: project.projectID,
      OrgId: project.orgId,
      name: name,
      isActive: isActive,
    };

    //onLoaderRaise(true, 'Editing Project ...', { marginTop: '155px' });
    apiMethods.Post(Urls.UpdateProject, data).then(async function (response) {
      //onLoaderRaise(false);
      if (response && !response.isFailure) {
        Notifications.ShowSuccessMessage('Successfully Edited Project');
        onEdit();
      } else {
        Notifications.ShowErrorMessage('Edit Failed.Please try again.');
      }
    });
  };

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setIsActive(project.isActive || false);
    }
  }, [project]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Edit Project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Input
              id='description'
              defaultValue={project.description}
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
            <Button type='button' onClick={() => handleProjectEdit()}>
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default EditProject;