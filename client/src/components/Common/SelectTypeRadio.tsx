import  React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { RadioDataTypeForTable } from '../../types/uiTypes';

interface SelectTypeRadioProps{
    onChange:(action:RadioDataTypeForTable)=>void;
}

export default function SelectTypeRadio({onChange}:SelectTypeRadioProps) {
    const [state,setState] = useState<RadioDataTypeForTable>('all')
    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value as RadioDataTypeForTable;
        onChange(value);
        setState(value)
    }
    
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Filter by</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={state}
      >
        <FormControlLabel value="all" control={<Radio />} label="All"  />
        <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
        <FormControlLabel value="active" control={<Radio />} label="Active" />
      </RadioGroup>
    </FormControl>
  );
}
