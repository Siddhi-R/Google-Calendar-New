import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { timeZone } from "../constants/time-constant";
import styled from 'styled-components';

const TimeZoneMainDivWrapper = styled.div`
  position: relative;
  top: 121.5px;
`;

const TimeZoneDivWrapper = styled.div`
  padding : 18px 0px;  
`;

const TimeZoneParaWrapper = styled.p`
  color: lightslategray;
  font-size: 12px;
  margin-right: 15px;
`;

const DateDivWrapper = styled.div`
  border-bottom : 1px solid rgba(229, 231, 235, var(--tw-border-opacity));
  padding : 30px;
  position: sticky;
  background-color: aliceblue;
  top: 0
`;

const CapsuleWraper = styled.div`
  border: 1px solid rgba(59, 130, 246);
  padding: 0px 10px;
  border-radius: 20px;
  width: 100%;
  font-size: 12px;
  color: rgba(59, 130, 246);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-grid;
`;

const TimeZoneBoxWrapper = styled.div`
  border-bottom : 1px solid rgba(229, 231, 235, var(--tw-border-opacity));
  padding : 30px 5px;
  max-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CapsuleTextWrapper = styled.p`
  font-weight: bold
`;

export default function Day({ day, rowIdx }) {
 // console.log('day.js day value:', day.format('dddd').toLowerCase())
  const {
    setDaySelected,
    setTimeSelected,
    setShowEventModal,
    doctorSelected,
    setDoctorsSlot,
    setRowIdx,
    setIndex,
    setDocDate,
    docDate,
    setDocStartTime,
    docStartTime,
    setDocEndTime,
    docEndTime,
    setDocSlotDetails,
    setShowLoading,
    setShowEditButton,
    setDocSlotIDs,
    setDocSlotUserName,
    docSlotUserName,
    setSelectedSlotArrIndex,
    setDocSlotWorkspace,
    setDocSlotService,
    setStaffScheduleData,
    staffScheduleData,
    disableSlots,
    setDocSlotUserMobile,
    setStaffAvailabilityData,
    setStaffUnavailabilityData,
    staffAvailabilityData,
    staffUnavailabilityData,
    setShowSettings,
    setSchedulePresent,
    schedulePresent,
  } = useContext(GlobalContext);

  console.log('day js doctorSelected:', doctorSelected)

  useEffect(() => {
    if(doctorSelected !== undefined){
      setShowLoading(true);
      bookingList();
      // staffSchedule();
      // staffUnavailability();
      // staffAvailability();
      // setShowSettings(true);
    }
  }, [doctorSelected]);

  function bookingList(){
    fetch(`http://localhost:1337/api/doctors-list-clinic-wises/${doctorSelected}?populate=*`, {
      method: "GET",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(results => results.json())
    .then(data => {
    //  console.log('booking/list response :', data.data)
      setDoctorsSlot(data.data.attributes.appointments_data.data);
      console.log('appointment data:', data.data.attributes.appointments_data.data)
      const dateArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.date});
      const userMobileArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.customer_phone});
      // const slotIdArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.id});
      const startTimeArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.start_time});
      const endTimeArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.end_time});
      const slotDetailsArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.notes});
      const slotIdsArr = data.data.attributes.appointments_data.data.map(item => {return item.id});
      const slotUserNameArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.customer_name});
      const slotWorkspaceArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.clinic_name});
      const slotServiceArr = data.data.attributes.appointments_data.data.map(item => {return item.attributes.service});
      setDocSlotUserMobile(userMobileArr);
      // setDocSlotIDs(slotIdArr)
      setDocDate(dateArr);
      setDocStartTime(startTimeArr);
      setDocEndTime(endTimeArr);
      setDocSlotDetails(slotDetailsArr);
      setShowLoading(false);
      setDocSlotIDs(slotIdsArr);
      setDocSlotUserName(slotUserNameArr);
      setDocSlotWorkspace(slotWorkspaceArr);
      setDocSlotService(slotServiceArr);
    //  console.log('slot service:', slotServiceArr);
    });
  }

  // function staffSchedule(){
  //   fetch(`https://booking.vetic.in/staff-schedule/${doctorSelected}/`, {
  //     method: "GET",
  //     headers: {"Content-type": "application/json; charset=UTF-8"}
  //   })
  //   .then(results => results.json())
  //   .then(data => {
  //    console.log('staff schedule API result day.js :', data);
  //    if(data.message !== "Request was successful"){
  //     setSchedulePresent(false);
  //      return;
  //    }else{
  //     setSchedulePresent(true);
  //     setStaffScheduleData(data.data);
  //     setShowLoading(false);
  //    }
  //   }).catch((error) => {
  //     console.error('Error staffSchedule:', error);
  //   });;
  // }

  // function staffUnavailability(){
  //   fetch(`https://booking.vetic.in/staff-unavailability/list?staff_id=${doctorSelected}`, {
  //     method: "GET",
  //     headers: {"Content-type": "application/json; charset=UTF-8"}
  //   })
  //   .then(results => results.json())
  //   .then(data => {
  //    // console.log('staff staffUnavailability API result day.js :', data);
  //     setStaffUnavailabilityData(data.data);
  //     // setShowLoading(false)
  //   });
  // }

  // function staffAvailability(){
  //   fetch(`https://booking.vetic.in/staff-availability/list?staff_id=${doctorSelected}`, {
  //     method: "GET",
  //     headers: {"Content-type": "application/json; charset=UTF-8"}
  //   })
  //   .then(results => results.json())
  //   .then(data => {
  //    // console.log('staff staffAvailability API result day.js :', data);
  //     setStaffAvailabilityData(data.data);
  //     // setShowLoading(false)
  //   });
  // }

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  // const staffAvailabilityLength = staffAvailabilityData.length && staffAvailabilityData.length - 1;
  // const staffUnAvailabilityLength = staffUnavailabilityData.length && staffUnavailabilityData.length - 1;

  // console.log('staffAvailabilityData.length, staffUnAvailabilityLength:', staffAvailabilityLength, staffUnAvailabilityLength)

  // const startTimeCondition = (start_time) => {

  //   if((staffAvailabilityData.length && staffAvailabilityData[staffAvailabilityLength].date !== undefined) && staffScheduleData.monday_start_time !== undefined && start_time !== undefined){
  //     console.log("--------startTimeCondition-------------- : ", staffScheduleData.monday_start_time, start_time, staffScheduleData.monday_start_time > start_time, day.format('YYYY-MM-DD'), staffAvailabilityData.length, staffAvailabilityData[staffAvailabilityLength].date, staffAvailabilityData[staffAvailabilityLength].start_time, (staffAvailabilityData[staffAvailabilityLength].start_time ) > start_time)
  //     }

  //   return (staffScheduleData.monday_start_time !== undefined && staffScheduleData.monday_start_time > start_time  && (day.format('YYYY-MM-DD') !== (staffAvailabilityData.length && staffAvailabilityData[staffAvailabilityLength].date) || (staffAvailabilityData.length && staffAvailabilityData[staffAvailabilityLength].start_time !== undefined && staffAvailabilityData[staffAvailabilityLength].start_time ) > start_time));
  // };


  // const endTimeCondition = (start_time) => {

  //   if((staffAvailabilityData.length && staffAvailabilityData[staffAvailabilityLength].date !== undefined) && staffScheduleData.monday_end_time !== undefined && start_time !== undefined){
  //     console.log("--------endTimeCondition-------------- : ", staffScheduleData.monday_end_time, start_time, staffScheduleData.monday_end_time > start_time, day.format('YYYY-MM-DD'), staffAvailabilityData.length, staffAvailabilityData[staffAvailabilityLength].date, staffAvailabilityData[staffAvailabilityLength].end_time, (staffAvailabilityData[staffAvailabilityLength].end_time ) < start_time)
  //     }

  //   return ( staffScheduleData.monday_end_time !== undefined && staffScheduleData.monday_end_time <= start_time  && (day.format('YYYY-MM-DD') !== (staffAvailabilityData.length && staffAvailabilityData[staffAvailabilityLength].date) || (staffAvailabilityData.length && staffAvailabilityData[staffAvailabilityLength].end_time !== undefined && staffAvailabilityData[staffAvailabilityLength].end_time ) < start_time) );
  // };

  console.log('rowIdx ::', rowIdx)

  return (
    <>
      {rowIdx === 0 && (
        <TimeZoneMainDivWrapper className="flex-1 cursor-pointer grid-cols-1">
          {timeZone.map(({time, id}, i) => 
            <TimeZoneDivWrapper  key={i} >
              {rowIdx === 0 &&  <TimeZoneParaWrapper className="text-sm mt-1 text-right">{time}</TimeZoneParaWrapper>}
            </TimeZoneDivWrapper>
          )}
        </TimeZoneMainDivWrapper>
      )}
      <div className="border border-gray-200 flex flex-col">
        <div className="flex-1 cursor-pointer">
          <DateDivWrapper>
              <p className="text-sm mt-1 text-center">
                {day.format("ddd").toUpperCase()}
              </p>
              <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
                {day.format("DD")}
              </p>
          </DateDivWrapper>
          {timeZone.map(({time, id, start_time, end_time}, index) => 
            <TimeZoneBoxWrapper  key={index}  
              // style={{"backgroundColor" : disableSlots || (schedulePresent  && (doctorSelected && startTimeCondition(start_time) || endTimeCondition(start_time))) ? "#F0F0F0" : '', "cursor": disableSlots || (schedulePresent  && (doctorSelected && startTimeCondition(start_time) || endTimeCondition(start_time))) ? "not-allowed" : ''}}
              onClick={(e) => {
                //   if(disableSlots || (schedulePresent && (doctorSelected && startTimeCondition(start_time) || endTimeCondition(start_time)))){
                //  // console.log('check if key exists :', staffScheduleData.hasOwnProperty('monday_start_time'))
                //   e.stopPropagation();
                //   e.preventDefault();
                // }else{
                  console.log('staffSchedule on clicj:', staffScheduleData)
                  setDaySelected(day);
                  setTimeSelected(index);
                  setShowEventModal(true);
                  setRowIdx(rowIdx);
                  setIndex(index);
                // }
              }}
              >
                {docDate && docDate.map((item,id) => item === day.format('YYYY-MM-DD') && docStartTime[id] >= start_time && docEndTime[id] <= end_time && 
                  <CapsuleWraper key={id} 
                    onClick={(e) => {
                      //console.log('time bool :', docStartTime[id] >= start_time && docEndTime[id] <= end_time, docStartTime[id], docEndTime[id], start_time, end_time)
                      e.preventDefault();
                      setShowEditButton(true);
                      console.log('setSelectedSlotArrIndex:', id)
                      setSelectedSlotArrIndex(id);
                    }}
                  >
                    <CapsuleTextWrapper>{docSlotUserName[id]}</CapsuleTextWrapper> &nbsp;{docStartTime[id]} - {docEndTime[id]}
                  </CapsuleWraper>
                )}
            </TimeZoneBoxWrapper>
          )}
        </div>
    </div>
  </>
  );
}
