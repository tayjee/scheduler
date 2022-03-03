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
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
      transition(SAVE);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(err => transition(ERROR_SAVE, true));
    }
  

  function cancel() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)}  onEdit={() => transition(EDIT)} />)}
        {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />) }  
        {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />) }
        {mode === SAVE && (<Status message="Saving..." />) }
        {mode === DELETE && (<Status message="Deleting..." />) }
        {mode === CONFIRM && (<Confirm onCancel={() => back()} onConfirm={cancel} message={"Are you sure you would like to delete this appointment?"} />)}
        {mode === EDIT && (<Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id} />) }
        {mode === ERROR_SAVE && (<Error message="Appointment could not be saved" onClose={back}/>) }
        {mode === ERROR_DELETE && (<Error message="Appointment could not be deleted" onClose={back}/>) }
    </article>
  )
};