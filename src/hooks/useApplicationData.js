import { useState, useEffect }  from "react";
import axios from "axios";


const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(appointmentID, cancelInterview) {

    const givenDay = state.days.filter(day => day.appointments.includes(appointmentID))[0];
    let numberOfSpots = givenDay.spots;

    if (state.appointments[appointmentID].interview !== null && !cancelInterview) {
      return state.days;
    }

    if (cancelInterview) {
      numberOfSpots++;
      } else {
        numberOfSpots--;
    }

    const spotCount = [ ...state.days ];
    spotCount.find(day => day === givenDay).spots = numberOfSpots;

    return spotCount;
  }
  
  function bookInterview(id, interview) {
    const days = updateSpots(id, false);

    const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
        };

    const appointments = {
        ...state.appointments,
        [id]: appointment
        };

      return axios
        .put(`/api/appointments/${id}`, { interview })
        .then(() => {
          setState({...state, appointments, days})
      })
    }

      function cancelInterview(id) {
        let appointmentObj = {...state.appointments[id], interview: null};
        const appointments = {...state.appointments, [id]: appointmentObj}
        const days = updateSpots(id, true);
        
          return axios.delete(`/api/appointments/${id}`)
            .then(() => {
              setState({...state, appointments, days})
          })
       }

        useEffect(() => {
          Promise.all([
            axios.get("/api/days"),
            axios.get("/api/appointments"),
            axios.get("/api/interviewers"),
          ])
          .then((all) => {
            setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data, }));
          })
          .catch((error) => console.log("error", error));
        }, []);

        return {state, setDay, bookInterview, cancelInterview };
      }

  export default useApplicationData;