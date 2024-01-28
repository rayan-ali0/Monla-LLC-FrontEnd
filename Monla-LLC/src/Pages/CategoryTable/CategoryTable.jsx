import React, { useState, useEffect } from "react";
import styles from "./CategoryTable.module.css";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import AddRegime from "../../components/AddRegime/AddRegime";
// import UpdateRegime from "../../components/UpdateRegime/UpdateRegime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../../CustomHook/GetData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CategoryTable() {
  const [item, setItem] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isAddRegimeOpen, setIsAddRegimeOpen] = useState(false);
  const [isUpdateRegimeOpen, setIsUpdateRegimeOpen] = useState(false);


const api="http://localhost:5000/category/readCategory"
  const {data,loading, error }=useFetchData(api)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

 
// console.log(item)
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${process.env.REACT_APP_PATH}regime/add`,
        formDataToSend
      );

      setItem((prevItems) => [...prevItems, response.data.data]);
      // console.log("aaaaaaaaaaaaaaaaaaaa"+response.data.data)

      setFormData({
        title: "",
        description: "",
        // image: null
      });
      toast.success("Regime plan added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // console.log("DATAAA" + response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // fetchRegime();
    handleSubmit();
    handleDeletee();
  }, []);

  const columns = [
    { field: '_id', headerName: 'id', width:250 },
    { field: "title", headerName: "Title",width:250 },
    {
      field: "image",
      headerName: "Image",
      flex:1 ,
      renderCell: (params) => (
        <img
          src={`${import.meta.env.VITE_REACT_APP_PATH}/${params.value}`}
          alt="Image"
          style={{ width: 60, height: 60 }}
        />
       

      ),
    },

    {
      field: 'Action',
    headerName: 'Actions',
    width: 140,
    renderCell: (params) => (
      <div style={{display :"flex"}}>
        <div onClick={() => handleEditt(params.row.id)} style={{cursor:"pointer"}}>
          <EditIcon />
          </div>
      
          <div onClick={() => handleDeletee(params.row.id)} style={{cursor:"pointer"}}>
          <DeleteIcon />
          </div>
        </div>
      ),
    },
  ];

  const handleEditt = (rowId) => {
    console.log(`Edit clicked for item with ID: ${rowId}`);
    setIsUpdateRegimeOpen(true)
    const selectedRow= item.find((row)=>row.id===rowId)
    setItem(selectedRow)
  };

  const handleDeletee = async (id) => {
    try {
      console.log("Deleting item with ID:", id);
      const response = await axios.delete(
        `${process.env.REACT_APP_PATH}regime/delete`,
        {
          data: { id: id },
        }
      );
      if (response.data.message === "Deleted Successfully") {
        setItem((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log("Regime plan deleted successfully");
        toast.success("Regime plan deleted successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };


  // post data
  const handleAdd = (e) => {
    e.preventDefault();
    setIsAddRegimeOpen(true);
  };



  const emptyRow = { id: -1, name: "Loading..." };

  const rowsWithEmptyRow = isloading ? [emptyRow] : data;

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
 
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1rem",
          width: "7rem",
          height: "2.5rem",
          // backgroundColor:"black",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        onClick={handleAdd}
      >
        Add Plan
      </button>
      <DataGrid
        getRowId={(data)=>data._id}
        rows={data}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          color: "white",
          // border:"none",
          paddingTop: "1rem",
          border: "1px solid white",
          padding:"20px",
          borderRadius:"10px",
          height:"90%",
        //   borderRadius: "17px",
        // margin:"10rem",
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
      {/* {isAddRegimeOpen && (
        <AddRegime
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsAddRegimeOpen(false)}
          handleSubmit={handleSubmit}
        />
      )} */}
      {/* {isUpdateRegimeOpen && (
        <UpdateRegime
          initialItem={item}
          setItem={setItem}
          onClose={() => setIsUpdateRegimeOpen(false)}
          handleUpdates={handleUpdates}
        />
      )} */}
      <ToastContainer />
    </div>
  );
}

const CustomToolbar = () => {
  return (
    <GridToolbar>{/* Add any custom elements or styling here */}</GridToolbar>
  );
};
