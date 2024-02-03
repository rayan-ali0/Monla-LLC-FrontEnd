import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './tableorder.module.css';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import EditOrderForm from "./editorder";
/* eslint-disable react/jsx-key */

export default function OrdersTable() {
  const [rows, setRows] = useState([]);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

 
    // Fetch all orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order/read');
        setRows(response.data.Orders);
      } catch (error) {
        console.error('Error fetching orders:', error.response.data);
      }
    };
    useEffect(() => {
    fetchOrders();
  }, []);


  const handleDeleteClick = async (orderId, orderStatus) => {
    try {
        // Check if the order status is not "delivered" or "rejected"
        if (orderStatus !== "delivered" && orderStatus !== "rejected") {
            toast.error("You can only delete delivered or rejected orders.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        // Make axios delete request
        const response = await axios.delete(`http://localhost:5000/order/delete/${orderId}`);

        // Log the response and update the rows
        setRows((prevRows) => prevRows.filter((row) => row._id !== orderId));
    } catch (error) {
        console.error('Error deleting order:', error.response.data);
    }
};


  const columns = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'orderNumber', headerName: 'Order Number', flex: 1 },
    { field: 'userName', headerName: 'User Name', flex: 1 },
    { field: 'userEmail', headerName: 'User Email', flex: 1 },
    { field: 'userPhone', headerName: 'User Phone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'deliverDate', headerName: 'Delivery Date', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
    {
      field: 'productsOrdered',
      headerName: 'Products Ordered',
      flex: 1,
      renderCell: (params) => (
        <div key={params.row._id}>
          {params.row.productsOrdered.map((product) => (
            <div key={product.productId}>{`${product.quantity} x ${product.productId}`}</div>
          ))}
        </div>
      ),
    },
    
    
    
    { field: 'userId', headerName: 'User ID', flex: 1 },
    { field: 'shippingId', headerName: 'Shipping ID', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <div onClick={() => handleEditClick(params.row)} style={{ cursor: "pointer" }}>
            <EditIcon />
          </div>
          <div onClick={() => handleDeleteClick(params.row._id, params.row.status)} style={{ cursor: "pointer" }}>
            <DeleteIcon />
          </div>

        </div>
      ),
    },
  ];


  const handleEditClick = (order) => {
    setIsOrderFormOpen(true);
    setSelectedOrder(order);
  };

  return (
    <div>
    <Helmet>
    <title>Orders</title>
    <meta name="Orders" content="Orders table" />
  </Helmet>
    <main style={{ width: "90%", float: "left", margin: "auto", height: "650px", marginBottom: "7rem" }}>
      <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>
      Orders </h1>
      <section>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          color: "#0a213d",
          // border:"none",
          // paddingTop: "1rem",
          border: "1px solid white",
          padding: "20px",
          borderRadius: "10px",
          height:"650px",
          //   borderRadius: "17px",
          "& .MuiDataGrid-root": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeader": {
            // Background color of column headers
            color: "white",
            fontFamily: "Outfit",
            fontSize: "19px",
            // Text color of column headers
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ccc", // Border between cells
            color: "white",
            fontSize: "17px",
            // Text color of cells
          },
          "& .MuiTablePagination-root": {
            color: "white", // Text color of pagination
          },
          "& .MuiDataGrid-toolbar": {
            color: "white",
            backgroundColor: "white", // Background color of the toolbar
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
            // color: 'blue',
          },
          "& .MuiButtonBase-root": {
            color: "white", // Text color for buttons in the toolbar
          },
          "& .MuiPaginationItem-icon": {
            color: "white", // Color of pagination icons
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          "& .MuiDataGrid-row , & .MuiDataGrid-cell": {
            maxHeight: "80px !important",
            height: "80px !important",
          },
        }}
      />
      </section>
      <section>
      {isOrderFormOpen && <EditOrderForm order={selectedOrder} onClose={() => setIsOrderFormOpen(false)} fetchUpdatedData={fetchOrders} />}
      </section>
      <ToastContainer />
      </main>
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar></GridToolbar>
  );
};


