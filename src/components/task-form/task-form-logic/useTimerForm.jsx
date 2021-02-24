const useTimerForm = (setMinutes, setSeconds) => {
  const validateTimer = (timerValue, id) => {
    switch (true) {
      case Number.isNaN(Number(timerValue)):
        return '';
      case id === 'seconds' && Number(timerValue) > 59:
        return '59';
      default:
        return timerValue;
    }
  };

  const onMinHandler = (evt) => setMinutes(validateTimer(evt.target.value, evt.target.id));

  const onSecHandler = (evt) => setSeconds(validateTimer(evt.target.value, evt.target.id));

  return [onMinHandler, onSecHandler];
};

export default useTimerForm;
