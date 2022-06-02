import React from "react";

const TimelineSegment = (props) => {
  return (
    <li
      className={`list-group-item ${props.inverted && "timeline-inverted"}  `}
    >
      <div className={`timeline-image`}>
        <img className="rounded-circle img-fluid" src={props.src} />
      </div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4>{props.phase}</h4>
          <h4 className="subheading">{props.title} </h4>
        </div>
        <div className="timeline-body">
          <p className="text-muted">{props.desc}</p>
        </div>
      </div>
    </li>
  );
};

export default TimelineSegment;
