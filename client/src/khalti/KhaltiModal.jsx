// import React from 'react'
// import { Modal, Row, Col,Button, } from "react-bootstrap";
// import { ToastContainer ,toast} from 'react-toastify';
// import spinLoader from '../../components/SpinLoader';


// const KhaltiModal = ({ show, handleClose, id, totalAmount}) => {

//     const finalPayment = () =>{
//         console.log("ok")
//     }

//   return (

//     <Modal show={show} onHide={handleClose} className="notification-modal">
//     <Modal.Header closeButton>
//       <div style={{display:"flex",justifyContent:"space-between",margin:"0",width:"90%"}}>
//       <Modal.Title>Khalti Payment</Modal.Title>
// </div> 

//     </Modal.Header>
//     <Modal.Body>
//     <ToastContainer />
      
//       <div className="notification-container">
//      <h2>Total: {totalAmount}</h2>
//      <Button style={{width:"100%"}} onSubmit={finalPayment}>Proceed</Button>
//       </div>
//     </Modal.Body>
//   </Modal>
//   )
// }

// export default KhaltiModal;