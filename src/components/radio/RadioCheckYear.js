import React, {useState } from "react";
import Radio from '@mui/material/Radio';

export default function RadioCheckYear({onRadioChange}) {
  const [selectedValue, setSelectedValue] = useState(true);

  const handleChange = (value) => {
    setSelectedValue(value);
    onRadioChange(value);
    // console.log(selectedValue)
  };

  return (
    <div className="m-1">
      Monthly
      <Radio
        checked={selectedValue === false}
        onChange={() => handleChange(false)}
        name="radio-buttons"
      
      />
      Yearly
      <Radio
        checked={selectedValue === true}
        onChange={() => handleChange(true)}
        name="radio-buttons"
      
      />
    </div>
  );
}
