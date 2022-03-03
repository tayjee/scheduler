import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
const [error, setError] = useState("");

function validate(name) {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onSave(student, interviewer);
  }

const reset = () => {
  setStudent('');
  setInterviewer('');
};

const cancel = () => {
  reset();
  props.onCancel();
}


const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        placeholder="Enter Student Name"
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      /* your code goes here */
      interviewers={props.interviewers}
      onChange={setInterviewer}
      value={interviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={() => {validate(student)}} >Save</Button>
    </section>
  </section>
</main>
  )
}