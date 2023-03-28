import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Labels() {

  const {  setShowLoading, clinicList, setClinicList, setClinicSelected, setClinicSelectedName } = useContext(GlobalContext);
  const [clinicListAutomcomplete, setClinicListAutocomplete] = useState([]);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    setShowLoading(true)
    fetch(`http://localhost:1337/api/clinics-lists`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(results => results.json())
      .then(data => {
        console.log('data:', data)
        setClinicList(data.data);
        const clinicListArray = [];
        data.data.map(item => clinicListArray.push({label: item.attributes.clinic_name, id: item.id}));
        console.log('clinicListArray:', clinicListArray)
        setClinicListAutocomplete(clinicListArray);
        setShowLoading(false)
      });
  }, []); 

  console.log('clinicListAutomcomplete:', clinicListAutomcomplete)

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Clinic List</p> 
      <br/>

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue.label);
          setClinicSelected(newValue.id)
          setClinicSelectedName(newValue.label)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={clinicListAutomcomplete}
        renderInput={(params) => <TextField {...params} label="Clinic List" />}
      />
    </React.Fragment>
  );
}
