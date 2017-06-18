import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from 'Firebase';
import user from 'Modules/user';
import Rooms from 'Containers/Rooms';

const mapStateToProps = (state, ownProps) => {
  return {
    userUID: user.selectors.getUID(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  user.actions.watchAuthChange(dispatch);

  return {
    signInAnonymously: () => dispatch(user.actions.signInAnonymously())
  }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ReactApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.signInAnonymously();
  }

  render() {
    const userID = this.props.userUID;

    return (
      <div>
        <div>{userID}</div>

        {
          userID ?
          <Rooms
            userID={userID}
          /> :
          null
        }
      </div>
    );
  }
}