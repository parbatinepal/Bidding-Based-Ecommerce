import React,{useState,useEffect} from 'react';
import Layout from '../../components/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';
import axios from "axios";
import toast from "react-hot-toast";
const Users = () => {
  const [users, setusers] = useState([]);

  const getallusers=async()=>{
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/auth//all-users"
      );
      console.log(data);
      setusers(data);
      if (data?.success) {
        console.log(users)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
   getallusers();
   
  }, [])
  
  return (
    <Layout title={"Dashboard All-Users"}>
      <div class="container-fluid m-3 p-4 ">
      <div class="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h1> All Users</h1>
     
        <table className="table">
        <thead>
          <tr>
          <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((c,i) => (
            
              <tr key={c._id}>
              <td >{i+1}</td>
                <td >{c.name}</td>
              
                 
                <td >{c.email}</td>
                <td >{c.phone}</td>
                <td >{c.address}</td>
              </tr>
            
          ))}
        </tbody>
      </table>
       
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Users;