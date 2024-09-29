import React, { useState, useContext } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, BadgeCheck, BadgeX } from "lucide-react";
import apiMethods from '../../../apiconnector'
import Notifications from '../../../messages.js';
import { Button } from "../../../shadcn/button";
import { Checkbox } from "../../../shadcn/checkbox";
import { Urls }  from '../../../data';
import {Switch} from '../../../shadcn/switch.js'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../shadcn/dropdown-menu";
import { Input } from "../../../shadcn/input";
import { Label } from "../../../shadcn/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shadcn/table";
import $ from "jquery";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../shadcn/dialog"
import { LoadingContext } from '../../../LoadingContext';
import EditProject from './EditProject.js'

export function ProjectPage(props) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [projects, setprojects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const { onLoaderRaise } = useContext(LoadingContext);

  const fetchProjects = () => {
    let data = { orgId: localStorage.getItem('OrgId') };
    // Start the loader
    onLoaderRaise(true, 'Fetching Projects');
    apiMethods
      .Post(Urls.GetAllOrgProjects, data)
      .then(async function (response) {
        onLoaderRaise(false);
        if (response && !response.isFailure) {
          setprojects(response.data);
          console.log(response);
        } else {
          console.log(response);
        }
      });
  };
  
  React.useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectCreate = (event) => {
    //event.preventDefault();
    let data = {
      Name: $('#name').val(),
      UserId: localStorage.getItem('userId'),
      OrgId: localStorage.getItem('OrgId')
    };
    apiMethods
      .Post(Urls.CreateProject, data)
      .then(async function (response) {
        if (response && !response.isFailure) {
          console.log(Notifications);
          Notifications.ShowSuccessMessage('Successfully Created Project');
          debugger;
          fetchProjects();

        } else {
          Notifications.ShowErrorMessage('Creattion Failed.Please try again.');
        }
      });
  };

  const handleProjectDelete = (projectId) => {
    console.log(projectId);
    let data = {
      ProjectId: projectId,
      UserId: localStorage.getItem('userId'),
    };
    onLoaderRaise(true, 'Creating Project ...', { marginTop: '155px' });
    apiMethods
      .Post(Urls.DeleteProject, data)
      .then(async function (response) {
        onLoaderRaise(false);
        if (response && !response.isFailure) {
          Notifications.ShowSuccessMessage('Successfully Deleted Project');
          fetchProjects();
        } else {
          Notifications.ShowErrorMessage('Deletion Failed.Please try again.');
        }
      });
  };

   const handleProjectKeyRecreate = (project) => {
    let data = {
      ProjectId: project.projectID,
      orgId: project.orgId,
    };
    onLoaderRaise(true, 'Generating New key ...', { marginTop: '155px' });
    apiMethods
      .Post(Urls.GenerateProjectKey, data)
      .then(async function (response) {
        onLoaderRaise(false);
        if (response && !response.isFailure) {
          Notifications.ShowSuccessMessage('Project Key Changed Successfully');
          fetchProjects();
        } else {
          Notifications.ShowErrorMessage('Key Change Failed.Please try again.');
        }
      });
  }

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = row.getValue('isActive');
        return (
          <div className={isActive ? 'text-green-600' : 'text-red-600'}>
            {isActive ? <BadgeCheck/> : <BadgeX/>}
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
      cell: ({ row }) => <div className='lowercase'>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'projectKey',
      header: () => <div className='text-left'>Project Key</div>,
      cell: ({ row }) => {
        const projectKey = row.getValue('projectKey');
  
        // Display the first 6 characters of the key and hide the rest
        const truncatedKey = `${projectKey.substring(0, 6)}...`;
  
        return (
          <div className="flex items-center space-x-2">
            <span className="font-mono text-sm">{truncatedKey}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(projectKey)}
              className="h-6 w-6 p-0"
            >
              <span className="sr-only">Copy</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </Button>
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleProjectDelete(project.projectID)}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick = {() => setEditingProject(project)}>Edit Project</DropdownMenuItem>
              <DropdownMenuItem onClick = {() => handleProjectKeyRecreate(project)}>Regenerate Project Key</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: projects || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full max-w-7xl mx-auto overflow-x-auto p-4'>
      {editingProject && (
        <EditProject
          project={editingProject}
          onEdit={fetchProjects}
          onClose={() => setEditingProject(null)}
          {...props}
        />
      )}
      <div className='flex items-center justify-between mb-4'>
        <Input
          placeholder='Filter Projects...'
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-xs'
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='ml-auto mr-4'>Add Project</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
              <DialogDescription>
                Add a new Project here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  defaultValue='Pedro Duarte'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Description
                </Label>
                <Input
                  id='username'
                  defaultValue='@peduarte'
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='submit' onClick={handleProjectCreate}>Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Columns <ChevronDown className='ml-0 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
      <div className='rounded-md border overflow-hidden'>
        <Table className='min-w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='px-2 py-2 text-left bg-primary text-primary-foreground text-sm dark:bg-primary dark:text-primary-foreground '
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='hover:bg-gray-50 dark:bg-black'
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='px-2 py-2 text-sm align-middle'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='px-2 py-2 text-center text-sm'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <div className='text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
