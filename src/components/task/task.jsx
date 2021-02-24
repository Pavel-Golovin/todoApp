import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useEdit, useDistance, useTimer } from './task-logic/index';
import './task.css';

const Task = ({
  text,
  creationTime,
  min,
  sec,
  onEditTask,
  onEditing,
  completed,
  toBeEdited,
  onCompleted,
  onDestroyed,
  id,
}) => {
  const [onButtonClickEdit, onInputChange, onEnterHandler, value] = useEdit(text, onEditing, onEditTask);
  const [distance, updateDistance] = useDistance(creationTime);
  const [timer, timerId, stopTimer, playTimer] = useTimer(min, sec);

  useEffect(() => {
    const timeID = setInterval(() => {
      updateDistance();
    }, 1000);
    return () => {
      clearTimeout(timeID);
      clearInterval(timerId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <li className={`${completed ? 'completed' : ''} ${toBeEdited ? 'editing' : ''}`} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onCompleted} />
        <label>
          <span className="title">{text}</span>
          <span className="description">
            <button className="icon icon-play" type="button" aria-label="Play Timer" onClick={playTimer} />
            <button className="icon icon-pause" type="button" aria-label="Pause Timer" onClick={stopTimer} />
            <p>{`${timer.minutes}:${timer.seconds}`}</p>
          </span>
          <span className="created">{`created ${distance} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onButtonClickEdit} aria-label="Редактировать" />
        <button type="button" className="icon icon-destroy" onClick={onDestroyed} aria-label="Удалить" />
      </div>
      {toBeEdited ? (
        <input type="text" className="edit" value={value} onChange={onInputChange} onKeyDown={onEnterHandler} />
      ) : null}
    </li>
  );
};

Task.defaultProps = {
  text: 'undefinedTask',
  onCompleted: () => {},
  onDestroyed: () => {},
};

Task.propTypes = {
  text: PropTypes.string,
  creationTime: PropTypes.instanceOf(Date).isRequired,
  onCompleted: PropTypes.func,
  onDestroyed: PropTypes.func,
  onEditTask: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  min: PropTypes.string.isRequired,
  sec: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  toBeEdited: PropTypes.bool.isRequired,
};

export default Task;
