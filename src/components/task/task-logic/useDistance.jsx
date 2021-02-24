import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const useDistance = (creationTime) => {
  const [distance, setDistance] = useState(formatDistanceToNow(creationTime, { includeSeconds: true }));
  const updateDistance = () => setDistance(formatDistanceToNow(creationTime, { includeSeconds: true }));

  return [distance, updateDistance];
};

export default useDistance;
