import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelForm = ({ model, onClose, allBrands }) => {
  const [formData, setFormData] = useState({
    name: '',
    brandId: '',
  });

  useEffect(() => {
    if (model) {
      setFormData({
        name: model.name || '',
        brandId: model.brandId ? model.brandId._id ?? '' : allBrands.length > 0 ? allBrands[0]._id : '',
      });
    }
  
    // Ensure formData.brandId corresponds to a valid brand ID
    if (!allBrands.find((brand) => brand._id === formData.brandId)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        brandId: allBrands.length > 0 ? allBrands[0]._id : '', // Default to the first brand ID
      }));
    }
  }, [model, allBrands]);
  

  useEffect(() => {
    console.log('All Brands:', allBrands);
  }, [allBrands]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/model/${model._id}`, formData);
      console.log('Model updated:', response.data);

      // Close the form after successful update
      onClose();
    } catch (error) {
      console.error('Error updating model:', error.response.data.error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div>
      <h2>Edit Model</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
  Brand:
  <select name="brandId" value={formData.brandId || ''} onChange={handleChange}>
    <option value="">Select a Brand</option>
    {allBrands.map((brand) => (
      <option key={brand._id} value={brand._id}>
        {brand.name}
      </option>
    ))}
  </select>
</label>


        <br />
        <button type="submit">Update Model</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ModelForm;
