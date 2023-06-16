import React from 'react'
import Layout from '../../components/layout/layout'

import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout>
        <div class="container-fluid m-3 p-4 ">
          <div class="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
            <div className="card w-75">
              <h3>Admin Name :{auth?.user?.name}</h3>
              <h3>Admin Email :{auth?.user?.eamil}</h3>
              <h3>Admin Conatct :{auth?.user?.phone}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default AdminDashboard;