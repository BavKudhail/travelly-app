import React from 'react';
import AdminSignUp from '../../components/Admin/AdminSignup';
import AdminLoginForm from '../../components/Admin/AdminLoginForm';

const AdminLogin = () => {
  return (
    <>
      <div>
        <h1>Sign up</h1>
        <AdminSignUp />
      </div>
      <div>
        <h1>Login</h1>
        <AdminLoginForm />
      </div>
    </>
  );
};

export default AdminLogin;
