import React from 'react';
import Usermenu from '../../components/layout/Usermenu';
import Layout from '../../components/layout/layout';
const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
        <div class="container-fluid m-3 p-4 ">
      <div class="row">
        <div className="col-md-3">
            <Usermenu/>
        </div>
        <div className="col-md-9">
            <h1>All Orders</h1>
        </div>
        </div>
        </div>
    </Layout>
  )
}

export default Orders