const useSubmitForm = (onSubmit, content, minutes, seconds, setContent, setMinutes, setSeconds) => {
  const defaultTimer = '00'; // useSubmitForm

  const onKeyHandler = (evt) => {
    // useSubmitForm
    if (evt.key === 'Enter') {
      onSubmit(content, minutes || defaultTimer, seconds || defaultTimer);
      setContent('');
      setMinutes('');
      setSeconds('');
    }
  };

  return [onKeyHandler];
};

export default useSubmitForm;
