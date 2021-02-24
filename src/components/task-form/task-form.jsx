import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTimerForm, useContentForm, useSubmitForm } from './task-form-logic/index';
import './task-form.css';

const TaskForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [onMinHandler, onSecHandler] = useTimerForm(setMinutes, setSeconds);
  const [onTaskHandler] = useContentForm(setContent);
  const [onKeyHandler] = useSubmitForm(onSubmit, content, minutes, seconds, setContent, setMinutes, setSeconds);

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="Task"
        onChange={onTaskHandler}
        onKeyDown={onKeyHandler}
        value={content}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinHandler}
        onKeyDown={onKeyHandler}
        value={minutes}
        id="minutes"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecHandler}
        onKeyDown={onKeyHandler}
        value={seconds}
        id="seconds"
      />
    </form>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TaskForm;
