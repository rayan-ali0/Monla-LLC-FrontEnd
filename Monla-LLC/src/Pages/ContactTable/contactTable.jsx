import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Helmet } from "react-helmet-async";

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND}/contact`);
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error.response.data);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteClick = async (contactId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND}/contact/${contactId}`);
      fetchContacts(); // Refresh the contacts after deleting
    } catch (error) {
      console.error("Error deleting contact:", error.response.data);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "Phone", headerName: "Phone", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
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
    <title>contact</title>
    <meta name="contact" content="contact table" />
  </Helmet>
    <main style={{ width: "90%", float: "left", margin: "auto", height: "650px", marginBottom: "7rem" }}>   
      <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>Contacts</h1>
      <section>
      <DataGrid
        rows={contacts}
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
        </main>
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};
