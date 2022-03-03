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

      function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
        return axios
          .put(`/api/appointments/${id}`, { interview })
          .then(() => {
            setState({...state, appointments})
      })
        .catch((error) => console.log(error));
      }

      function cancelInterview(id) {
        let appointmentObj = {...state.appointments[id], interview: null};
        const appointments = {...state.appointments, [id]: appointmentObj}
        return axios.delete(`/api/appointments/${id}`)
          .then(() => {
            setState({...state, appointments})
          })
          .catch((err) => console.log(err));
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