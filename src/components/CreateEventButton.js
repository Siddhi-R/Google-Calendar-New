import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
import styled from 'styled-components';

const SpanWrapper = styled.span`
   padding-left: 7px;
   padding-right : 9px
`;

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    // <button
    //   onClick={() => setShowEventModal(true)}
    //   className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    // >
    //   <img src={plusImg} alt="create_event" className="w-7 h-7" />
    //   <SpanWrapper>Add Appointment</SpanWrapper>
    // </button>
    <>
    </>
  );
}
