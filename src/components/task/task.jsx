import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    text: 'undefinedTask',
    onCompleted: () => {},
    onDestroyed: () => {},
  };

  static propTypes = {
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

  /* eslint-disable  react/destructuring-assignment */

  state = {
    value: this.props.text,
    distance: formatDistanceToNow(this.props.creationTime, { includeSeconds: true }),
    minutes: Number(this.props.min),
    seconds: Number(this.props.sec),
  };

  timerId = null;

  /* eslint-enable  react/destructuring-assignment */

  update = () => {
    const { creationTime } = this.props;
    this.setState({
      distance: formatDistanceToNow(creationTime, { includeSeconds: true }),
    });
  };

  tickTimer = () => {
    this.setState((state) => {
      let { seconds, minutes } = state;
      if (seconds) {
        seconds -= 1;
      } else if (minutes) {
        minutes -= 1;
        seconds = 59;
      } else {
        clearInterval(this.timerId);
      }
      return { minutes, seconds };
    });
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
  };

  playTimer = () => {
    if (!this.timerId) {
      this.timerId = setInterval(this.tickTimer, 1000);
    }
  };

  componentDidMount = () => {
    this.timeID = setInterval(() => this.update(), 1000);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeID);
    clearInterval(this.timerId);
  };

  onEnterHandler = (evt) => {
    if (evt.key === 'Enter') {
      const { onEditTask } = this.props;
      const { value } = this.state;
      onEditTask(value);
    }
  };

  onInputChange = (evt) => {
    this.setState(() => ({
      value: evt.target.value,
    }));
  };

  onButtonClickEdit = (evt) => {
    evt.preventDefault();
    const { onEditing } = this.props;
    onEditing();
  };

  render() {
    const { id, onCompleted, text, completed, toBeEdited, onDestroyed } = this.props;
    const { distance, value, minutes, seconds } = this.state;

    return (
      <li className={`${completed ? 'completed' : ''} ${toBeEdited ? 'editing' : ''}`} key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onCompleted} />
          <label>
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play" type="button" aria-label="Play Timer" onClick={this.playTimer} />
              <button className="icon icon-pause" type="button" aria-label="Pause Timer" onClick={this.stopTimer} />
              <p>{`${minutes}:${seconds}`}</p>
            </span>
            <span className="created">{`created ${distance} ago`}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={this.onButtonClickEdit}
            aria-label="Редактировать"
          />
          <button type="button" className="icon icon-destroy" onClick={onDestroyed} aria-label="Удалить" />
        </div>
        {toBeEdited ? (
          <input
            type="text"
            className="edit"
            value={value}
            onChange={this.onInputChange}
            onKeyDown={this.onEnterHandler}
          />
        ) : null}
      </li>
    );
  }
}
