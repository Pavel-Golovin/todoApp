import { useState } from 'react';

const useFilter = (onFilter) => {
  const [filterName, setFilterName] = useState('All');

  const onButtonClick = (evt) => {
    onFilter(evt.target.name);
    setFilterName(evt.target.name);
  };

  return [filterName, onButtonClick];
};

export default useFilter;
