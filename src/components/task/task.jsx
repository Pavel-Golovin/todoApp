import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  static defaultProps = {
    text: 'undefinedTask',
    className: null,
    onCompleted: () => {},
    onDestroyed: () => {},
  };

  static propTypes = {
    text: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    className: PropTypes.string,
    onCompleted: PropTypes.func,
    onDestroyed: PropTypes.func,
    onEditTask: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired,
  };

  /* eslint-disable  react/destructuring-assignment */

  state = {
    value: this.props.text,
    distance: formatDistanceToNow(this.props.creationTime, { includeSeconds: true }),
  };

  /* eslint-enable  react/destructuring-assignment */

  update = () => {
    const { creationTime } = this.props;
    this.setState({
      distance: formatDistanceToNow(creationTime, { includeSeconds: true }),
    });
  };

  componentDidMount = () => {
    this.timerID = setInterval(() => this.update(), 1000);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timerID);
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    const { onEditTask } = this.props;
    const { value } = this.state;
    onEditTask(value);
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

  handleKeyPress = (evt) => {
    const { onCompleted } = this.props;
    if (evt.code === 'Enter') {
      onCompleted();
    }
  };

  /* eslint-disable */
  render() {
    const { text, className, onCompleted, onDestroyed, minutes, seconds } = this.props;
    const { distance, value } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions
            onClick={onCompleted}
            onKeyPress={this.handleKeyPress}
          >
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play" type="button" />
              <button className="icon icon-pause" type="button" />
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
        {className === 'editing' ? (
          <input type="text" className="edit" value={value} onChange={this.onInputChange} />
        ) : null}
      </form>
    );
  }
  /* eslint-enable */
}
