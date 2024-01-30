import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./shipping.module.css";
import ShippingAddForm from "./addshipping";
import EditShippingForm from "./editshipping";
import { Helmet } from "react-helmet-async";

export default function ShippingsTable() {
  const [rows, setRows] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);

  useEffect(() => {
    const fetchShippings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/shipping/all");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching shippings:", error.response.data);
      }
    };

    fetchShippings();
  }, []);

  const handleEditClick = (shipping) => {
    setIsShippingFormOpen(true);
    setSelectedShipping(shipping);
  };

  const handleDeleteClick = async (shippingId) => {
    try {
      await axios.delete(`http://localhost:5000/shipping/${shippingId}`);
      fetchShippings();
    } catch (error) {
      console.error("Error deleting shipping:", error.response.data);
    }
  };

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    { field: "cost", headerName: "Cost", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
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
    <div>
    <Helmet>
    <title>Shipping</title>
    <meta name="Shipping" content="Shipping table" />
  </Helmet>
    <main style={{ width: "90%", float: "left", margin: "auto", height: "650px", marginBottom: "7rem" }}>   
       <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}> Shipping Table</h1>
       <section>
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1rem",
          width: "7rem",
          height: "2.5rem",
          backgroundColor: "blue",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        onClick={handleAddClick}
      >
        Add
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
      {isShippingFormOpen && (
        <EditShippingForm shipping={selectedShipping} onClose={() => setIsShippingFormOpen(false)} />
      )}
      {isAddFormOpen && <ShippingAddForm onClose={handleAddFormClose} />}
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
