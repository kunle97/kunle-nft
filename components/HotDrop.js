import React from "react";

const HotDrop = (props) => {
  return (
    <div className="col-sm-6 col-md-5 col-lg-4 item">
      <div className="box">
        <img className="nft-img" src={props.src} />
        <h3 className="name hot-drop-title">{props.name}</h3>
      </div>
    </div>
  );
};

export default HotDrop;
