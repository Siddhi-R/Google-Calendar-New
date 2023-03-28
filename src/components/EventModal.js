import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import {timeZone, timeSlots} from '../constants/time-constant';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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

const DivWrapper = styled.div`
  margin-left: 90px; 
  z-index : 1;
`;

const HeaderDiv = styled.div`
  border-bottom: 1px solid #F5F5F5;
`;

const AddButton = styled.button`
  border: 1px solid orange;
  padding: 2px 8px;
  background-color: orange;
  color: white;
  font-weight: bold;
`;

const FormWrapper = styled.form`
  height: auto;
  width: 60%;
  position: relative;
`;

const InputDivWrapper = styled.div`
  padding: 40px 100px;
`;

const CancelButton = styled.button`
  width:50%;
  height:60px;
  fontWeight: 600;
  background-color: #F5F5F5;
`;

const SubmitButton = styled.button`
  width:50%;
  height: 60px;
  fontWeight: 600;
  color: white;
`;

const DeleteButton = styled.button`
  width:50%;
  height: 60px;
  fontWeight: 600;
  color: white;
  background-color: #CC0000;
`;

const FooterWrapper = styled.footer`
  border-top: 1px solid #cccc;
`;

const InputWrapper = styled.input`
  font-size: 15px;
  background-color: #E8E8E8;
  border-radius: 3px;
`;

const SpanWrapper = styled.span`
  display: flex;
  align-self: center;
`;

const SelectWrapper = styled.select`
  border-radius: 4px;
`;

const TextAreaWrapper = styled.textarea`
  border-radius: 5px;
`;

const DateWrapper = styled.input`
  border-radius: 4px;
`

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    timeSelected,
    dispatchCalEvent,
    selectedEvent,
    doctorSelected,
    doctorsName,
    setRowIdx,
    setIndex,
    setDocDate,
    docDate,
    setDocStartTime,
    docStartTime,
    setDocEndTime,
    docEndTime,
    setDocSlotDetails,
    docSlotDetails,
    setSnackbarOpen,
    showEditButton,
    setShowEditButton,
    setDocSlotIDs,
    setDocSlotUserName,
    docSlotIDs,
    docSlotUserName,
    docSlotWorkspace,
    setDocSlotWorkspace,
    selectedSlotArrIndex,
    setSelectedSlotArrIndex,
    setDocSlotService,
    docSlotService,
    clinicSelected,
    clinicSelectedName,
    doctorsList,
    setDocSlotUserMobile,
    docSlotUserMobile,
    setCreateSuccessOpen,
    setEditSuccessOpen,
    setDeleteSuccessOpen
  } = useContext(GlobalContext);

  console.log('doctors name :', doctorsName, doctorSelected, docSlotService, selectedSlotArrIndex)

  let serviceValFiltered = '';

  if(selectedSlotArrIndex !== null){
    serviceValFiltered = docSlotService[selectedSlotArrIndex]
  }
  

  //console.log('serviceValFiltered:', serviceValFiltered)
  const [customer, setCustomer] = useState([]);
  const [workspaceList, setWorkspaceList] = useState([]);
  const customerValSelected = selectedSlotArrIndex !== null ? docSlotUserName[selectedSlotArrIndex] : '';
  const customerPhoneSelected = selectedSlotArrIndex !== null ? docSlotUserMobile[selectedSlotArrIndex] : '';
  // const workspaceNameFiltered = workspaceList && workspaceList.filter(item => {
  //   if(item.id === docSlotWorkspace[selectedSlotArrIndex]){
  //     return item.name;
  // }
  // })
  // console.log('workspaceNameFiltered:', workspaceNameFiltered)
  // const workspaceValueSelected = selectedSlotArrIndex !== null ? workspaceNameFiltered.length && workspaceNameFiltered[0].name : clinicSelectedName;
  const workspaceValueSelected = selectedSlotArrIndex !== null ?  docSlotWorkspace[selectedSlotArrIndex] : clinicSelectedName;
  const startTimeSelected = selectedSlotArrIndex !== null ? docStartTime[selectedSlotArrIndex] : timeZone[timeSelected].start_time;
  const endTimeSelected = selectedSlotArrIndex !== null ? docEndTime[selectedSlotArrIndex] : timeZone[timeSelected].end_time;
  const titleSelected = selectedSlotArrIndex !== null ? docSlotDetails[selectedSlotArrIndex] :'';
  const dateSelected = selectedSlotArrIndex !== null ? docDate[selectedSlotArrIndex] : daySelected.format('YYYY-MM-DD');
  const serviceSelected = selectedSlotArrIndex !== null ? docSlotService[selectedSlotArrIndex] : '';
  const [customerValue, setCustomerValue] = React.useState(customerValSelected);
  const [customerPhone, setCustomerPhone] = React.useState(customerPhoneSelected);
  const [serviceValue, setServiceValue] = React.useState(serviceSelected);
  const [workspaceValue, setWorkspaceValue] = React.useState(workspaceValueSelected);
  const [startTime, setStartTime] = React.useState(startTimeSelected);
  const [date, setDate] = useState(dateSelected);
  const [endTime, setEndTime] = React.useState(endTimeSelected);
  const [title, setTitle] = useState(titleSelected);
  const [addAppointment, setAddAppointment] = useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [workspaceId, setWorkspaceId] = useState('');
  const [workspaceInputValue, setWorkspaceInputValue] = React.useState(workspaceValueSelected);
  const [customerInputValue, setCustomerInputValue] = React.useState(customerValSelected);
  const [workspaceAutomcomplete, setWorkspaceAutocomplete] = useState([]);
  const [inputValue, setInputValue] = React.useState('');

  // console.log('clinicSelectedName:', clinicSelectedName, workspaceValue, docSlotWorkspace[selectedSlotArrIndex], docSlotWorkspace, workspaceList, workspaceValueSelected)

  useEffect(() => {
    getServicesList();
    getDoctorsBookings(doctorSelected);
  }, [doctorSelected]);

  function getCustomerList(input){
    fetch(`https://api.vetic.in/lead/customer?name=${input}`, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(results => results.json())
    .then(data => {
     // console.log('customer List :', data.data);
      let customerNew = [];
      data.data.map(item => customerNew.push({label : `${item.name} (${item.mobile})`, id : item.mobile}));
      // console.log('customerNew:', customerNew)
      setCustomer(customerNew);
    });
  }

  function createBooking(){
    if(doctorSelected === undefined){
      setSnackbarOpen(true)
      setTimeout(()=> 
      {
        setSnackbarOpen(false);
        setShowEventModal(false);
      }
      , 2000);
      
      return false;
    }

    const slotBookDataNew = {"data" : {
        "date": date,
        "assigned_staff": doctorSelected,
        "start_time": startTime,
        "end_time": endTime,
        "customer_name": customerValue,
        "customer_phone": customerPhone,
        "notes": title,
        "clinic_name": workspaceValue,
        "service": serviceValue,
    }}; 

    console.log('create booking new obj :', slotBookDataNew)

   fetch(`http://localhost:1337/api/doctor-appointments`, {
     method: "POST",
     headers: {"Content-type": "application/json; charset=UTF-8"},
     body: JSON.stringify(slotBookDataNew),
   })
   .then(results => results.json())
   .then(data => {
     setDocSlotUserMobile([...docSlotUserMobile, customerPhone])
     setDocSlotIDs([...docSlotIDs, data.data.id])
     setDocDate([...docDate, date])
     setDocStartTime([...docStartTime, startTime])
     setDocEndTime([...docEndTime, endTime])
     setDocSlotDetails([...docSlotDetails, title])
     setDocSlotUserName([...docSlotUserName, customerValue])
     setDocSlotWorkspace([...docSlotWorkspace, workspaceValue]);
     setDocSlotService([...docSlotService, serviceValue]);
     setShowEventModal(false);
  //  console.log('event modal docSlotService:', docSlotService );
     setCreateSuccessOpen(true);
     setTimeout(()=> setCreateSuccessOpen(false), 1000)
   });
  };

  function editBooking(){

    const editSlotBookDataNew = {"data" : {
        "date": date,
        "assigned_staff": doctorSelected,
        "start_time": startTime,
        "end_time": endTime,
        "customer_name": customerValue,
        "customer_phone": customerPhone,
        "description": title,
        "clinic_name": workspaceValue,
        "service": serviceValue
    }};

   // console.log('editSlotBookDataNew:', editSlotBookDataNew)

    fetch(`http://localhost:1337/api/doctor-appointments/${docSlotIDs[selectedSlotArrIndex]}`, {
      method: "PUT",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(editSlotBookDataNew),
    })
    .then(results => results.json())
    .then(data => {
      docSlotWorkspace[selectedSlotArrIndex] = workspaceValue;
      docSlotUserMobile[selectedSlotArrIndex] = customerPhone;
      docStartTime[selectedSlotArrIndex] = startTime;
      docEndTime[selectedSlotArrIndex] = endTime;
      docSlotUserName[selectedSlotArrIndex] = customerValue;
      docSlotDetails[selectedSlotArrIndex] = title;
      docDate[selectedSlotArrIndex] = date;
      docSlotService[selectedSlotArrIndex] = serviceValue;
      docSlotIDs[selectedSlotArrIndex] = data.data.id;
   //   console.log('docSlotService:', docSlotService)
      setShowEventModal(false);
      setShowEditButton(false);
      setEditSuccessOpen(true);
      setTimeout(()=> setEditSuccessOpen(false), 1000)
    });
  }

  function deleteBooking(){
    const dateArr = docDate.filter(item => item !== docDate[selectedSlotArrIndex]);
    const startTimeArr = docStartTime.filter(item =>  item !== docStartTime[selectedSlotArrIndex]);
    const endTimeArr = docEndTime.filter(item =>  item !== docEndTime[selectedSlotArrIndex]);
    const slotDetailsArr = docSlotDetails.filter(item =>  item !== docSlotDetails[selectedSlotArrIndex]);
    const slotIdsArr = docSlotIDs.filter(item =>  item !== docSlotIDs[selectedSlotArrIndex]);
    const slotUserNameArr = docSlotUserName.filter(item =>  item !== docSlotUserName[selectedSlotArrIndex]);
    const slotWorkspaceArr = docSlotWorkspace.filter(item =>  item !== docSlotWorkspace[selectedSlotArrIndex]);
    const slotDateArr = docDate.filter(item =>  item !== docDate[selectedSlotArrIndex]);
    fetch(`http://localhost:1337/api/doctor-appointments/${docSlotIDs[selectedSlotArrIndex]}`, {
      method: "DELETE",
    })
    .then(results => results.json())
    .then(data => {
      setDocSlotIDs(slotIdsArr)
      setDocDate(dateArr)
      setDocStartTime(startTimeArr)
      setDocEndTime(endTimeArr)
      setDocSlotDetails(slotDetailsArr)
      setDocSlotUserName(slotUserNameArr)
      setDocSlotWorkspace(slotWorkspaceArr);
      setDocDate(slotDateArr);
      setShowEventModal(false);
      setShowEditButton(false);
      setOpenDialog(false);
      setSelectedSlotArrIndex(null);
      setDeleteSuccessOpen(true);
      setTimeout(()=> setDeleteSuccessOpen(false), 1000)
    });
  }

  function getServicesList(){
    fetch(`http://localhost:1337/api/services-lists`, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(results => results.json())
    .then(data => {
      const serviceListArray = [];
      data.data.map(item => serviceListArray.push({label: item.attributes.service_name, id: item.id}));
      setServiceList(serviceListArray)
    });
  }

  function getDoctorsBookings(doctorSelected){
    fetch(`http://localhost:1337/api/doctors-list-clinic-wises/${doctorSelected}?populate=*`, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(results => results.json())
    .then(data => {
      console.log('get doctors bookings :', doctorSelected, data)
    });
  }


  const onAppointmentClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    createBooking();
  }

  function onCloseModal(e) {
    e.preventDefault();
    setShowEventModal(false);
    setAddAppointment(false);
    setRowIdx(null);
    setIndex(null);
    setSelectedSlotArrIndex(null);
    setShowEditButton(false);
  }

  const handleCustomerChange = (event) => {
    setCustomerValue(event.target.value);
  };

  const handleServiceChange = (event) => {
    const {
      target: { value },
    } = event;
    setServiceValue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStartTimeChange= (event) => {
    setStartTime(event.target.value);
    console.log('start_time:', event.target.value)
  };

  const handleEndTimeChange= (event) => {
    setEndTime(event.target.value);
    console.log('end_time:', event.target.value)
  };

  const onEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault()
    editBooking();
  }

  const onDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault()
    setOpenDialog(true);
  }

  const handleDialogOnNo = () => {
    setOpenDialog(false);
  }

  const handleDialogOnYes = () => {
    deleteBooking();
  }

  return (
    <DivWrapper className="h-screen w-full fixed left-20 top-0 flex justify-center items-center">
      <FormWrapper className="bg-white rounded-lg shadow-2xl w-1/4">
        <HeaderDiv>
          <header className=" px-4 py-2 flex justify-between items-center">
             {showEditButton &&  <span className="font-semibold">Edit/Delete Appointment</span>}
             {!showEditButton &&  <span className="font-semibold"><AddButton>+</AddButton> &nbsp;&nbsp;&nbsp;New Appointment</span>}
            <div>
              <button onClick={onCloseModal}>
                <span className="material-icons-outlined text-gray-400">
                  close
                </span>
              </button>
            </div>
          </header>
        </HeaderDiv>
        <InputDivWrapper className="p-3" style={{ 'height': '70vh','overflow': 'scroll'}}>
          <div className="grid grid-cols-2 items-end gap-y-5" style={{'height': 'auto'}}>
            <span className="text-gray-600 font-medium">
              Workspace
            </span>
            <Autocomplete disabled
              value={workspaceValue}
              onChange={(event, newValue) => {
                event.stopPropagation();
                event.preventDefault();
                setWorkspaceValue(newValue.label);
                setWorkspaceId(newValue.id);
              }}
              inputValue={workspaceInputValue}
              onInputChange={(event, newInputValue) => {
                event.preventDefault();
                setWorkspaceInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={workspaceAutomcomplete}
              renderInput={(params) => <TextField {...params} label="Workspace" />}
            />
             <span className="text-gray-600 font-medium">
              Service
            </span>

            <Autocomplete
              value={serviceValue}
              onChange={(event, newValue) => {
                setServiceValue(newValue.label)
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={serviceList}
              renderInput={(params) => <TextField {...params} label="Select Service" />}
            />

            {/* <FormControl>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={serviceValue}
                input={<OutlinedInput />}
                onChange={handleServiceChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Select a Service</em>;
                  }
                  return selected;
                }}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Select a Service</em>
                </MenuItem>
                {serviceList.map((service) => (
                  <MenuItem key={service.attributes.service_name} value={service.attributes.service_name}>
                    <Checkbox checked={serviceValue.indexOf(service.attributes.service_name) > -1} />
                    <ListItemText primary={service.attributes.service_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
             <span className="text-gray-600 font-medium">
              Assigned Staff
            </span>
            <InputWrapper
              type="text"
              name="doctorsName"
              value={doctorsName}
              disabled
              required
              className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {}}
            />
             <span className="text-gray-600 font-medium">
              Date
            </span>
            <DateWrapper
              type="date"
              name="title"
              value={date}
              required
              className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
              onChange={(e) => {
                setDate(e.target.value)
                console.log('setDate:', e.target.value)
              }}
            />
             <span className="text-gray-600 font-medium">
              Start Time
            </span>
            <SelectWrapper value={startTime} onChange={handleStartTimeChange}>
              {timeSlots && timeSlots.map((option, id) => (
                <option key={id} value={option.start_time}>{option.time}</option>
              ))}
            </SelectWrapper>
            <span className="text-gray-600 font-medium">
              End Time
            </span>
            <SelectWrapper value={endTime} onChange={handleEndTimeChange}>
              {timeSlots && timeSlots.map((option, id) => (
                <option key={id} value={option.start_time}>{option.time}</option>
              ))}
            </SelectWrapper>
             <span className="text-gray-600 font-medium">
              Customer Name
            </span>
            <input
              type="text"
              name="customerName"
              value={customerValue}
              className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {setCustomerValue(e.target.value)}}
            />
            <span className="text-gray-600 font-medium">
              Customer Phone Number
            </span>
            <input
              type="text"
              name="customerPhone"
              value={customerPhone}
              className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {setCustomerPhone(e.target.value)}}
            />
             {/* <Autocomplete
              value={customerValue}
              onChange={(event, newValue) => {
                event.stopPropagation();
                event.preventDefault();
              //  console.log('onChange:', newValue, newValue.label, newValue.id)
                setCustomerValue(newValue.label);
                // setDropdownId(newValue.id);
                setWorkspaceId(newValue.id);
              }}
              inputValue={customerInputValue}
              onInputChange={(event, newInputValue) => {
                event.preventDefault();
              //  console.log('onInputChange:', newInputValue)
                if(newInputValue.length >= 3){
                  getCustomerList(newInputValue);
                }else if(newInputValue.length === 0){
                  setCustomer([]);
                }
                setCustomerInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={customer}
              renderInput={(params) => <TextField {...params} label="Customer" />}
            /> */}
             <SpanWrapper className="text-gray-600 font-medium">
              Notes
            </SpanWrapper>
            <TextAreaWrapper
              name="title"
              value={title}
              rows="5"
              className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            ></TextAreaWrapper>
            <Dialog
              open={openDialog}
              onClose={handleDialogOnNo}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete the booking ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogOnNo}>No</Button>
                <Button onClick={handleDialogOnYes} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Basic example"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}
          </div>
        </InputDivWrapper>
        <FooterWrapper className='flex grid-cols-2'>  
       {!showEditButton &&
        <>
            <CancelButton
            onClick={onCloseModal}
            className="border-r "
            >
              Cancel
            </CancelButton>
            <SubmitButton
            type="submit"
            onClick={onAppointmentClick}
            className="bg-blue-500 "
            >
              Add Appointment
            </SubmitButton>
        </> 
        }  
        {showEditButton &&
        <>
            <CancelButton
            onClick={onDeleteClick}
            className="bg-blue-500 "
            >
              Delete
            </CancelButton>
            <SubmitButton
            onClick={onEditClick}
            className="bg-blue-500 "
            >
              Update
            </SubmitButton>
        </> 
        }  
        </FooterWrapper>
      </FormWrapper>
    </DivWrapper>
  );
}
