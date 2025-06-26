import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useOpening() {
  const [opening, setOpening] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/getOpening')
      .then((res) => {
        setOpening(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { opening, loading, error };
}