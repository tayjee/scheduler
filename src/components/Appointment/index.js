import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Status";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    transition(SHOW);
  }

  function cancel() {
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} />)}
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}  
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} onDelete={() => transition(CONFIRM)} />)}
      {mode === SAVING && (<Status message="Saving..." />) }
      {mode === CONFIRM && (<Confirm onCancel={() => back()} onConfirm={cancel} message={"Are you sure you would like to delete this appointment?"} />)}
    </article>
  )
};