import Moralis from "moralis";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import Web3 from "web3";
import { contractAbi, contractAddress } from "../contract";
const web3 = new Web3(Web3.givenProvider);

const Landing = () => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    alert(
      "Your NFT is being minted. Once you accept the transaction in Metamask the trasaction may take a little while to go through."
    );

    //Custom params
    var fourDigitNumber = Math.floor(1000 + Math.random() * 9000).toString();
    var fullNFTName = `PixelMon #${fourDigitNumber}`;
    console.log("Name: ", fullNFTName);

    var fullNFTDescription = `Here is your brand new PixelMon! It's name is ${fullNFTName}. Say Hello!`;
    console.log("Name: ", fullNFTDescription);
    var NFTImageSVG = `https://avatars.dicebear.com/api/pixel-art/${fullNFTName}.svg`;

    try {
      //save image to ipfs
      //   const file1 = new Moralis.File(file.name, file);
      const file1 = new Moralis.File(file.name, file);
      await file1.saveIPFS();
      const file1url = file1.ipfs();

      //generate metadata for ipfs
      const metadata = { fullNFTName, fullNFTDescription, image: file1url };
      const file2 = new Moralis.File(`${name}metadata.json`, {
        base64: Buffer.from(JSON.stringify(metadata)).toString("base64"),
      });
      await file2.saveIPFS();
      const metadataurl = file2.ipfs();

      //interact with smart contracts
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      const response = await contract.methods
        .mint(metadataurl)
        .send({ from: user.get("ethAddress") });
      const tokenId = response.events.Transfer.returnValues.tokenId;
      alert(
        `Your NFT has been successfully minted. \nContract Address: ${contractAddress} \nToken ID: ${tokenId}`
      );
      console.log(
        `Your NFT has been successfully minted. \nContract Address: ${contractAddress} \nToken ID: ${tokenId}`
      );
    } catch (err) {
      console.error(err);
      alert("Somthing went wrong");
    }
  };

  const connectWalletButton = (
    <button
      style={{ width: "100%" }}
      onClick={authenticate}
      className="btn btn-primary ui-button"
      type="button"
    >
      Connect Wallet
    </button>
  );

  const logoutButton = (
    <button
      onClick={logout}
      className="btn btn-primary ui-button"
      type="button"
    >
      Logout
    </button>
  );
  const mintNowButton = (
    <form onSubmit={onSubmit}>
      <div className="mt-3">
        <input
          type="file"
          className="border-[1px] p-2 text-lg border-black w-full"
          placeholder="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button
        type="submit"
        style={{ width: "100%" }}
        className="btn btn-primary ui-button animate-pulse"
      >
        Mint Now!
      </button>
    </form>
  );

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div style={{ background: "rgb(0,0,0)" }}>
      <div id="home">
        <div className="header-blue">
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
                    {isAuthenticated ? logoutButton : connectWalletButton}
                  </li>
                </ul>
              </div>
              {/* <button className="btn btn-primary ui-button" type="button">
                Connect Wallet
              </button> */}
            </div>
          </nav>
          <div className="container hero">
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-6 offset-xl-1 align-self-center">
                <h1>
                  PixelMon is here.&nbsp; Turn any image you want into an NFT.
                  No Code Experiecnce required!
                </h1>
                <p>
                  Simply connect your wallet, select an image from your device
                  and click "Mint Now!". Simple as that! Making NFTs couldn't be
                  any easier!
                </p>
                <button
                  className="btn btn-primary header-button ui-button"
                  type="button"
                >
                  Learn More
                </button>
                <a className="header-link" href="#">
                  Join The Discord
                </a>
              </div>
              <div className="col-md-5 col-lg-5 offset-lg-1 offset-xl-0 d-none d-lg-block align-self-center">
                <img src="assets/img/pixelmon/pixelmon15.svg" />
                {isAuthenticated ? mintNowButton : connectWalletButton}

                <div className="iphone-mockup">
                  <div className="screen">
                    <img style={{ width: 261 }} src="assets/img/mob.jpg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features-boxed">
        <div className="container">
          <h1
            id="hot-drops"
            className="hot-drops-section-header"
            style={{ textAlign: "center" }}
          >
            Hot Drops
          </h1>
          <p className="sub-heading">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis
          </p>
          <div className="row justify-content-center features">
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="box">
                <img
                  className="nft-img"
                  src="assets/img/pixelmon/pixelmon13.svg"
                />
                <h3 className="name hot-drop-title">PixelMon - #3856</h3>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="box">
                <img
                  className="nft-img"
                  src="assets/img/pixelmon/pixelmon12.svg"
                />
                <h3 className="name hot-drop-title">PixelMon - #7172</h3>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="box">
                <img
                  className="nft-img"
                  src="assets/img/pixelmon/pixelmon10.svg"
                />
                <h3 className="name hot-drop-title">PixelMon - #6471</h3>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="box">
                <img
                  className="nft-img"
                  src="assets/img/pixelmon/pixelmon4.svg"
                />
                <h3 className="name hot-drop-title">PixelMon - #1581</h3>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="box">
                <img
                  className="nft-img"
                  src="assets/img/pixelmon/pixelmon7.svg"
                />
                <h3 className="name hot-drop-title">PixelMon - #8163</h3>
              </div>
            </div>
            <div className="col-sm-6 col-md-5 col-lg-4 item">
              <div className="box">
                <img
                  className="nft-img"
                  src="assets/img/pixelmon/pixelmon8.svg"
                />
                <h3 className="name hot-drop-title">PixelMon - #9712</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 className="text-center about-section-heading" id="about">
          About
        </h1>
        <p className="sub-heading">
          Morbi sollicitudin, justo vel lobortis egestas, erat sapien dapibus
          nisl, ut faucibus
        </p>
        <div className="row" style={{ marginTop: 57, marginBottom: 103 }}>
          <div className="col-md-6 align-self-center">
            <img
              className="about-section-img"
              src="assets/img/pixelmon/pixelmon2.svg"
            />
          </div>
          <div className="col-md-6 align-self-center">
            <h1>
              Morbi sollicitudin, justo vel lobortis egestas, erat sapien
              dapibus nisl.
            </h1>
            <p>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Morbi id quam turpis. Nam nulla
              ligula, ornare quis erat varius, placerat tempor nibh. Integer
              pellentesque pellentesque tortor, vel accumsan orci tristique vel.
              Vestibulum turpis nisi, bibendum eu sapien sit amet, iaculis
              aliquet lorem. Nulla nisl turpis, efficitur non lacus non, aliquet
              varius quam. Pellentesque blandit posuere dolor, sit amet
              facilisis velit malesuada ultricies. Aenean molestie in nisl sit
              amet luctus. Nulla rhoncus dignissim ante, quis ornare justo
              tincidunt et. Praesent et dui erat. Aenean ac nisi commodo,
              suscipit elit id, ornare felis. Vestibulum ac eleifend est.
              Vivamus hendrerit aliquam quam at sollicitudin. Nam id fringilla
              dui, nec consectetur libero. Nunc vestibulum, nisi luctus semper
              molestie, nulla lorem pulvinar ipsum, eget suscipit leo risus id
              purus.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <h1 id="team" className="team-section-heading">
          Team
        </h1>
        <p className="sub-heading">
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis
        </p>
        <div className="row" style={{ marginTop: 77 }}>
          <div className="col-md-4">
            <img
              className="team-member-img"
              src="assets/img/pixelmon/pixelmon19.svg"
            />
            <div className="row">
              <div className="col-2 align-self-center">
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-facebook social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-twitter social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-instagram social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-github social-link-icon" />
                  <div className="social-link-effect" />
                </a>
              </div>
              <div className="col-10 align-self-center\">
                <h3 className="team-member-name">Tom Rob</h3>
                <p className="team-member-desc">
                  Sed gravida vestibulum lacinia. Cras ac ex magna. Ut semper,
                  augue ac fermentum vehicula, libero est finibus arcu, sed
                  laoreet erat nulla ut quam. Mauris bibendum sapien vel
                  fermentum facilisis. Phasellus commodo auctor malesuada. Ut
                  sollicitudin, justo at tincidunt convallis, risus lorem
                  ullamcorper metus, ut faucibus ex lacus eu mauris. Duis
                  faucibus vel nibh vel consectetur.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img
              className="team-member-img"
              src="assets/img/pixelmon/pixelmon18.svg"
            />
            <div className="row">
              <div className="col-2 align-self-center">
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-facebook social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-twitter social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-instagram social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-github social-link-icon" />
                  <div className="social-link-effect" />
                </a>
              </div>
              <div className="col-10 align-self-center\">
                <h3 className="team-member-name">Raina Henry</h3>
                <p className="team-member-desc">
                  Sed gravida vestibulum lacinia. Cras ac ex magna. Ut semper,
                  augue ac fermentum vehicula, libero est finibus arcu, sed
                  laoreet erat nulla ut quam. Mauris bibendum sapien vel
                  fermentum facilisis. Phasellus commodo auctor malesuada. Ut
                  sollicitudin, justo at tincidunt convallis, risus lorem
                  ullamcorper metus, ut faucibus ex lacus eu mauris. Duis
                  faucibus vel nibh vel consectetur.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img
              className="team-member-img"
              src="assets/img/pixelmon/pixelmon5.svg"
            />
            <div className="row">
              <div className="col-2 align-self-center">
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-facebook social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-twitter social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-instagram social-link-icon" />
                  <div className="social-link-effect" />
                </a>
                <a
                  className="social-link"
                  href="#"
                  style={{ margin: "0px 5px" }}
                >
                  <i className="fa fa-github social-link-icon" />
                  <div className="social-link-effect" />
                </a>
              </div>
              <div className="col-10 align-self-center\">
                <h3 className="team-member-name">Jaime Seymor</h3>
                <p className="team-member-desc">
                  Sed gravida vestibulum lacinia. Cras ac ex magna. Ut semper,
                  augue ac fermentum vehicula, libero est finibus arcu, sed
                  laoreet erat nulla ut quam. Mauris bibendum sapien vel
                  fermentum facilisis. Phasellus commodo auctor malesuada. Ut
                  sollicitudin, justo at tincidunt convallis, risus lorem
                  ullamcorper metus, ut faucibus ex lacus eu mauris. Duis
                  faucibus vel nibh vel consectetur.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="section-timeline">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 id="roadmap" className="section-heading">
                Roadmap
              </h2>
              <h3 className="section-subheading text-muted">
                Lorem ipsum dolor sit amet consectetur.{" "}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-group timeline">
                <li className="list-group-item">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="assets/img/pixelmon/pixelmon12.svg"
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Phase 1</h4>
                      <h4 className="subheading">Our Humble Beginnings </h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!{" "}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item timeline-inverted">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="assets/img/pixelmon/pixelmon14.svg"
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Phase 2</h4>
                      <h4 className="subheading">An Agency is Born </h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!{" "}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="assets/img/pixelmon/pixelmon9.svg"
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Phase 3</h4>
                      <h4 className="subheading">Transition to Solana</h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!{" "}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item timeline-inverted">
                  <div className="timeline-image">
                    <img
                      className="rounded-circle img-fluid"
                      src="assets/img/pixelmon/pixelmon1.svg"
                    />
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Phase 4</h4>
                      <h4 className="subheading">Metaverse Expansion </h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                        temporibus qui quibusdam, recusandae sit vero unde, sed,
                        incidunt et ea quo dolore laudantium consectetur!{" "}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="list-group-item timeline-inverted">
                  <div className="timeline-image">
                    <h4>Be Part Of Our Story!</h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="text-white bg-dark"
        style={{ background: "rgba(0,0,0,0) !important" }}
      >
        <div className="container py-4 py-lg-5">
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
              <h3 className="fs-6 text-white">Services</h3>
              <ul className="list-unstyled">
                <li>
                  <a className="link-light" href="#">
                    Web design
                  </a>
                </li>
                <li>
                  <a className="link-light" href="#">
                    Development
                  </a>
                </li>
                <li>
                  <a className="link-light" href="#">
                    Hosting
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
              <h3 className="fs-6 text-white">About</h3>
              <ul className="list-unstyled">
                <li>
                  <a className="link-light" href="#">
                    Company
                  </a>
                </li>
                <li>
                  <a className="link-light" href="#">
                    Team
                  </a>
                </li>
                <li>
                  <a className="link-light" href="#">
                    Legacy
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column item">
              <h3 className="fs-6 text-white">Careers</h3>
              <ul className="list-unstyled">
                <li>
                  <a className="link-light" href="#">
                    Job openings
                  </a>
                </li>
                <li>
                  <a className="link-light" href="#">
                    Employee success
                  </a>
                </li>
                <li>
                  <a className="link-light" href="#">
                    Benefits
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last item social">
              <div className="fw-bold d-flex align-items-center mb-2">
                <span>
                  PixelMon
                  <br />
                </span>
              </div>
              <p className="text-muted copyright">
                Sem eleifend donec molestie, integer quisque orci aliquam.
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center pt-3">
            <p className="mb-0">Copyright © 2022 PixelMon</p>
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-facebook"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </li>
              <li className="list-inline-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-twitter"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </li>
              <li className="list-inline-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-instagram"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
