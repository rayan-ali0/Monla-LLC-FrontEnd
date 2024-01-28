import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './Products.module.css';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
// import EditOrderForm from "./editorder";
import { useNavigate } from "react-router-dom";
export default function Productstable() {
  const [rows, setRows] = useState([]);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
const navigate=useNavigate()

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/read/all');
      console.log('Fetched orders:', response.data);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleDeleteClick = async (productId) => {
    try {
      // Make axios delete request
      const response = await axios.delete(`http://localhost:5000/product/${productId}`);

      // Log the response and update the rows
      console.log('Product deleted:', response.data);
      if(response){
        toast.success("Product deleted successfuly")
        fetchProducts()
      }
      // setRows((prevRows) => prevRows.filter((row) => row._id !== orderId));

    } catch (error) {
      console.error('Error deleting order:', error.response.data);
    }
  };

  const columns = [
    // { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'SKU', headerName: 'SKU', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'stock', headerName: 'Stock', flex: 1 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 , 
    renderCell: (params) => {
      // Check if value is present before splitting
      if (params.value) {
        return params.value.split('T')[0];
      }
      return ''; // or handle it differently based on your requirements
    }
  
  },
    // { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <div onClick={() => handleEditClick(params.row)} style={{ cursor: "pointer" }}>
            <EditIcon />
          </div>
          <div onClick={() => handleDeleteClick(params.row._id)} style={{ cursor: "pointer" }}>
            <DeleteIcon />
          </div>

        </div>
      ),
    },
  ];


  const handleEditClick = (product) => {
    navigate('/dashboard/Product/Edit',{state:product})

  };

  const handleAddClick=()=>{
    navigate('/dashboard/Product/Add')
  }
  return (
    <div style={{ width: "95%",  margin: "auto", height: "82vh",marginTop:"5rem"}}>
      {/* <div style={{display:"flex", border:'1px solid red' , justifyContent:"space-between",alignItems:"center"}}> */}
      {/* <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 20 ,display:"inline-block"}}>Products</h1> */}
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1.5rem",
          width: "9rem",
          height: "2.80rem",
          backgroundColor: "blue",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize:"1.2em"
        }}
        onClick={handleAddClick}
      >
        Add
      </button>
      {/* </div> */}
   
      <DataGrid
        rows={rows ? rows : []}
        columns={columns}
        pagination
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 20]}
        // components={{
        //   Toolbar: CustomToolbar,
        // }}
        sx={{
          color: "#0a213d",
          // border:"none",
          // paddingTop: "1rem",
          height:"90%",
          border: "1px solid white",
          padding: "20px",
          borderRadius: "10px",
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
      {/* {isOrderFormOpen && <EditOrderForm order={selectedOrder} onClose={() => setIsOrderFormOpen(false)} />} */}

      <ToastContainer />
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar></GridToolbar>
  );
};

