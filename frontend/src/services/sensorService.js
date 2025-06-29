import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { firestore } from './firebase';

export const COLLECTIONS = {
  INSIDE_TEMP: collection(firestore, 'insideTemperatureData'),
  INSIDE_HUMIDITY: collection(firestore, 'insideHumidityData'),
  OUTSIDE_TEMP: collection(firestore, 'outsideTemperatureData'),
  OUTSIDE_HUMIDITY: collection(firestore, 'outsideHumidityData'),
  OUTSIDE_MOTION: collection(firestore, 'outsideMotionData')
};

export const subscribeSensorData = (collectionName, callback, errorCallback) => {
  console.log(`Subscribing to ${collectionName}`);
  const collectionRef = collection(firestore, collectionName);
  
  try {
    const q = query(
      collectionRef,
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    return onSnapshot(q, 
      (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const rawData = doc.data();
          let value = rawData.value;
          if (typeof value === 'string') {
            value = parseFloat(value.replace(/[°C%]/g, ''));
          }
          
          let timestamp;
          if (rawData.timestamp instanceof Timestamp) {
            timestamp = rawData.timestamp.toDate();
          } else if (typeof rawData.timestamp === 'string') {
            timestamp = new Date(rawData.timestamp);
          } else if (rawData.timestamp && rawData.timestamp.seconds) {
            timestamp = new Date(rawData.timestamp.seconds * 1000);
          } else {
            timestamp = new Date();
          }
          
          return {
            id: doc.id,
            ...rawData,
            value,
            timestamp
          };
        });
        console.log(`Processed data from ${collectionName}:`, data);
        callback(data);
      },
      (error) => {
        console.error(`Error in ${collectionName}:`, error);
        errorCallback?.(error);
      }
    );
  } catch (error) {
    console.error(`Setup error in ${collectionName}:`, error);
    errorCallback?.(error);
    return () => {};
  }
}; 