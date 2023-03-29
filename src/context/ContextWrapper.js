import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { getWeek } from "../util";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) =>
        evt.id === payload.id ? payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekIndex, setWeekIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [timeSelected, setTimeSelected] = useState();
  const [showSlotBook, setShowSlotBook] = useState();
  const [doctorSelected, setDoctorSelected] = useState();
  const [doctorsName, setDoctorsName] = useState();
  const [doctorsSlot, setDoctorsSlot] = useState([]);
  const [docDate, setDocDate] = useState([]);
  const [docStartTime, setDocStartTime] = useState([]);
  const [docEndTime, setDocEndTime] = useState([]);
  const [docSlotDetails, setDocSlotDetails] = useState([]);
  const [docSlotIDs, setDocSlotIDs] = useState([]);
  const [docSlotUserName, setDocSlotUserName] = useState([]);
  const [docSlotUserMobile, setDocSlotUserMobile] = useState([]);
  const [docSlotWorkspace, setDocSlotWorkspace] = useState([]);
  const [selectedSlotArrIndex, setSelectedSlotArrIndex] = useState(null);
  const [indexNew, setIndex] = useState(null);
  const [rowIdxNew, setRowIdx] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [showEditButton, setShowEditButton] = useState(false);
  const [docSlotService, setDocSlotService] = useState([])
  const [weekIndexNew, setWeekIndexNew] = useState(0);
  const [daysMatrixNew, setDaysMatrix] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getWeek());
  const [staffScheduleData, setStaffScheduleData] = useState({});
  const [clinicSelected, setClinicSelected] = useState();
  const [clinicList, setClinicList] = useState([]);
  const [clinicSelectedName, setClinicSelectedName] = useState('');
  const [disableSlots, setDisableSlots] = useState('');
  const [createSuccessOpen, setCreateSuccessOpen] = useState(false);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [editSuccessOpen, setEditSuccessOpen] = useState(false);
  const [staffAvailabilityData, setStaffAvailabilityData] = useState([]);
  const [staffUnavailabilityData, setStaffUnavailabilityData] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [schedulePresent, setSchedulePresent] = useState(false);
  const [staffAddSuccessOpen, setStaffAddSuccessOpen] = useState(false);
  const [clinicListAutomcomplete, setClinicListAutocomplete] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        timeSelected,
        setTimeSelected,
        doctorSelected,
        setDoctorSelected,
        showSlotBook,
        setShowSlotBook,
        updateLabel,
        filteredEvents,
        doctorsName,
        setDoctorsName,
        doctorsSlot,
        setDoctorsSlot,
        indexNew,
        setIndex,
        rowIdxNew,
        setRowIdx,
        setDocDate,
        docDate,
        setDocStartTime,
        docStartTime,
        setDocEndTime,
        docEndTime,
        setDocSlotDetails,
        docSlotDetails,
        snackbarOpen,
        setSnackbarOpen,
        showLoading,
        setShowLoading,
        doctorsList,
        setDoctorsList,
        showEditButton,
        setShowEditButton,
        docSlotIDs,
        setDocSlotIDs,
        docSlotUserName,
        setDocSlotUserName,
        docSlotWorkspace,
        setDocSlotWorkspace,
        selectedSlotArrIndex, 
        setSelectedSlotArrIndex,
        docSlotService,
        setDocSlotService,
        weekIndexNew,
        setWeekIndexNew,
        daysMatrixNew,
        setDaysMatrix,
        currentMonth,
        setCurrentMonth,
        staffScheduleData,
        setStaffScheduleData,
        clinicSelected,
        setClinicSelected,
        clinicList,
        setClinicList,
        clinicSelectedName,
        setClinicSelectedName,
        disableSlots,
        setDisableSlots,
        docSlotUserMobile,
        setDocSlotUserMobile,
        createSuccessOpen,
        setCreateSuccessOpen,
        editSuccessOpen,
        setEditSuccessOpen,
        staffAvailabilityData,
        setStaffAvailabilityData,
        setStaffUnavailabilityData,
        staffUnavailabilityData,
        setShowSettings,
        showSettings,
        schedulePresent,
        setSchedulePresent,
        deleteSuccessOpen,
        setDeleteSuccessOpen,
        clinicListAutomcomplete,
        setClinicListAutocomplete,
        staffAddSuccessOpen,
        setStaffAddSuccessOpen
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
