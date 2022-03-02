export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appointments = [];
  const chosenDay = state.days.filter((givenDay) => givenDay.name === day);
  if (chosenDay[0] && chosenDay[0].appointments) {
    appointments = chosenDay[0].appointments;
  }
  return appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {

  if(!interview) {
    return null;
  }
  
  interview.interviewer = state.interviewers[interview.interviewer];
  return interview;

}