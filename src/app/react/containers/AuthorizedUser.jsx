import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'Firebase';
import user from 'Modules/user';
import Rooms from 'Containers/Rooms';

const mapStateToProps = (state, ownProps) => {
  return {
    room: user.selectors.getRoomID(state),
    status: user.selectors.getRoomStatus(state)
  }
};

const mapDispatchToProps = {
  watchForUpdates: user.actions.watchForUpdates,
  stopWatchForUpdates: user.actions.stopWatchForUpdates,
  watchForRoomStatus: user.actions.watchForRoomStatus,
  stopWatchForRoomStatus: user.actions.stopWatchForRoomStatus
};

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthorizedUser extends Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {
      userID,
      watchForUpdates
    } = this.props;

    watchForUpdates(userID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.room != this.props.room) {
      const oldRoom = this.props.room;
      const newRoom = nextProps.room;

      if (!oldRoom) {
        this.props.watchForRoomStatus(newRoom);
        return;
      }

      this.props.stopWatchForRoomStatus(oldRoom);

      if (newRoom) {
        this.props.watchForRoomStatus(newRoom);
        return;
      }
    }
  }

  componentWillUnmount() {
    const {
      userID,
      stopWatchForUpdates
    } = this.props;

    stopWatchForUpdates(userID);
  }

  render() {
    const {
      userID,
      room,
      status
    } = this.props;

    return (
      <div>
        <div>
          <div>Auth user: <span>{userID}</span></div>
          <div>Current room: <span>{room}</span></div>
          <div>Status: <span>{status}</span></div>
        </div>

        <Rooms
          userID={userID}
        />
      </div>
    );
  }
}