import { useState, useEffect } from 'react';
import { subscribeSensorData } from '../services/sensorService';

export const useSensorData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeSensorData(
      collectionName,
      (newData) => {
        setData(newData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  const latestReading = data[0] || null;

  return { data, latestReading, loading, error };
};