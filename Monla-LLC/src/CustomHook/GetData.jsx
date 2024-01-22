import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchData=(api)=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api);
        if(response){
        setData(response.data);
        }else{
            setData([]);
            setLoading(false);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
