import { useState, useEffect } from 'react';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

export const useSensorData = (collectionRef) => {
  const [data, setData] = useState({
    data: [],
    latestReading: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!collectionRef) {
      console.error('Collection reference is undefined');
      return;
    }

    console.log('Setting up snapshot listener for:', collectionRef.path);
    
    try {
      const q = query(
        collectionRef,
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          if (!snapshot.empty) {
            const docs = snapshot.docs.map(doc => {
              const data = doc.data();
              const timestamp = data.timestamp?.toDate?.() || new Date(data.timestamp);
              return {
                id: doc.id,
                timestamp,
                value: typeof data.value === 'string' ? parseFloat(data.value) : data.value,
                status: data.status || null
              };
            });

            setData({
              data: docs,
              latestReading: docs[0],
              loading: false,
              error: null
            });
          }
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up snapshot:', error);
      setData(prev => ({ ...prev, error, loading: false }));
    }
  }, [collectionRef]);

  return data;
};