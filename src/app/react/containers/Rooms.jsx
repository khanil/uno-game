import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'Firebase';
import rooms from 'Modules/rooms';
import Room from 'Components/Room';

const mapStateToProps = (state, ownProps) => {
  return {
    rooms: rooms.selectors.getAll(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  rooms.actions.watchForUpdates(dispatch);

  return {
    createRoom: (user, capacity) => dispatch(
      rooms.actions.create(user, capacity)
    ),
    joinRoom: (user, roomID) => dispatch(
      rooms.actions.join(user, roomID)
    ),
    leaveRoom: (user, roomID) => dispatch(
      rooms.actions.leave(user, roomID)
    ),
    removeRoom: (roomID) => dispatch(
      rooms.actions.remove(roomID)
    ),
    startGame: (roomID) => dispatch(
      rooms.actions.startGame(roomID)
    )
  }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Rooms extends Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    rooms: PropTypes.object
  }

  static defaultProps = {
    rooms: {}
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {
      userID,
      rooms,
      createRoom,
      joinRoom,
      leaveRoom,
      removeRoom,
      startGame
    } = this.props;

    return (
      <div>
        {
          Object.keys(rooms).map(key => {
            let room = rooms[key];

            return (
              <Room
                key={key}
                id={key}
                room={room}
                join={joinRoom.bind(null, userID)}
                leave={leaveRoom.bind(null, userID)}
              />
            );
          })
        }

        <div style={{marginTop: "15px"}}>
          <button onClick={createRoom.bind(null, userID, 2)}>
            Create room
          </button>
          <button onClick={removeRoom.bind(null, userID)}>
            Remove room
          </button>
          <button onClick={startGame.bind(null, userID)}>
            Start game
          </button>
        </div>
      </div>
    );
  }
}