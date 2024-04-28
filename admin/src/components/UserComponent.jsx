// UserComponent.jsx
import React from 'react';
import  '../Styles/UserComponent.css'
const UserComponent = ({ user }) => {
  return (
    
    <tr>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.gender}</td>
     
    </tr>
  );
};

export default UserComponent;
