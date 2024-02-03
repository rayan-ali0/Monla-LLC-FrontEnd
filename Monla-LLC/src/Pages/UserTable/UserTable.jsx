import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../UserTable/user.module.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserForm from "./AddUser";
import EditUserForm from "./EditUser";

const UserTable = () => {
  const [isloading, setIsLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [tableUpdated, setTableUpdated] = useState(rows);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_PATH}/user/all`
        );
        setRows(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  const handleEditClick = (user) => {
    setIsEditFormOpen(true);
    setSelectedUser(user);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_PATH}/user/${userId}`
      );
      const remainedUsers = rows.filter((row) => row._id.toString() !== userId);
      setRows(remainedUsers);
    } catch (error) {
      console.error("Error deleting user:", error.response.data);
    }
  };

  const handleTableUpdated = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_PATH}/user/all`)
      .then((response) => setTableData(response.data))
      .catch((error) => console.error("Error fetching updated data:", error));
  };

  const handleAddFormClose = () => {
    setIsAddFormOpen(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "number", headerName: "Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
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
      <h1 style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30 }}>
        Users
      </h1>
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
          cursor: "pointer",
        }}
        onClick={handleAddClick}
      >
        Add User
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
        <EditUserForm
          user={selectedUser}
          onClose={() => setIsEditFormOpen(false)}
          onUpdate={handleTableUpdated}
        />
      )}
      {isAddFormOpen && (
        <AddUserForm
          onClose={handleAddFormClose}
          onCreation={handleTableUpdated}
        />
      )}
    </div>
  );
};
const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};

export default UserTable;
