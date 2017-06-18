import React from 'react';

export default function Room({ id, room, join, leave }) {
  const style = {
    marginTop: "10px",
    border: "2px solid black"
  };

  return (
    <div style={style}>
      <div>{room.capacity}</div>
      <div>{room.owner}</div>
      <div>
        {
          Object.keys(room.members || {}).map(memberID => {
            return (
              <div key={"member-" + memberID}>{memberID + ";"}</div>
            );
          })
        }
      </div>
      <button onClick={join.bind(null, id)}>Join</button>
      <button onClick={leave.bind(null, id)}>Leave</button>
    </div>
  );
}