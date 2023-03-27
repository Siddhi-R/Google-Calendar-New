import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Labels() {

  const {  setShowLoading, clinicList, setClinicList, setClinicSelected, setClinicSelectedName } = useContext(GlobalContext);
  // const [checkboxId, setCheckboxId] = useState('');
  const [clinicListAutomcomplete, setClinicListAutocomplete] = useState([]);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    setShowLoading(true)
    fetch(`https://org.vetic.in/clinic-org/workspace/list`, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(results => results.json())
      .then(data => {
        setClinicList(data.data.results);
        const clinicListArray = [];
        data.data.results.map(item => clinicListArray.push({label: item.name, id: item.id}));
      //  console.log('clinicListArray:', clinicListArray)
        setClinicListAutocomplete(clinicListArray);
        setShowLoading(false)
      //  console.log('result:', data.data, data.data.results)
      });
  }, []); 

  // const onChangeCheckbox = (id, clinic_id) => {
  //   setCheckboxId(id);
  //   setClinicSelected(clinic_id);
  //   //setDoctorsName(doctors_name);
  //   console.log('clinicSelected:', clinicSelected)
  // };

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Clinic List</p> 
      <br/>
      {/* <Autocomplete
        disablePortal
        options={clinicListAutomcomplete}
        onChange={(e)=> {
          console.log('onChange clinic id selected:', e.target.value)
          // onChangeCheckbox(index, id);
          // setClinicSelected(id);
          console.log('inside onChange')
        }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      /> */}

      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
        //  console.log('onChange DropwDown Clinic List')
          setValue(newValue.label);
          // setDropdownId(newValue.id);
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

      {/* {clinicList.map(({name, id}, index) => (
        <label key={index} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checkboxId === index ? true : false}
            onChange={()=> {
              console.log('onChange clinic id selected:', id)
              onChangeCheckbox(index, id);
              setClinicSelected(id);
              //setDoctorsName(name);
              //setShowSlotBook(true);
              console.log('inside onChange')
            }}
            className={`form-checkbox h-5 w-5 text-${name}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{name}</span>
        </label>
      ))}  */}
    </React.Fragment>
  );
}
