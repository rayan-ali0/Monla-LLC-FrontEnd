import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditBrandForm from "./BrandFormEdit";
import BrandAddForm from './BrandAddForm';
import styles from './tablebrand.module.css';
import { Helmet } from "react-helmet-async";

export default function BrandsTable() {
    const [rows, setRows] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isBrandFormOpen, setIsBrandFormOpen] = useState(false);

  
  

    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:5000/brand/readBrand');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error.response.data);
      }
    };
  
    useEffect(() => {
      fetchBrands();
    }, []);
  
    const handleEditClick = (brand) => {
        setIsBrandFormOpen(true);
        setSelectedBrand(brand); // Set the selected brand in the state

      };
      
  
    const handleDeleteClick = async (brandId) => {
      try {
        await axios.delete(`http://localhost:5000/brand/delete/${brandId}`);
        fetchBrands();
      } catch (error) {
        console.error('Error deleting brand:', error.response.data);
      }
    };
  
    const handleAddClick = () => {
      setIsAddFormOpen(true);
    };
  
    const handleAddFormClose = () => {
      setIsAddFormOpen(false);
    };
  
    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'brand', headerName: 'Brand', flex: 1, editable: true },
   
        { 
          field: 'image', 
          headerName: 'Image', 
          flex: 1, 
          renderCell: (params) => <img src={`http://localhost:5000/${params.value}`}  alt="Brand" style={{ width: 50, height: 50 }} /> 
        },
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
      
      
  
    return (
      <div
      style={{
        width: "90%",
        float: "left",
        margin: "auto",
        height: "650px",
        marginBottom: "7rem",    
      }} >  
          <Helmet>
      <title>Brand</title>
      <meta name="Brand" content="Brand table" />
    </Helmet>
      <main >
        <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>Brand</h1>
        <section>
        <button
          className={styles.btnAdd}
          style={{
            color: "white",
            marginBottom: "1rem",
            width: "7rem",
            height: "2.5rem",
            backgroundColor: "#C62507",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
          onClick={handleAddClick}
        >
          Add Brand
        </button>
        </section>
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
            paddingTop: "1rem",
            border: "1px solid white",
            padding:"20px",
            borderRadius:"10px",
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
      {isBrandFormOpen && <EditBrandForm brand={selectedBrand} onClose={() => setIsBrandFormOpen(false)}   fetchUpdatedData={fetchBrands} // Pass the function to fetch updated data
 />}
        {isAddFormOpen && <BrandAddForm onClose={handleAddFormClose}    fetchUpdatedData={fetchBrands} // Pass the function to fetch updated data
 />}
        </section>
        <section>
        <ToastContainer />
        </section>
        </main>
      </div>
    );
  }
  
  const CustomToolbar = () => {
    return (
      <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
    );
  };