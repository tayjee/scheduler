import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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

  const setDay = (day) => setState({ ...state, day });
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

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList 
days={state.days} 
value={state.day} 
onChange={setDay} 
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map((apt) => {
          const interview = getInterview(state, apt.interview);
      return (
      <Appointment 
      key={apt.id}
      id={apt.id}
      time={apt.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
      );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
