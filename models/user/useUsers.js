import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    axios.get('http://127.0.0.1:3001/getUser', {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ Send the token
      },
    })
      .then((res) => {
        setUsers([res.data.user]); // store the single user in an array
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch user:", err);
        setError(err.response?.data?.error || "Request failed");
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
}
