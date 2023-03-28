import React, {useContext, useEffect, useState} from "react";
import Day from "./Day";
import { timeZone } from "../constants/time-constant";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GlobalContext from "../context/GlobalContext";
import styled from 'styled-components';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabWrapper = styled(Tab)`
  border: 1px solid rgba(229,231,235,var(--tw-border-opacity));
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  ${props =>
    props.tabId === props.activeTab &&
    `
      background-color: #6495ED;
      color: white;
    `}
`;

const DayWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  width: 83vw;
`;

const TimeZoneWrapper = styled.div`
  border-bottom : 1px solid rgba(229, 231, 235, var(--tw-border-opacity));
  padding : 30px;
`;

const BoxWrapper = styled(Box)`
  margin-left: 157px;   
`;

export default function Month({ month }) {
  const { doctorsList, setDoctorSelected, setDoctorsName, setShowSlotBook, setDoctorsList, setShowLoading, clinicSelected } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if(clinicSelected !== undefined){
     // console.log('clinic Selected:', clinicSelected)
      setShowLoading(true)
      fetch(`http://localhost:1337/api/clinics-lists/${clinicSelected}?populate=*`, {
          method: "GET",
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(results => results.json())
        .then(data => {
          console.log('setDoctorsList:', data.data.attributes.doctors_data.data)
          setDoctorsList(data.data.attributes.doctors_data.data);
          setShowLoading(false)
        });
    }
  }, [clinicSelected]); 

  return (
    <React.Fragment>
      <div>
        {timeZone.map(time => {
              <TimeZoneWrapper>
                  {time}
              </TimeZoneWrapper>
          })}
        </div>
        <div className="grid-rows-2">
          <BoxWrapper> 
              <Tabs aria-label="basic tabs example">
                {doctorsList.map((item, index) => (
                   <TabWrapper key={index} value={index} label={item.attributes.doctor_name} {...a11yProps(index)} tabId={index} activeTab={activeTab} onClick={() => {
                      setActiveTab(index);
                      setDoctorSelected(item.id);
                      console.log('doctor selected:', item.id)
                      setDoctorsName(item.attributes.doctor_name);
                      setShowSlotBook(true);
                    }}
                    />
                ))}
              </Tabs>
           </BoxWrapper>
          <DayWrapper className="flex-1 grid grid-cols-8">
            {month.map((row, i) => (
              <React.Fragment key={i}>
                <Day day={row} key={i} rowIdx={i} />
              </React.Fragment> 
            ))}
          </DayWrapper>
        </div>
        
    </React.Fragment>
  );
}
