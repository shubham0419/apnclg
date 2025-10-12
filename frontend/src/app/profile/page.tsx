"use client"
import NavbarWrapper from '@/component/NavbarWrapper'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWrapper heading="Profile">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700">Name</h3>
              <p className="text-gray-600">{user?.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">Email</h3>
              <p className="text-gray-600">{user?.email}</p>

            </div>
          </div>
          </div>
      </NavbarWrapper>

    </div>
  )
}

export default page