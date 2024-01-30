import React, { useEffect, useState } from "react"
import styles from './Recents.module.css'
import axios from "axios"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const Recents=()=>{
    const [rows, setRows] = useState([]);
    const [isModelFormOpen, setIsModelFormOpen] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);  // State for Add Form


    const fetchRecents = async () => {
        try {
          const response = await axios.get('http://localhost:5000/order/recents/all')
          if(response){
            setRows(response.data);

          }
        } catch (error) {
          console.error('Error fetching models:', error.response);
        }
      };
      const columns = [
        // { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'orderNumber', headerName: 'Number', flex: 1 },
        { field: 'userName', headerName: 'User Name', flex: 1 },
        // { field: 'userEmail', headerName: 'User Email', flex: 1 },
        { field: 'userPhone', headerName: 'User Phone', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        // { field: 'deliverDate', headerName: 'Delivery Date', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'total', headerName: 'Total', flex: 1 },
        {
          field: 'productsOrdered',
          headerName: 'Products Ordered',
          flex: 1,
          renderCell: (params) => (
            <div>
              {params.row.productsOrdered.map((product) => (
                <div key={product.productId}>{`${product.quantity} x ${product.productId}`}</div>
              ))}
            </div>
          ),
        },
        // { field: 'userId', headerName: 'User ID', flex: 1 },
        { field: 'shippingId', headerName: 'Shipping ID', flex: 1 ,
    renderCell:(params)=>(
        params.row.shippingId.location
    )},
        // { field: 'createdAt', headerName: 'Created At', flex: 1 },
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
              <div onClick={() => handleDeleteClick(params.row._id, params.row.status)} style={{ cursor: "pointer" }}>
                <DeleteIcon />
              </div>
    
            </div>
          ),
        },
      ];
    


useEffect(()=>{
    fetchRecents()
},[])


  return (
    <div
      style={{
        width: "100%",
        // float: "left",
        margin: "auto",
        height: "100%",
        // marginBottom: "7rem",
     
      }}
    > 
      <DataGrid
        rows={rows} 
        columns={columns}
        // pagination
        // pageSize={5}
                getRowId={(row) => row._id}
        // rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
            overflow: "hidden",
          color: "#0a213d",
          // border:"none",
        //   paddingTop: "1rem",
          border: "1px solid white",
          padding:"20px",
          borderRadius:"10px",
        //   borderRadius: "17px",
          "& .MuiDataGrid-root": {
            backgroundColor: "white",
            display:"none"
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
            fontSize: "14px",
            // Text color of cells
          },
          "& .MuiTablePagination-root": {
            // color: "white", // Text color of pagination
            display:"none"
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
            display:"none"

          },
          "& .MuiButtonBase-root": {
            color: "white", // Text color for buttons in the toolbar
            // display:"none"
          },
          "& .MuiPaginationItem-icon": {
            color: "white", // Color of pagination icons
            display:"none"
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          "& .MuiDataGrid-row , & .MuiDataGrid-cell": {
            maxHeight: "75px !important",
            height: "80px !important",
            padding:"0",
            // overflow:"hidden",

          },
          "& .MuiDataGrid-row:last-child .MuiDataGrid-cell": {
            borderBottom: "none", // Remove bottom border on the last cell
          }


         ,
          "& .MuiDataGrid-footerContainer": {
            display: "none", // Hide the footer container
          },
        }}
      />
 {isModelFormOpen && <ModelForm model={selectedModel} onClose={() => setIsModelFormOpen(false)} allBrands={allBrands} />}
      {isAddFormOpen && <ModelAddForm onClose={handleAddFormClose} allBrands={allBrands} />}
      <ToastContainer />
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );


}

export default Recents