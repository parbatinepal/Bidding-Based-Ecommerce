import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <>
        <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/User/Profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/User/Orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          
        </div>
      </div>
    </>
    
  )
}

export default Usermenu