import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const daysParsed = props.days.map((scheduledDay) => {
        return (
          <DayListItem
          key={scheduledDay.id} 
          name={scheduledDay.name} 
          spots={scheduledDay.spots} 
          selected={scheduledDay.name === props.value}
          setDay={props.onChange}
          />
        );
      })
  return <ul> {daysParsed} </ul>;
}