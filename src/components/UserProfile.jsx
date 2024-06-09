import React from 'react';
import { Avatar, Button } from 'antd';
import { useAuth } from '../contexts/AuthContext';
const UserProfile = ({ user }) => {
  const { logout } = useAuth();
  return (
    <div className="profile-section p-5 bg-white rounded shadow mb-5">
      <div className="flex items-center">
        <Avatar size={64} src={user.avatar} />
        <div className="ml-4">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <Button type="primary" className="mt-2" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
