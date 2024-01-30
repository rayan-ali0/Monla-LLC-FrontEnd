import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './Products.module.css';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Productstable() {
  const [rows, setRows] = useState([]);

const navigate=useNavigate()

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/read/all');
      console.log('Fetched products:', response.data);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response.data);
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

    } catch (error) {
      console.error('Error deleting product:', error.response.data);
    }
  };

  const columns = [
    { field: 'image', headerName: 'Image', width: 100,renderCell:(params)=>(
        <img src={`${import.meta.env.VITE_REACT_APP_PATH}/${params.value}`}
        style={{
          width:60,height:60
        }}/>
    )
    } ,

    { field: 'SKU', headerName: 'SKU', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 ,
    renderCell: (params) => {
   
        return (
        <div style={{  maxHeight: '100%',
        overflowX: 'scroll', 
        WebkitOverflowScrolling: 'touch', 
      
        }}>
           <style>
                  {`
                    ::-webkit-scrollbar {
                      width: 1px;
                    }
      
                    ::-webkit-scrollbar-thumb {
                      background-color: transparent;
                    }
      
                    ::-webkit-scrollbar-track {
                      background-color: transparent;
                    }
                  `}
                </style>
                  {params.value}
                </div>)}},
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'origin', headerName: 'Origin', width: 200 },
    { field: 'category', headerName: 'Category', width: 200 , 
    renderCell: (params) => {
      if (params.value) {
if(params.row.volume && params.row.volume!==0){
return (
  <div style={{  maxHeight: '100%',
  overflowX: 'scroll', 
  WebkitOverflowScrolling: 'touch', 

  }}>
     <style>
            {`
              ::-webkit-scrollbar {
                width: 1px;
              }

              ::-webkit-scrollbar-thumb {
                background-color: transparent;
              }

              ::-webkit-scrollbar-track {
                background-color: transparent;
              }
            `}
          </style>
            {params.value.title +"-"+params.row.volume}
          </div>
)
}
else{
  return params.value.title
}
      }
      return ''; // or handle it differently based on your requirements
    }
  
  },
  { field: 'car', headerName: 'Car Details', width: 200 , 
  renderCell: (params) => {
   
    if  (params.row.brand){
      return (
      <div style={{  maxHeight: '100%',
      overflowX: 'scroll', 
      WebkitOverflowScrolling: 'touch', 
    
      }}>
         <style>
                {`
                  ::-webkit-scrollbar {
                    width: 1px;
                  }
    
                  ::-webkit-scrollbar-thumb {
                    background-color: transparent;
                  }
    
                  ::-webkit-scrollbar-track {
                    background-color: transparent;
                  }
                `}
              </style>
                {params.row.brand?.brand +"-"+params.row.model?.name+"-"+params.row.year?.value.join(',')}
              </div>)
    
      // return params.row.brand?.brand +"-"+params.row.model?.name+"-"+params.row.year?.value.join(',') 

    }
    else{
return "..."
    }
   



  }

},
    { field: 'createdAt', headerName: 'Created At', width: 200 , 
    renderCell: (params) => {
      // Check if value is present before splitting
      if (params.value) {
        return params.value.split('T')[0];
      }
      return ''; // or handle it differently based on your requirements
    }
  
  },
    // { field: 'updatedAt', headerName: 'Updated At', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
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
    navigate('/dashboard/Product/Edit',{state:{product}})

  };

  const handleAddClick=()=>{
    navigate('/dashboard/Product/Add')
  }
  return (
    <div style={{ width: "95%",  margin: "auto", height: "80vh",marginTop:"2rem"}}>
            <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>Products</h1>
      <button
        className={styles.btnAdd}
   
        onClick={handleAddClick}
      >
        Add
      </button>
   
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

