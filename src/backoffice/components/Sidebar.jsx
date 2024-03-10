import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-dark border-right" id="sidebar">
      <div className="sidebar-header text-white">
        <h3>Menu</h3>
      </div>

      <ul className="list-unstyled components">
        <li className="mb-4"><Link to="/dashboard">Dashboard</Link></li>
        <li className="mb-4"><Link to="/destinations/index">Backoffice Destination</Link></li>
        <li className="mb-4"><Link to="/crews/index">Backoffice Crew</Link></li>
        <li className="mb-4"><Link to="/technologies/index">Backoffice Technology</Link></li>

        {user && (
          <li className="mb-4"><LogoutButton /></li>
        )}

      </ul>
    </div>
  );
};

export default Sidebar;