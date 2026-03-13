import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useFetchDetail = (url) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(url);
        setLoading(false);
        setData(response.data);
        // console.log(response.data);
      } catch (err) {
        setLoading(false);
        setError(err.message || "Something went wrong");
        console.error("Error fetching now playing data:", err);
      }
    };

    useEffect(() => {
      fetchData();
    }, [url]);

    return { data, loading, error };
}

export default useFetchDetail
