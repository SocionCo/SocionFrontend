import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import '../../App.css';

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
  const nameParts = name.split(' ');
const firstInitial = (nameParts[0] ? nameParts[0][0] : '').toUpperCase();
const secondInitial = (nameParts[1] ? nameParts[1][0] : '').toUpperCase();
  if (size) {
    const fontSize = size/2;
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: fontSize
      },
      children: `${firstInitial}${secondInitial}`,
    };
  } else {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstInitial}${secondInitial}`,
    };
  }
}

export default function StringAvatar({ name, size }) {
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
