import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  weekIndex: 0,
  setWeekIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
  timeSelected : 1,
  setTimeSelected: (index) => {},
  showSlotBook: false,
  setShowSlotBook: () => {},
  doctorSelected : null,
  setDoctorSelected: (id) => {},
  setDoctorsName: (name) => {},
  doctorName : null,
  setDoctorsSlots: (data) => {},
  doctorsSlots: [],
  setDocDate: (data) => {},
  docDate: [],
  setDocStartTime: (data) => {},
  docStartTime: [],
  setDocEndTime: (data) => {},
  docEndTime: [],
  setDocSlotDetils: (data) => {},
  docSlotDetils: [],
  indexNew: null,
  setIndex: (index) => {},
  rowIdxNew: null,
  setRowIdxNew: (index) => {},
  snackbarOpen : false,
  setSnackbarpOpen : () => {},
  showLoading : false,
  setShowLoading : () => {},
  doctorsList : [],
  setDoctorsList : () => {},
  showEditButton: false,
  setShowEditButton: () => {},
  setDocSlotIDs: (data) => {},
  docSlotIDs: [],
  setDocSlotUserName: (data) => {},
  docSlotUserName: [],
  setDocSlotWorkspace: (data) => {},
  docSlotWorkspace: [],
  setDocSlotService: (data) => {},
  docSlotService: [],
  setSelectedSlotArrIndex: (index) => {},
  selectedSlotArrIndex: null,
  weekIndexNew : 0,
  setWeekIndexNew: (index) => {},
  daysMatrixNew: [],
  setDaysMatrix: (data) => {},
  currentMonth: [],
  setCurrentMonth: (data) => {},
  staffScheduleData: {},
  setStaffScheduleData: (data) => {},
  clinicList : [],
  setClinicList : (data) => {},
  clinicSelected : null,
  setClinicSelected: (id) => {},
  clinicSelectedName : '',
  setClinicSelectedName: (name) => {},
  disableSlots : false,
  setDisableSlots: () => {},
  setDocSlotUserMobile: (data) => {},
  docSlotUserMobile: [],
  createSuccessOpen: false,
  setCreateSuccessOpen: () => {},
  deleteSuccessOpen: false,
  setDeleteSuccessOpen: () => {},
  editSuccessOpen: false,
  setEditSuccessOpen: () => {},
  setStaffUnavailabilityData: (data) => {},
  staffUnavailabilityData: [],
  setStaffAvailabilityData: (data) => {},
  staffAvailabilityData: [],
  setShowSettings: false,
  showSettings: () => {},
  setSchedulePresent: false,
  showSchedulePresent: () => {},
  clinicListAutocomplete : [],
  setClinicListAutocomplete : () => {},
  staffAddSuccessOpen : false,
  setStaffAddSuccessOpen: () => {}
});

export default GlobalContext;
