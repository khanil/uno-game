function User(admin) {
  this.usersRef = admin.database().ref('users');

  this.changeRoom = function(user, room) {
    const userRef = this.usersRef.child(user);
    return userRef.update({
      room
    });
  }
}

module.exports = User;