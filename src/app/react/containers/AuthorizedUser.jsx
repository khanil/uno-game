import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'Firebase';
import user from 'Modules/user';
import Rooms from 'Containers/Rooms';

const mapStateToProps = (state, ownProps) => {
  return {
    room: user.selectors.getRoom(state),
    status: user.selectors.getStatus(state)
  }
};

const mapDispatchToProps = {
  watchForUpdates: user.actions.watchForUpdates,
  stopWatchForUpdates: user.actions.stopWatchForUpdates
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