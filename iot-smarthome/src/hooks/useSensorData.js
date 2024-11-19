import { useState, useEffect } from 'react';
import { subscribeSensorData } from '../services/sensorService';

export const useSensorData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const unsubscribe = subscribeSensorData(
        collectionName,
        (newData) => {
          console.log(`New data from ${collectionName}:`, newData);
          setData(newData);
          setLoading(false);
        },
        (error) => {
          console.error(`Error from ${collectionName}:`, error);
          setError(error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [collectionName]);

  return { data, latestReading: data[0] || null, loading, error };
};