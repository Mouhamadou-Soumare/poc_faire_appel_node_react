import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react';
import {
  Bars3CenterLeftIcon,
  BellIcon,
  CogIcon,
  DocumentChartBarIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  BoltIcon,
  ArrowLeftCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

// Import your page components
import HomePageDashboard from './HomepageDashboard';
import AttendancePage from './AttendancePage';
// import CalendarPage from './pages/CalendarPage';
// import MembersPage from './pages/MembersPage';
// import MessagesPage from './pages/MessagesPage';
// import EventsPage from './pages/EventsPage';
// import SettingsPage from './pages/SettingsPage';
// import ProfilePage from './pages/ProfilePage';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Calendrier', href: '#', icon: CalendarDaysIcon, current: false },
  { name: 'Liste adhérents', href: '#', icon: UsersIcon, current: false },
  { name: 'Messages', href: '#', icon: ChatBubbleLeftEllipsisIcon, current: false },
  { name: 'Événements', href: '#', icon: BoltIcon, current: false },
  { name: 'Présences', href: '/dashboard/attendance', icon: DocumentChartBarIcon, current: false },
];

const secondaryNavigation = [
  { name: 'Paramètres', href: '#', icon: CogIcon },
  { name: 'Se déconnecter', href: '#', icon: ArrowLeftCircleIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-full bg-primary">
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs flex-1 transform flex-col bg-cyan-700 pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute right-0 top-0 -mr-12 pt-2 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex flex-shrink-0 items-center px-4">
              <img alt="Easywire logo" src="https://i.ibb.co/fCvKT7v/Group-33.png" className="h16 w-auto" />
            </div>
            <nav aria-label="Sidebar" className="mt-5 h-full flex-shrink-0 divide-y divide-cyan-800 overflow-y-auto">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-cyan-800 text-dark' : 'text-dark-100 hover:bg-tertiary hover:text-white',
                      'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                    )}
                  >
                    <item.icon aria-hidden="true" className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 px-2">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-cyan-100 hover:bg-tertiary hover:text-white"
                    >
                      <item.icon aria-hidden="true" className="mr-4 h-6 w-6 text-cyan-200" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </DialogPanel>
          <div aria-hidden="true" className="w-14 flex-shrink-0">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-secondary pb-4 pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <img alt="Easywire logo" src="https://i.ibb.co/fCvKT7v/Group-33.png" className="h-16 w-auto" />
          </div>
          <nav aria-label="Sidebar" className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto">
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-tertiary text-active' : 'text-dark-100 hover:bg-tertiary hover:text-dark',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6',
                  )}
                >
                  <item.icon aria-hidden="true" className="mr-4 h-6 w-6 flex-shrink-0 text-dark-200" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6">
              <div className="space-y-1 px-2">
                {secondaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-dark-100 hover:bg-cyan-600 hover:text-dark"
                  >
                    <item.icon aria-hidden="true" className="mr-4 h-6 w-6 text-dark-200" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          >
            <span className="sr-only">Ouvrir le menu</span>
            <Bars3CenterLeftIcon aria-hidden="true" className="h-6 w-6" />
          </button>
          {/* Search bar */}
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="flex flex-1">
              <form action="#" method="GET" className="flex w-full md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Recherche
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    name="search-field"
                    type="search"
                    placeholder="Recherche"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Voir les notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                    <span className="absolute -inset-1.5 lg:hidden" />
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                      <span className="sr-only">Ouvrir le menu </span>Emilia Birch
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Votre Profil
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Paramètres
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Se déconnecter
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8">
          {/* Page header */}
          <Routes>
            <Route path="/" element={<HomePageDashboard />} />
            <Route path="/attendance" element={<AttendancePage />} />
            {/* Add routes for other pages */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
