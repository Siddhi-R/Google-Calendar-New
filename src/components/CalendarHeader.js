import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import { getWeek } from "../util";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { timeZone } from "../constants/time-constant";
import SettingsIcon from '@mui/icons-material/Settings';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '900px !important',
  bgcolor: 'background.paper',
  boxShadow: 24,
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  height:'80vh',
  borderRadius: '10px'
};

const HeadingWrapper = styled.div`
  font-size: 20px;
  padding: 20px 30px;
  background-color: #FAFAFA;
  border-bottom: 1px solid #EFEFEF;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: 19px;
  color: #4C4C4C;
`;

const InputDivWrapper = styled.div`
  padding: 40px 100px;
`;

const InputWrapper = styled.input`
  font-size: 15px;
  border-radius: 3px;
`;

// const FooterWrapper = styled.div`
//   font-size: 20px;
//   padding: 20px 30px;
//   background-color: #FAFAFA;
//   border-bottom: 1px solid #EFEFEF;
//   border-bottom-right-radius: 10px;
//   border-bottom-left-radius: 10px;
//   font-size: 19px;
//   color: #4C4C4C;
// `;

const FooterWrapper = styled.footer`
  border-top: 1px solid #cccc;
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

const SelectWrapper = styled.select`
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
`;

const DateWrapper = styled.input`
  border-radius: 4px;
  height: 42px;
`

const AddButton = styled.button`
  border: 1px solid orange;
  padding: 2px 8px;
  background-color: orange;
  color: white;
  font-weight: bold;
`;

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex, weekIndexNew, daysMatrixNew, setCurrentMonth, setWeekIndexNew, weekIndex, setDisableSlots, showSettings, doctorSelected, doctorName, daySelected } = useContext(GlobalContext);

  const [openSettingsModal, setOpenSettingsModal] = React.useState(false);
  const [monStartTime, setMonStartTime] = React.useState('');
  const [tueStartTime, setTueStartTime] = React.useState('');
  const [wedStartTime, setWedStartTime] = React.useState('');
  const [thuStartTime, setThuStartTime] = React.useState('');
  const [friStartTime, setFriStartTime] = React.useState('');
  const [satStartTime, setSatStartTime] = React.useState('');
  const [sunStartTime, setSunStartTime] = React.useState('');

  const [monEndTime, setMonEndTime] = React.useState('');
  const [tueEndTime, setTueEndTime] = React.useState('');
  const [wedEndTime, setWedEndTime] = React.useState('');
  const [thuEndTime, setThuEndTime] = React.useState('');
  const [friEndTime, setFriEndTime] = React.useState('');
  const [satEndTime, setSatEndTime] = React.useState('');
  const [sunEndTime, setSunEndTime] = React.useState('');

  const [availabilityFromDate, setAvailabilityFromDate] = React.useState(daySelected.format('YYYY-MM-DD'))
  const [availabilityToDate, setAvailabilityToDate] = React.useState(daySelected.format('YYYY-MM-DD'))
  const [availabilityStartTime, setAvailabilityStartTime] = React.useState('');
  const [availabilityEndTime, setAvailabilityEndTime] = React.useState('');

  const [unAvailabilityFromDate, setUnAvailabilityFromDate] = React.useState(daySelected.format('YYYY-MM-DD'))
  const [unAvailabilityToDate, setUnAvailabilityToDate] = React.useState(daySelected.format('YYYY-MM-DD'))
  const [unavailabilityStartTime, setUnAvailabilityStartTime] = React.useState('');
  const [unavailabilityEndTime, setUnAvailabilityEndTime] = React.useState('');

  const [openAddCustomerModal, setOpenAddCustomerModal] = React.useState(false);
  const [openAddStaffModal, setOpenAddStaffModal] = React.useState(false);

  const handleOpenSettingsModal = () => {
    setOpenSettingsModal(true);
  };
  const handleCloseSettingsModal = () => {
    setOpenSettingsModal(false);
  };

  const staffScheduleCondition = (monStartTime !== '' && monEndTime !== '') || (tueStartTime !== '' && tueEndTime !== '') || (wedStartTime !== '' && wedEndTime !== '')  || (thuStartTime !== '' && thuEndTime !== '')  || (friStartTime !== '' && friEndTime !== '')  || (satStartTime !== '' && satEndTime !== '')  || (sunStartTime !== '' && sunEndTime !== '') ;
  const staffAvailabilityCondition = (availabilityStartTime !== '' && availabilityEndTime !== '' );
  const staffUnavailabilityCondition = (unavailabilityStartTime !== '' && unavailabilityEndTime !== '');

  const onSaveClick = async () => {
      console.log('doctorSelected:', doctorSelected, doctorName);
      console.log('start end time:', sunStartTime, sunEndTime);
      if(staffScheduleCondition){
        console.log('inside setStaffSchedule condition ')
        setStaffSchedule();
      }else{
        console.log('inside setStaffSchedule condition failed')
      }
      if(staffAvailabilityCondition){
        console.log('inside staffAvailabilityCondition condition ')
        setStaffAvailability();
      }else{
        console.log('inside staffAvailabilityCondition condition failed')
      }
      if(staffUnavailabilityCondition){
        console.log('inside staffUnavailabilityCondition condition ')
        setStaffUnAvailability();
      }else{
        console.log('inside staffUnavailabilityCondition condition failed')
      }
  };

  function handleNextWeek() {
   const nextWeekIndex = weekIndexNew + 1;
   setWeekIndexNew(nextWeekIndex);
   setCurrentMonth(getWeek(dayjs().month(), nextWeekIndex));

  if(nextWeekIndex < weekIndex){
     // console.log('week selected is lower than current week')
      setDisableSlots(true);
   }else{
      setDisableSlots(false);
   }
  }

  function handlePrevWeek() {
    const prevWeekIndex = weekIndexNew - 1;
    setWeekIndexNew(prevWeekIndex);
    setCurrentMonth(getWeek(dayjs().month(), prevWeekIndex))
    if(prevWeekIndex < weekIndex){
       // console.log('week selected is lower than current week')
        setDisableSlots(true);
     }else{
        setDisableSlots(false);
     }
   }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function setStaffSchedule(){
    const staffScheduleObj = {
      "monday_start_time": monStartTime,
      "monday_end_time": monEndTime,
      "tuesday_start_time": tueStartTime,
      "tuesday_end_time": tueEndTime,
      "wednesday_start_time": wedStartTime,
      "wednesday_end_time": wedEndTime,
      "thursday_start_time": thuStartTime,
      "thursday_end_time": thuEndTime,
      "friday_start_time": friStartTime,
      "friday_end_time": friEndTime,
      "saturday_start_time": satStartTime,
      "saturday_end_time": satEndTime,
      "sunday_start_time": sunStartTime,
      "sunday_end_time": sunEndTime,
    };

    console.log('setStaffSchedule fn put obj:', staffScheduleObj)

    fetch(`https://booking.vetic.in/staff-schedule/update/${doctorSelected}/`, {
      method: "PUT",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(staffScheduleObj),
    })
    .then(results => results.json())
    .then(data => {
      console.log('Staff Schedule Created Successfully:', data);
    });
  }

  function setStaffAvailability(){
    const staffAvailabilityObj = {
      "staff_id": doctorSelected,
      "date": availabilityFromDate,
      "start_time": availabilityStartTime,
      "end_time": availabilityEndTime,
      "type": null
    };

    console.log('setStaffAvailability fn put obj:', staffAvailabilityObj)

    fetch(`https://booking.vetic.in/staff-availability/create`, {
      method: "POST",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(staffAvailabilityObj),
    })
    .then(results => results.json())
    .then(data => {
      console.log('Staff Availability Created Successfully:', data);
    });
  }

  function setStaffUnAvailability(){
    const staffUnAvailabilityObj = {
      "staff_id": doctorSelected,
      "date": unAvailabilityFromDate,
      "start_time": unavailabilityStartTime,
      "end_time": unavailabilityEndTime,
      "type": null
    };

    console.log('setStaffUnAvailability fn put obj:', staffUnAvailabilityObj)

    fetch(`https://booking.vetic.in/staff-unavailability/create`, {
      method: "POST",
      headers: {"Content-type": "application/json; charset=UTF-8"},
      body: JSON.stringify(staffUnAvailabilityObj),
    })
    .then(results => results.json())
    .then(data => {
      console.log('Staff UnAvailability Created Successfully:', data);
    });
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Calendar
      </h1>
      <button
        onClick={handleReset}
        className=" rounded py-2 px-4 mr-5"
      >
        
      </button>
      <button onClick={handlePrevWeek}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextWeek} style={{'cursor' : 'pointer'}}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold" style={{'width': '200px'}}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
      <div  style={{'width': '90%','display': 'flex','justifyContent': 'flex-end'}}>
        <button style={{marginRight: '20px', fontWeight: '600'}} onClick={() => setOpenAddCustomerModal(true)}>+ Add New Customer</button>
        <button style={{marginRight: '20px', fontWeight: '600'}} onClick={() => setOpenAddStaffModal(true)}>+ Add New Staff</button>
        {showSettings && 
          <button onClick={handleOpenSettingsModal} >
            <SettingsIcon />
          </button>
      }
      </div>
      
      <Modal
        open={openSettingsModal}
        onClose={handleCloseSettingsModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 900 }}>
          <HeadingWrapper >Working Hours</HeadingWrapper>
            <div style={{'padding' : '30px 40px', 'height': '70vh','overflow' : 'scroll'}}>
              <div style={{'fontSize': '14px','borderBottom': '1px solid #EFEFEF','paddingBottom': '10px'}}>Working Hours</div>
                <div style={{'padding' : '20px 20px'}} className="grid grid-cols-4 items-end gap-y-5">
                  {/* <div style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Sunday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={sunStartTime} onChange={(e) => setSunStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={sunEndTime} onChange={(e) => setSunEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}

                  {/* <div class="grid grid-cols-2 items-end gap-y-5" style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Monday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={monStartTime} onChange={(e) => setMonStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={monEndTime} onChange={(e) => setMonEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}

                  {/* <div style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Tuesday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={tueStartTime}  onChange={(e) => setTueStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={tueEndTime} onChange={(e) => setTueEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}

                  {/* <div style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Wednesday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={wedStartTime}  onChange={(e) => setWedStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={wedEndTime} onChange={(e) => setWedEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}

                  {/* <div style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Thursday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={thuStartTime}  onChange={(e) => setThuStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={thuEndTime} onChange={(e) => setThuEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}

                  {/* <div style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Friday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={friStartTime} onChange={(e) => setFriStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}}  value={friEndTime}onChange={(e) => setFriEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}

                  {/* <div style={{'borderBottom': '1px solid  #F5F6F8', 'paddingBottom' : '15px','display': 'flex','alignItems': 'center', 'marginTop': '15px'}}> */}
                    <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>
                      Saturday
                    </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={satStartTime}  onChange={(e) => setSatStartTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                    <div style={{'textAlign' : 'center'}}> - </div>
                    <SelectWrapper style={{'border': '1px solid #e1e1e1'}}  value={satEndTime} onChange={(e) => setSatEndTime(e.target.value)}>
                      {timeZone && timeZone.map((item) => (
                        <option key={item.id} value={item.start_time}>{item.time}</option>
                      ))}
                    </SelectWrapper>
                  {/* </div> */}
                </div>
                <br/><br/>
                <div> 
                  <div style={{'fontSize': '14px','borderBottom': '1px solid #EFEFEF','paddingBottom': '10px',}}>Special Working Hours</div>
                    <div style={{'fontSize' : '13px', 'color': '#5B6572','paddingTop': '10px'}}>Workings on weekends or compensating for time off? Add them here to let customers know when you're available.</div>
                    <div style={{'padding' : '20px 20px'}} class="grid grid-cols-4 items-end gap-y-2">
                      <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>Date</div>
                      <DateWrapper
                        type="date"
                        name="title"
                        value={availabilityFromDate}
                        required
                        className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                        onChange={(e) => {
                          setAvailabilityFromDate(e.target.value)
                        }}
                      />
                      {/* </div>
                      <div style={{'padding' : '20px 20px'}} class="grid grid-cols-2 items-end gap-y-2"> */}
                      <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={availabilityStartTime}  onChange={(e) => setAvailabilityStartTime(e.target.value)}>
                        {timeZone && timeZone.map((item) => (
                          <option key={item.id} value={item.start_time}>{item.time}</option>
                        ))}
                      </SelectWrapper>

                      {/* <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>To</div>
                        <DateWrapper
                          type="date"
                          name="title"
                          value={availabilityToDate}
                          required
                          className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                          onChange={(e) => {
                            setAvailabilityToDate(e.target.value)
                          }}
                        /> */}
                        <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={availabilityEndTime}  onChange={(e) => setAvailabilityEndTime(e.target.value)}>
                          {timeZone && timeZone.map((item) => (
                            <option key={item.id} value={item.start_time}>{item.time}</option>
                          ))}
                        </SelectWrapper>
                    </div>
                    </div>
                  <div><br/><br/>
                    <div style={{'fontSize': '14px','borderBottom': '1px solid #EFEFEF','paddingBottom': '10px',}}>Time Off</div>
                    <div style={{'fontSize' : '13px', 'color': '#5B6572','paddingTop': '10px'}}>Block days off of your schedule. Take a break or make time for other schedules you may have.</div>
                    <div style={{'padding' : '20px 20px'}} class="grid grid-cols-4 items-end gap-y-2">
                      <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>From</div>
                      <DateWrapper
                        type="date"
                        name="title"
                        value={unAvailabilityFromDate}
                        required
                        className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                        onChange={(e) => {
                          setUnAvailabilityFromDate(e.target.value)
                        }}
                      />
                       <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={unavailabilityStartTime}  onChange={(e) => setUnAvailabilityStartTime(e.target.value)}>
                        {timeZone && timeZone.map((item) => (
                          <option key={item.id} value={item.start_time}>{item.time}</option>
                        ))}
                      </SelectWrapper>

                      {/* <div style={{'fontSize' : '14px', 'color': '#666', 'marginRight': '100px'}}>To</div>
                        <DateWrapper
                          type="date"
                          name="title"
                          value={unAvailabilityToDate}
                          required
                          className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                          onChange={(e) => {
                            setUnAvailabilityToDate(e.target.value)
                          }}
                        /> */}
                        <SelectWrapper style={{'border': '1px solid #e1e1e1'}} value={unavailabilityEndTime}  onChange={(e) => setUnAvailabilityEndTime(e.target.value)}>
                          {timeZone && timeZone.map((item) => (
                            <option key={item.id} value={item.start_time}>{item.time}</option>
                          ))}
                        </SelectWrapper>
                    </div>
                </div>
              </div>
          <FooterWrapper className='flex grid-cols-2'>  
            <CancelButton
              onClick={handleCloseSettingsModal}
              className="border-r "
              >
                Cancel
              </CancelButton>
              <SubmitButton
              type="submit"
              onClick={onSaveClick}
              className="bg-blue-500 "
              >
               Save
              </SubmitButton>
          </FooterWrapper>
        </Box>
      </Modal>

      <Modal
        open={openAddCustomerModal}
        onClose={() => setOpenAddCustomerModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 900, height:  '50vh'}}>
          <HeadingWrapper ><span className="font-semibold"><AddButton>+</AddButton> &nbsp;&nbsp;&nbsp;Add New Customer</span></HeadingWrapper>
          <InputDivWrapper className="p-3" style={{ 'height': '40vh','overflow': 'scroll'}}>
            <div className="grid grid-cols-2 items-end gap-y-5" style={{'height': 'auto'}}>
              <span className="text-gray-600 font-medium">
                Customer's Name
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                 Email Address
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                Contact Number
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />
            </div>
          </InputDivWrapper>
          <FooterWrapper className='flex grid-cols-2'>  
            <CancelButton
              onClick={() => setOpenAddCustomerModal(false)}
              className="border-r "
              >
                Cancel
              </CancelButton>
              <SubmitButton
              type="submit"
              onClick={() => console.log('onSaveClick Add Customer')}
              className="bg-blue-500 "
              >
               Save
              </SubmitButton>
          </FooterWrapper>
        </Box>
      </Modal>

      <Modal
        open={openAddStaffModal}
        onClose={() => setOpenAddStaffModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 900 }}>
          <HeadingWrapper ><span className="font-semibold"><AddButton>+</AddButton> &nbsp;&nbsp;&nbsp;Add New Staff</span></HeadingWrapper>
          <InputDivWrapper className="p-3" style={{ 'height': '70vh','overflow': 'scroll'}}>
            <div className="grid grid-cols-2 items-end gap-y-5" style={{'height': 'auto'}}>
              <span className="text-gray-600 font-medium">
                Staff Name
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                Staff Email Address
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                Contact Number
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                Role
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                Date Of Birth
              </span>
              <DateWrapper
                type="date"
                name="title"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" 
                onChange={(e) => {
                }}
              />

              <span className="text-gray-600 font-medium">
                Gender
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />

              <span className="text-gray-600 font-medium">
                Assigned Services
              </span>
              <InputWrapper
                type="text"
                name="Staff Name"
                value=""
                required
                className="pt-3 font-medium pb-2 w-full border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => {}}
              />  
            </div>
          </InputDivWrapper>
          <FooterWrapper className='flex grid-cols-2'>  
            <CancelButton
              onClick={() => setOpenAddStaffModal(false)}
              className="border-r "
              >
                Cancel
              </CancelButton>
              <SubmitButton
              type="submit"
              onClick={() => console.log('onSaveClick Add Staff')}
              className="bg-blue-500 "
              >
               Save
              </SubmitButton>
          </FooterWrapper>
        </Box>
      </Modal>
    </header>
  );
}
