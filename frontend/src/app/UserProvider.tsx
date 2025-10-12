"use client"
import api from '@/lib/axios.service';
import { loginSuccess } from '@/lib/features/authSlice';
import { authAPI } from '@/sevices/auth.service';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function CurrentUserWrapper ({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch();
  const {getCurrentUser} = authAPI

  const getUser = async () => {
    const res = await getCurrentUser();
    dispatch(loginSuccess({user:res.user}));
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default CurrentUserWrapper