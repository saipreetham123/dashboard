import React, { useState, useEffect, memo, useContext } from 'react';
import Notifications from '../../../messages.js';
import { Button } from '../../../shadcn/button.js';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  SquareLibrary,
  LineChart,
  PanelLeft,
  Settings,
  Users2,
  Sun,
  Moon,
} from 'lucide-react';
import { DialogTitle } from '../../../shadcn/dialog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../shadcn/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../shadcn/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '../../../shadcn/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../shadcn/tooltip';
import { Outlet } from 'react-router';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Switch } from '../../../shadcn/switch.js';
import { useTheme } from '../../../ThemeProvider .js';
import { LoadingContext } from '../../../LoadingContext';

const Navbar = memo(function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { onLoaderRaise } = useContext(LoadingContext);
  // Breadcrumb paths
  const breadcrumbItems = {
    '/dashboard': 'Dashboard',
    '/dashboard/projects': 'Projects',
    '/dashboard/users': 'Users',
  };

  useEffect(() => {
    // Update the selected item based on the current route
    switch (location.pathname) {
      case '/dashboard':
        setSelected('dashboard');
        break;
      case '/dashboard/projects':
        setSelected('projects');
        break;
      case '/dashboard/users':
        setSelected('users');
        break;
      default:
        setSelected('');
    }
  }, [location.pathname]);

  useEffect(() => {
    onLoaderRaise(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    Notifications.ShowSuccessMessage('Successfully Logged Out');
  };

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
      <BreadcrumbList>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={to}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    className='text-black dark:text-gray-50 hover:bg-slate-800'
                    to={to}
                  >
                    {breadcrumbItems[to] || value}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < pathnames.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    );
  };

  return (
    <TooltipProvider>
      <Sheet>
        <div className='flex min-h-screen w-full flex-col bg-muted/40'>
          <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col bg-background sm:flex'>
            <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src='/addu.png'
                    width={36}
                    height={36}
                    alt='Avatar'
                    className='overflow-hidden rounded-full'
                  />
                </TooltipTrigger>
                {/* <TooltipContent side='right'>Toggle Menu</TooltipContent> */}
              </Tooltip>
              <Tooltip>
                <SheetTrigger asChild>
                  <Button size='icon' variant='outline'>
                    <PanelLeft className='h-5 w-5' />
                    <span className='sr-only'>Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <TooltipContent side='right'>Toggle Menu</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to='/dashboard'
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  >
                    <LineChart className='h-5 w-5' />
                    <span className='sr-only'>Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to='/dashboard/projects'
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  >
                    <SquareLibrary className='h-5 w-5' />
                    <span className='sr-only'>Projects</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>Projects</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to='/dashboard/users'
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  >
                    <Users2 className='h-5 w-5' />
                    <span className='sr-only'>Users</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>Users</TooltipContent>
              </Tooltip>
            </nav>
            <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant='ghost' onClick={toggleTheme}>
                    {theme === 'light' ? (
                      <Sun className='h-6 w-8' />
                    ) : (
                      <Moon className='h-6 w-8' />
                    )}
                    <span className='sr-only'>
                      {theme === 'light'
                        ? 'Switch to Dark Theme'
                        : 'Switch to Light Theme'}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right'>
                  {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href='#'
                    className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  >
                    <Settings className='h-5 w-5' />
                    <span className='sr-only'>Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side='right'>Settings</TooltipContent>
              </Tooltip>
            </nav>
          </aside>
          <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
            <header className='sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6'>
              <SheetContent
                side='left'
                className='sm:max-w-xs flex flex-col h-full'
              >
                <DialogTitle className='flex items-center justify-center mb-4'>
                  Menu
                </DialogTitle>
                <nav className='flex flex-col h-full text-lg font-medium'>
                  <div className='space-y-6 flex-grow'>
                    <SheetClose asChild>
                      <Link
                        to='/dashboard'
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg ${
                          selected === 'dashboard'
                            ? 'bg-black text-white'
                            : 'text-muted-foreground'
                        } hover:text-foreground hover:bg-black hover:text-white`}
                      >
                        <LineChart className='h-5 w-5 transition-all group-hover:scale-110' />
                        <span className='sr-only'>Dashboard</span>
                        Dashboard
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        to='/dashboard/projects'
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg ${
                          selected === 'projects'
                            ? 'bg-black text-white'
                            : 'text-muted-foreground'
                        } hover:text-foreground hover:bg-black hover:text-white`}
                      >
                        <SquareLibrary className='h-5 w-5' />
                        Projects
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        to='/dashboard/users'
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg ${
                          selected === 'users'
                            ? 'bg-black text-white'
                            : 'text-muted-foreground'
                        } hover:text-foreground hover:bg-black hover:text-white`}
                      >
                        <Users2 className='h-5 w-5' />
                        Users
                      </Link>
                    </SheetClose>
                  </div>

                  <div className='mt-auto space-y-6'>
                    <SheetClose asChild>
                      <Button
                        variant='ghost'
                        onClick={toggleTheme}
                        className='w-full justify-start gap-4 px-2.5 text-muted-foreground hover:text-foreground'
                      >
                        {theme === 'light' ? (
                          <Sun className='h-5 w-5' />
                        ) : (
                          <Moon className='h-5 w-5' />
                        )}
                        <span className='text-lg'>
                          {theme === 'light'
                            ? 'Switch to Dark Theme'
                            : 'Switch to Light Theme'}
                        </span>
                      </Button>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link
                        to='#'
                        className='flex items-center gap-4 px-2.5 py-2 text-muted-foreground hover:text-foreground'
                      >
                        <Settings className='h-5 w-5' />
                        Settings
                      </Link>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
              <Breadcrumb className='hidden md:flex'>
                {generateBreadcrumbs()}
              </Breadcrumb>
              <div className='relative ml-auto flex-1 md:grow-0'>
                <DropdownMenu className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground'>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='overflow-hidden rounded-full'
                    >
                      <img
                        src='/addu.png'
                        width={36}
                        height={36}
                        alt='Avatar'
                        className='overflow-hidden rounded-full'
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <div className='flex-1 p-4 sm:px-6 sm:py-0'>
              <Outlet />
            </div>
          </div>
        </div>
      </Sheet>
    </TooltipProvider>
  );
});
export default Navbar;
