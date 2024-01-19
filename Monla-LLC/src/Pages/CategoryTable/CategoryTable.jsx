import React, { useState, useEffect } from "react";
import styles from "./CategoryTable.module.css";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import AddRegime from "../../components/AddRegime/AddRegime";
// import UpdateRegime from "../../components/UpdateRegime/UpdateRegime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchData } from "../../CustomHook/GetData";

export default function CategoryTable() {
  const [items, setItems] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [isAddRegimeOpen, setIsAddRegimeOpen] = useState(false);
  const [isUpdateRegimeOpen, setIsUpdateRegimeOpen] = useState(false);

  const api=`${import.meta.env.VITE_REACT_APP_BACKEND}category/readCategory`

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
    // { field: 'id', headerName: 'id', width: 80 },
    { field: "title", headerName: "Title", width: 140 },
    {
      field: "image",
      headerName: "Image",
      width: 110,
      renderCell: (params) => (
        <img
          src={`${import.meta.env.VITE_REACT_APP_PATH}${data.image}`}
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
      <div>
        <button
          className={`${styles.btn} ${styles}`}
          style={{
            marginRight: "0.5rem",
            fontFamily: "bold",
            fontSize: "16px",
            "&:hover": { color: "green" },
          }}
          onClick={() => handleEditt(params.row.id)}
        >
          Edit
        </button>

          <button
            className={styles.btn}
            style={{ fontFamily: "bold", fontSize: "16px" }}
            onClick={() => handleDeletee(params.row.id)}
          >
            Delete
          </button>
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

  const myCustomData = [
    {
      id: 1,
      title: "Item 1",
      description:
        "John Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe",
      image: "path-to-image-1.jpg",
    },
    {
      id: 2,
      title: "Item 2",
      description:
        "John Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJoh",
      image: "path-to-image-2.jpg",
    },
    {
      id: 3,
      title: "Item 3",
      description:
        "JohnJohn Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJoh",
      image: "path-to-image-3.jpg",
    },
    {
      id: 4,
      title: "Item 4",
      description:
        "John Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJoh",
      image: "path-to-image-4.jpg",
    },
    {
      id: 5,
      title: "Item 5",
      description:
        "John DoeJohn Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJoh",
      image: "path-to-image-5.jpg",
    },
    {
      id: 6,
      title: "Item 6",
      description:
        "John Doe John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn DoeJoh",
      image: "path-to-image-6.jpg",
    },
    // Add more rows as needed
  ];

  const resetFormFields = () => {
    setNewName("");
    setNewDescription("");
    setNewImageFile(null);
    setSelectedItemId(null);
  };

  // update regime plan
  const handleEdit = (item) => {
    setSelectedItemId(item._id);
    setNewName(item.name);
    setNewDescription(item.description);
  };
  const handleUpdate = async () => {
    console.log("before", selectedItemId);
    if (selectedItemId) {
      console.log("after", newImageFile);

      const dataToSend = {
        id: selectedItemId,
        name: newName,
        description: newDescription,
      };
      console.log(dataToSend);
      console.log(newImageFile);
      await axios
        .patch(
          `${import.meta.env.VITE_REACT_APP_PATH}regime/update`,
          { regimeImage: newImageFile, ...dataToSend },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          if (response.data.message === "Updated Successfully") {
            // If update is successful, update the items state with the updated data
            setItems((prevItems) =>
              prevItems.map((item) =>
                item._id === selectedItemId
                  ? {
                      ...item,
                      name: newName,
                      description: newDescription,
                      image: response.data.data.image,
                    }
                  : item
              )
            );
            // Reset form fields and selectedItemId after update
            setNewName("");
            setNewDescription("");
            setNewImageFile(null);
            setSelectedItemId(null);
            // You can also show a success message or perform other actions after successful update
          } else {
            // Handle the case when the backend API returns an error message
            console.error(response.data.message);
          }
        })
        .catch((error) => {
          // Handle errors if the PATCH request fails
          console.error("Error updating item:", error);
        });
    } else {
      console.error("No selected item to update");
    }
  };
  //   remove data

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_PATH}regime/delete`,
        {
          data: { id: id },
        }
      );

      if (response.data.message === "Deleted Successfully") {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        console.log("Regime plan deleted successfully");
      } else {
        console.log(`No regime plan found with the id ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // post data
  const handleAdd = (e) => {
    e.preventDefault();
    setIsAddRegimeOpen(true);
  };

  const handleUpdates = (e) => {
    console.log("clickedd");
    e.preventDefault();
    setIsUpdateRegimeOpen(true);
  };
  const handlecancel = (e) => {
    e.preventDefault();
    setIsAddRegimeOpen(false);
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
        marginBottom: "3rem",
      }}
    >
      <h1 style={{ fontSize: 45, fontWeight: "bold", marginBottom: 30 }}>
        Diet plans
      </h1>
      <button
        className={styles.btnAdd}
        style={{
          color: "white",
          marginBottom: "1rem",
          width: "7rem",
          height: "2.5rem",
          borderRadius: "5px",
          fontWeight: "bold",
        }}
        onClick={handleAdd}
      >
        Add Plan
      </button>
      <DataGrid
        // getRowId={getRowId}
        rows={rowsWithEmptyRow}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: CustomToolbar,
        }}
        sx={{
          color: "#0a213d",
          // border:"none",
          paddingTop: "1rem",
          border: "1px solid #0a213d",
        //   borderRadius: "17px",
          "& .MuiDataGrid-root": {
            backgroundColor: "#0a213d",
          },
          "& .MuiDataGrid-columnHeader": {
            // Background color of column headers
            color: "#0a213d",
            fontFamily: "Outfit",
            fontSize: "19px",
            // Text color of column headers
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ccc", // Border between cells
            color: "#0a213d",
            fontSize: "17px",
            // Text color of cells
          },
          "& .MuiTablePagination-root": {
            color: "#0a213d", // Text color of pagination
          },
          "& .MuiDataGrid-toolbar": {
            color: "#0a213d",
            backgroundColor: "#0a213d", // Background color of the toolbar
          },
          "& .MuiDataGrid-toolbarContainer": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#0a213d",
            // color: 'blue',
          },
          "& .MuiButtonBase-root": {
            color: "#0a213d", // Text color for buttons in the toolbar
          },
          "& .MuiPaginationItem-icon": {
            color: "#0a213d", // Color of pagination icons
          },
          "& .MuiSvgIcon-root": {
            color: "#0a213d",
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
