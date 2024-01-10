import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function DropdownSelect({ options, label, onSelectionChange, value}) {

  const handleSelectionChange = (event, newValue) => {
    if (onSelectionChange) {
      onSelectionChange(newValue);
    }
  };


  return (
    <Autocomplete
    isOptionEqualToValue={(option, value) => option.label === value.label && option.year === value.year}
      multiple
      fullWidth
      disablePortal
      value={value}
      id="combo-box-demo"
      onChange={handleSelectionChange}
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

