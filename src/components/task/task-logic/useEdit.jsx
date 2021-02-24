import { useState } from 'react';

const useEdit = (text, onEditing, onEditTask) => {
  const [value, setValue] = useState(text);

  const onEnterHandler = (evt) => {
    // newEdit
    if (evt.key === 'Enter') {
      onEditTask(value);
    }
  };

  const onInputChange = (evt) => setValue(evt.target.value); // newEdit

  const onButtonClickEdit = (evt) => {
    // newEdit
    evt.preventDefault();
    onEditing();
  };

  return [onButtonClickEdit, onInputChange, onEnterHandler, value];
};

export default useEdit;
