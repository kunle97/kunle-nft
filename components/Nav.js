import React from "react";

const Nav = (props) => {
  return (
    <nav
      className="navbar navbar-dark navbar-expand-md sticker"
      style={{ paddingTop: 30 }}
    >
      <div className="container">
        <a className="navbar-brand" style={{ fontSize: 24 }} href="#">
          PixelMon
        </a>
        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#" target="_top">
                Home{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#hot-drops">
                Hot Drops
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#team">
                Team{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#roadmap">
                Roadmap
              </a>
            </li>
            <li className="nav-item">
              {props.isAuthenticated
                ? props.logoutButton
                : props.connectWalletButton}
            </li>
          </ul>
        </div>
        {/* <button className="btn btn-primary ui-button" type="button">
        Connect Wallet
      </button> */}
      </div>
    </nav>
  );
};

export default Nav;
