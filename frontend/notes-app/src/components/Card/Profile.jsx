import React from 'react'
import { getInitials } from '../../utils/helper'

const Profile = ({ user , onLogout }) => {
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gray-400 animate-pulse"></div>
        <div className="space-y-2">
          <div className="w-24 h-4 bg-gray-400 rounded animate-pulse"></div>
          <div className="w-16 h-3 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }
  return (
    <div className='flex items-center gap-3'>
      <div className='w-11 h-11 flex items-center justify-center bg-black text-white rounded-full'>
        {getInitials(user.username)}
      </div>
      <div>
        <p className='text-xm font-medium'>
          {user.username}
        </p>
        <button className='text-sm text-black underline' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile