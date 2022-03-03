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
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if(interviewer !== null && name.length > 1 ) {
    transition(SAVE);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
    }
  }

  function cancel() {
    transition(DELETE);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)}  onEdit={() => transition(EDIT)} />)}
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />) }  
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} onDelete={() => transition(CONFIRM)} />) }
      {mode === SAVE && (<Status message="Saving..." />) }
      {mode === DELETE && (<Status message="Deleting..." />) }
      {mode === CONFIRM && (<Confirm onCancel={() => back()} onConfirm={cancel} message={"Are you sure you would like to delete this appointment?"} />)}
      {mode === EDIT && (<Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id} />) }
    </article>
  )
};