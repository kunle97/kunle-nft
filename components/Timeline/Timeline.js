import React from "react";
import TimelineSegment from "./TimelineSegment";

const Timeline = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="list-group timeline">
          <TimelineSegment
            inverted={false}
            src="assets/img/pixelmon/pixelmon12.svg"
            phase="Phase 1"
            title="Our Humble Beginnings"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                  temporibus qui quibusdam, recusandae sit vero unde, sed,
                  incidunt et ea quo dolore laudantium consectetur!"
          />
          <TimelineSegment
            inverted={true}
            src="assets/img/pixelmon/pixelmon14.svg"
            phase="Phase 2"
            title="An Agency is Born"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                  temporibus qui quibusdam, recusandae sit vero unde, sed,
                  incidunt et ea quo dolore laudantium consectetur!"
          />
          <TimelineSegment
            inverted={false}
            src="assets/img/pixelmon/pixelmon9.svg"
            phase="Phase 3"
            title="Transition to Solana"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                  temporibus qui quibusdam, recusandae sit vero unde, sed,
                  incidunt et ea quo dolore laudantium consectetur!"
          />
          <TimelineSegment
            inverted={true}
            src="assets/img/pixelmon/pixelmon1.svg"
            phase="Phase 4"
            title="Metaverse Expansion"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                  temporibus qui quibusdam, recusandae sit vero unde, sed,
                  incidunt et ea quo dolore laudantium consectetur!"
          />

          <li className="list-group-item timeline-inverted">
            <div className="timeline-image">
              <h4>Be Part Of Our Story!</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
