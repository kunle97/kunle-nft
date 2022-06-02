import React from "react";

const TeamCard = (props) => {
  return (
    <div className="col-md-4">
      <img className="team-member-img" src={props.src} />
      <div className="row">
        <div className="col-2 align-self-center">
          <a
            className="social-link"
            href={props.fbLink}
            style={{ margin: "0px 5px" }}
          >
            <i className="fa fa-facebook social-link-icon" />
            <div className="social-link-effect" />
          </a>
          <a
            className="social-link"
            href={props.twitterLink}
            style={{ margin: "0px 5px" }}
          >
            <i className="fa fa-twitter social-link-icon" />
            <div className="social-link-effect" />
          </a>
          <a
            className="social-link"
            href={props.instagramLink}
            style={{ margin: "0px 5px" }}
          >
            <i className="fa fa-instagram social-link-icon" />
            <div className="social-link-effect" />
          </a>
          <a
            className="social-link"
            href={props.githubLink}
            style={{ margin: "0px 5px" }}
          >
            <i className="fa fa-github social-link-icon" />
            <div className="social-link-effect" />
          </a>
        </div>
        <div className="col-10 align-self-center">
          <h3 className="team-member-name">{props.name}</h3>
          <p className="team-member-desc">{props.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
