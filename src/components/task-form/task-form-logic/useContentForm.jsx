const useContentForm = (setContent) => {
  const onTaskHandler = (evt) => setContent(evt.target.value);

  return [onTaskHandler];
};

export default useContentForm;
