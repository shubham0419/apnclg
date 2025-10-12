"use client"
import { authAPI } from '@/sevices/auth.service';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

const NavbarWrapper = ({children,heading}:{children:React.ReactNode,heading:string}) => {
  const router = useRouter();
  const {logout} = authAPI;
  const user = useSelector((state: any) => state.auth.user);
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (<>
      <div className="bg-blue-600 text-white py-6 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{heading}</h1>
            <p className="text-blue-100 mt-1">{user?.name}!</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/profile')}
              className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Profile
            </button>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Topics
            </button>
            <button 
              onClick={() => router.push('/progress')}
              className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition font-medium"
            >
              Progress
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {children}
      </>
  )
}

export default NavbarWrapper