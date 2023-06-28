import React from 'react';
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
const Users = () => {
  return (
    <Layout title={"Dashboard All-Users"}>
      <div class="container-fluid m-3 p-4 ">
      <div class="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h1> All Users</h1>

        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Users;