import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../CompanyInfo/CompanyInfo.module.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCompanyInfoForm from "./AddCompanyInfo";
import EditCompanyInfoForm from "./EditCompanyInfo";

const CompanyInfo = () => {

  const [isloading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedCompanyInfo, setSelectedCompanyInfo] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_PATH}/company/`)
        console.log(response);
        setRows(response.data);
        setIsLoading(false);
      }
      catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    fetchCompanyInfo()
  }, [])

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  const handleEditClick = (company) => {
    setIsEditFormOpen(true);
    setSelectedCompanyInfo(company);
  };

  const handleDeleteClick = async (companyId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_PATH}/company/${companyId}`)
      const remainedCompanies = rows.filter((row) => row._id.toString() !== companyId)
      setRows(remainedCompanies)
    }
    catch (error) {
      console.error("Error deleting company info:", error.response.data);
    }
  }

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "number", headerName: "Number", flex: 1 },
    { field: "whatsapp", headerName: "Whatsapp", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "facebook", headerName: "Facebook", flex: 1 },
    { field: "instagram", headerName: "Instagram", flex: 1 },
    { field: "tiktok", headerName: "TikTok", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <div
            onClick={() => handleEditClick(params.row)}
            style={{ cursor: "pointer" }}
          >
            <EditIcon />
          </div>
          <div
            onClick={() => handleDeleteClick(params.row._id)}
            style={{ cursor: "pointer" }}
          >
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
      }}
    >
      <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}>
        Company Infos
      </h1>
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
          cursor: "pointer",
        }}
        onClick={handleAddClick}
      >
        Add Company Info
      </button>
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
      {isEditFormOpen && (
        <EditCompanyInfoForm
          company={selectedCompanyInfo}
          onClose={() => setIsEditFormOpen(false)}
          // onUpdate={handleTableUpdated}
        />
      )}
      {isAddFormOpen && (
        <AddCompanyInfoForm
          onClose={handleAddFormClose}
          // onCreation={handleTableUpdated}
        />
      )}
    </div>
  )
}
const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};

export default CompanyInfo