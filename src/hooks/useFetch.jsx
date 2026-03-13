import { useState , useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(url);
                setLoading(false);
                setData(response.data.results);
            } catch (err) {
                setLoading(false);
                setError(err.message || "Something went wrong");
                console.error("Error fetching now playing data:", err);
            }
        }

    useEffect(() => {
        fetchData();
    }, [url]);
  


    return { data, loading, error };

}

export default useFetch