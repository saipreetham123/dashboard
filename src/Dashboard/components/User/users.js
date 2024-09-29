import React, { useState, useContext } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  BadgeCheck,
  BadgeX,
} from 'lucide-react';
import APIConnector from '../../../apiconnector';
import Notifications from '../../../messages.js';
import { Button } from '../../../shadcn/button';
import { Checkbox } from '../../../shadcn/checkbox';
import { Switch } from '../../../shadcn/switch.js';
import { Urls } from '../../../data';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../shadcn/dropdown-menu';
import { Input } from '../../../shadcn/input';
import { Label } from '../../../shadcn/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shadcn/table';
import $ from 'jquery';
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../../shadcn/dialog';
import { LoadingContext } from '../../../LoadingContext';
import EditUser from './EditUser.js';

export function Users(props) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [Users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userisActive, setUserIsActive] = useState(false);
  const { onLoaderRaise } = useContext(LoadingContext);

  const fetchUsers = () => {
    let data = { orgID: localStorage.getItem('userId') };
    onLoaderRaise(true, 'Fetching Users');
    APIConnector.Post(Urls.GetAllOrgUsers, data).then(async function (
      response
    ) {
      onLoaderRaise(false);
      if (response && !response.isFailure) {
        setUsers(response.data);
      } else {
        console.log(response);
      }
    });
  };

  React.useEffect(() => {
    onLoaderRaise(true);
    fetchUsers();
  }, []);

  const handleUserCreate = (event) => {
    let data = {
      UserName: username,
      UserEmail: email,
      Password: password,
      isActive: userisActive
    };
    APIConnector.Post(Urls.OrgUserSignup, data).then(async function (response) {
      if (response && !response.isFailure) {
        console.log(Notifications);
        Notifications.ShowSuccessMessage('Successfully Created User');
        debugger;
        fetchUsers();
      } else {
        Notifications.ShowErrorMessage('Creattion Failed.Please try again.');
      }
    });
  };

  const handleUserDelete = (userId) => {
    console.log(userId);
    let data = {
      id: userId,
    };
    onLoaderRaise(true, 'Creating User ...', { marginTop: '155px' });
    APIConnector.Post(Urls.DeleteUser, data).then(async function (response) {
      onLoaderRaise(false);
      if (response && !response.isFailure) {
        Notifications.ShowSuccessMessage('Successfully Deleted Project');
        fetchUsers();
      } else {
        Notifications.ShowErrorMessage('Deletion Failed.Please try again.');
      }
    });
  };

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
            {isActive ? <BadgeCheck /> : <BadgeX />}
          </div>
        );
      },
    },
    {
      accessorKey: 'userName',
      header: ({ column }) => (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
      cell: ({ row }) => (
        <div className='lowercase'>{row.getValue('userName')}</div>
      ),
    },
    {
      accessorKey: 'userEmail',
      header: () => <div className='text-left'>User Key</div>,
      cell: ({ row }) => {
        const UserKey = row.getValue('userEmail');

        return (
          <div className='flex items-center space-x-2'>
            <span className='font-mono text-sm'>{UserKey}</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => navigator.clipboard.writeText(UserKey)}
              className='h-6 w-6 p-0'
            >
              <span className='sr-only'>Copy</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-copy'
              >
                <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
                <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
              </svg>
            </Button>
          </div>
        );
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const User = row.original;

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
              <DropdownMenuItem onClick={() => handleUserDelete(User.id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditingUser(User)}>
                Edit User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: Users || [],
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
      {editingUser && (
        <EditUser
          User={editingUser}
          onEdit={fetchUsers}
          onClose={() => setEditingUser(null)}
          props={props}
        />
      )}
      <div className='flex items-center justify-between mb-4'>
        <Input
          placeholder='Filter Users...'
          value={table.getColumn('userName')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('userName')?.setFilterValue(event.target.value)
          }
          className='max-w-xs'
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='ml-auto mr-4'>
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Add a new User here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' placeholder='Name' className='col-span-3' onChange={(e) => setUserName(e.target.value)}/>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='Email' className='text-right'>
                  Email
                </Label>
                <Input
                  id='Email'
                  placeholder='example@example.com'
                  className='col-span-3'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='Password' className='text-right'>
                  Password
                </Label>
                <Input id='Password' placeholder='Password' className='col-span-3' onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='IsActive' className='text-right'>
                  IsActive
                </Label>
                <Switch
                  id='isactive'
                  checked={userisActive}
                  onCheckedChange={setUserIsActive}
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='submit' onClick={handleUserCreate}>
                  Create
                </Button>
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
                  className='hover:bg-gray-50  dark:bg-black'
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
