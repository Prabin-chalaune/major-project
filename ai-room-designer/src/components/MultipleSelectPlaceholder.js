// File2 code: MultipleSelectPlaceholder.js:

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Bed Room',
  'Kitchen',
  'Dining Room',
  'Living Room',
  'Bath Room',
];

function getStyles(name, selectedRoom, theme) {
  return {
    fontWeight: selectedRoom === name
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MultipleSelectPlaceholder = ({ onRoomSelect }) => {
  const theme = useTheme();
  const [selectedRoom, setSelectedRoom] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedRoom(value);
    onRoomSelect(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
      <Select
        value={selectedRoom}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) =>
          selected ? selected : <em>Select Room Type</em>
        }
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, selectedRoom, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectPlaceholder;