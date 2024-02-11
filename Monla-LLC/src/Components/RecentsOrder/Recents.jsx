import React, { useEffect, useState } from "react"
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
          const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/order/recents/all`)
          if(response){
            setRows(response.data);

          }
        } catch (error) {
          console.error('Error fetching models:', error.response);
        }
      };
      const columns = [
        { field: 'orderNumber', headerName: 'Number', flex: 100 },
        { field: 'userName', headerName: 'User Name', flex: 100 },
        { field: 'userPhone', headerName: 'User Phone', flex: 100 },
        { field: 'address', headerName: 'Address', flex: 100 },
        { field: 'status', headerName: 'Status', flex: 100 },
        { field: 'total', headerName: 'Total', flex: 100 },
        {
          field: 'productsOrdered',
          headerName: 'Products Ordered',
          flex: 100,
          renderCell: (params) => (
            <div>
              {params.row.productsOrdered.map((product) => (
                <div key={product.productId}>{`${product.quantity} x ${product.productId}`}</div>
              ))}
            </div>
          ),
        },
        { field: 'shippingId', headerName: 'Shipping ID', flex: 100 ,
    renderCell:(params)=>(
        params.row.shippingId.location
    )}
      ];
    


useEffect(()=>{
    fetchRecents()
},[])


  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        height: "100%",
     
      }}
    > 
      <DataGrid
        rows={rows} 
        columns={columns}

                getRowId={(row) => row._id}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
            overflow: "hidden",
          color: "#0a213d",
      
          border: "1px solid white",
          padding:"20px",
          borderRadius:"10px",
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

          },
          "& .MuiButtonBase-root": {
            color: "white", // Text color for buttons in the toolbar
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