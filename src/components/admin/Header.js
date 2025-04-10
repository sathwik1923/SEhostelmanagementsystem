'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // Don't show header on login/register pages or admin pages
  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <header className="bg-blue-600 text-black shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Hostel Management System
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="hover:text-blue-200">
            Dashboard
          </Link>
          <Link href="/menu" className="hover:text-blue-200">
            Food Menu
          </Link>
          <Link href="/outpass" className="hover:text-blue-200">
            Outpass
          </Link>
          <Link href="/issues" className="hover:text-blue-200">
            Issues
          </Link>
        </nav>
        
        {session ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaUserCircle className="mr-2" />
              <span className="hidden md:inline">{session.user.name}</span>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link href="/login" className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100">
              Login
            </Link>
            <Link href="/register" className="bg-blue-500 text-black px-3 py-1 rounded-md text-sm hover:bg-blue-700">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
