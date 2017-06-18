import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from 'Firebase';
import user from 'Modules/user';
import AuthorizedUser from 'Containers/AuthorizedUser';

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
        {
          userID ?
          <AuthorizedUser
            userID={userID}
          /> :
          <div>You need to authorize</div>
        }
      </div>
    );
  }
}