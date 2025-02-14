import  React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TransactionTypeForTable } from '../../types/uiTypes';

interface SelectTypeRadioProps{
    onChange:(action:TransactionTypeForTable)=>void;
}

export default function TransactionRadioBtn({onChange}:SelectTypeRadioProps) {
    const [state,setState] = useState<TransactionTypeForTable>('all')
    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value as TransactionTypeForTable;
        onChange(value);
        setState(value)
    }
    
  return (
    <FormControl>
      <FormLabel id="radio-button">Filter by</FormLabel>
      <RadioGroup
        row
        aria-labelledby="radio-button"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={state}
      >
        <FormControlLabel value="all" control={<Radio />} label="All"  />
        <FormControlLabel value="pending" control={<Radio />} label="Pending" />
        <FormControlLabel value="approved" control={<Radio />} label="Approved" />
        <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
      </RadioGroup>
    </FormControl>
  );
}
