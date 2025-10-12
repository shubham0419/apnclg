"use client"
import { loginSuccess } from '@/lib/features/authSlice';
import { authAPI } from '@/sevices/auth.service';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const PUBLIC_ROUTES = ['/login', '/register', '/public'];

function CurrentUserWrapper ({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch();
  const {getCurrentUser} = authAPI
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route));

    if (!token && !isPublic) {
      router.replace('/login');
    }
    getUser();
  }, [pathname, router]);

  const getUser = async () => {
    const res = await getCurrentUser();
    dispatch(loginSuccess({user:res.user}));
  }

  return (
    <>
      {children}
    </>
  )
}

export default CurrentUserWrapper