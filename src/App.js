import React, { useContext, useEffect } from "react";
import "./App.css";
import { getWeek, getMonth, getWeekOfMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from "dayjs";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AlertNew = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { setWeekIndex, showEventModal, snackbarOpen, showLoading, setWeekIndexNew, setDaysMatrix, weekIndexNew, currentMonth, setCurrentMonth, createSuccessOpen, setCreateSuccessOpen, editSuccessOpen, setEditSuccessOpen } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getWeek(dayjs().month(), weekIndexNew));
    setDaysMatrix(getMonth());
  }, [weekIndexNew]);

  useEffect(() => {
    setWeekIndex(getWeekOfMonth());
    setWeekIndexNew(getWeekOfMonth());
  }, [])

  //console.log('month.js getWeekOfMonth:', weekIndexNew)

  const handleCreateSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCreateSuccessOpen(false);
  };

  const handleEditSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setEditSuccessOpen(false);
  };

  return (
    <React.Fragment>
        <Backdrop
          open={showLoading}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      {showEventModal && <EventModal />}
      {snackbarOpen && 
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Please Select a doctor</Alert>
        </Stack>
      }

        <Snackbar
          open={createSuccessOpen}
          autoHideDuration={1000}
        >
           <AlertNew onClose={handleCreateSuccessClose} severity="info" sx={{ width: '100%' }}>
            Appointment Created Successfully
           </AlertNew>
        </Snackbar> 

        <Snackbar
          open={editSuccessOpen}
          autoHideDuration={1000}
        >
           <AlertNew onClose={handleEditSuccessClose} severity="info" sx={{ width: '100%' }}>
            Appointment Updated Successfully
           </AlertNew>
        </Snackbar> 

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
