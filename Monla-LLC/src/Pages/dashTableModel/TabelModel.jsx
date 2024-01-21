import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ModelForm from '../dashTableModel/modelform';
import { useState, useEffect } from 'react';

export default function ModelsTable() {
  const [rows, setRows] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isModelFormOpen, setIsModelFormOpen] = useState(false);
  const [allBrands, setAllBrands] = useState([]);

  const fetchModels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/model/allmodel');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching models:', error.response.data);
    }
  };

  const fetchAllBrands = async () => {
    try {
      const response = await axios.get('http://localhost:5000/brand/readBrand');
      setAllBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error.response.data);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchAllBrands();
  }, []);

  const handleEditClick = (model) => {
    setSelectedModel(model);
    setIsModelFormOpen(true);
  };

  const handleDeleteClick = async (modelId) => {
    try {
      await axios.delete(`http://localhost:5000/model/${modelId}`);
      // Update the rows state or make a new API call to fetch updated data
      fetchModels();
    } catch (error) {
      console.error('Error deleting model:', error.response.data);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    {
      field: 'brandName',
      headerName: 'Brand',
      width: 150,
      editable: true,
      valueGetter: (params) => params.row.brandId ? params.row.brandId.brand : '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEditClick(params.row)}>Edit</button>
          <button onClick={() => handleDeleteClick(params.row._id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
      />
      {isModelFormOpen && <ModelForm model={selectedModel} onClose={() => setIsModelFormOpen(false)} allBrands={allBrands} />}
    </Box>
  );
}
