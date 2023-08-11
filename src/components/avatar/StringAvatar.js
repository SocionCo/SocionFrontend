import Avatar from '@mui/material/Avatar';
import * as React from 'react';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name, size) {
  if (size) {
    const fontSize = size/2;
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: fontSize
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
}

export default function StringAvatar({ name, size }) {
  console.log("Name and size", name);
  console.log("Name and size", size);
  if (size) {
    return (

      <Avatar style={{ width: size, height: size }} {...stringAvatar(name,size)} />
    );
  } else {
    return (
      <Avatar {...stringAvatar(name)} />
    );
  }
}
