export function getAppointmentsForDay(state, day) {

  let appointments = [];

  const chosenDay = state.days.filter((givenDay) => givenDay.name === day);

  if (chosenDay[0] && chosenDay[0].appointments) {
    appointments = chosenDay[0].appointments;
  }
  
  return appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {

  let interviewers = [];

  const chosenDay = state.days.filter((givenDay) => givenDay.name === day);

  if (chosenDay[0] && chosenDay[0].interviewers) {
    interviewers = chosenDay[0].interviewers;
  }

  return interviewers.map((id) => state.interviewers[id]);
}

export function getInterview(state, interview) {

  if(!interview) {
    return null;
  }

  const {student, interviewer } = interview;
  
  return {
    student,
    interviewer: state.interviewers[interviewer],
  }

}