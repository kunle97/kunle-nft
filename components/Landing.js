import Moralis from "moralis";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import Web3 from "web3";
import { contractAbi, contractAddress } from "../contract";
import Footer from "./Footer";
import HotDrop from "./HotDrop";
import Nav from "./Nav";
import TeamCard from "./TeamCard";
import Timeline from "./Timeline/Timeline";
import TimelineSegment from "./Timeline/TimelineSegment";
const web3 = new Web3(Web3.givenProvider);

const Landing = () => {
  const { authenticate, isAuthenticated, logout, user } = useMoralis();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [image, setImage] = useState("assets/img/pixelmon/pixelmon15.svg");

  const onImageChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    alert(
      "Your NFT is being minted. Once you accept the transaction in Metamask the trasaction may take a few minutes to go through."
    );

    try {
      //Custom params
      var fourDigitNumber = Math.floor(1000 + Math.random() * 9000).toString();
      var fullNFTName = `PixelMon#${fourDigitNumber}`;
      console.log("Name: ", fullNFTName);
      // setName(fullNFTName);
      var fullNFTDescription = `Here is your brand new PixelMon! It's name is ${fullNFTName}. Say Hello!`;
      // setDescription(fullNFTDescription);
      console.log("Desc: ", fullNFTDescription);
      var NFTImageSVG = `https://avatars.dicebear.com/api/pixel-art/${fullNFTName}.svg`;

      //save image to ipfs
      const file1 = new Moralis.File(file.name, file);
      // const file1 = new Moralis.File(file.name, file);
      await file1.saveIPFS();
      const file1url = file1.ipfs();

      //generate metadata for ipfs
      const metadata = { name, description, image: file1url };
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
        `Your NFT has been successfully minted. \nContract Address: ${contractAddress} \nToken ID: ${tokenId} \nNFT Name: ${fullNFTName} \nNFT Description ${fullNFTDescription}`
      );
      console.log(
        `Your NFT has been successfully minted. \nContract Address: ${contractAddress} \nToken ID: ${tokenId} \nNFT Name: ${fullNFTName} \nNFT Description ${fullNFTDescription}`
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
          type="text"
          className="border-[1px] p-2 text-lg border-black w-full form-control"
          placeholder="NFT Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <input
          type="text"
          className="border-[1px] p-2 text-lg border-black w-full form-control"
          placeholder="NFT Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <input
          type="file"
          className="border-[1px] p-2 text-lg border-black w-full"
          placeholder="file"
          accept="image/*"
          onChange={onImageChange}
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
          <Nav
            isAuthenticated={isAuthenticated}
            logoutButton={logoutButton}
            connectWalletButton={connectWalletButton}
          />
          <div className="container hero">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 offset-xl-1 align-self-center">
                <h1>
                  PixelMon is here.&nbsp; Turn any image you want into an NFT.
                  No code required!
                </h1>
                <p>
                  Simply connect your wallet, select an image from your device,
                  give it a name and description and click &quot;Mint
                  Now!&quot;. Simple as that! Making NFTs couldn&apos;t be any
                  easier!
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
              <div className="col-sm-12 col-md-6 col-lg-6 offset-lg-1 offset-xl-0  d-lg-block align-self-center">
                <img src={image} width="100%" />

                {isAuthenticated ? mintNowButton : connectWalletButton}
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
            <HotDrop
              src="assets/img/pixelmon/pixelmon13.svg"
              name="PixelMon - #3856"
            />
            <HotDrop
              src="assets/img/pixelmon/pixelmon12.svg"
              name="PixelMon - #7172"
            />
            <HotDrop
              src="assets/img/pixelmon/pixelmon10.svg"
              name="PixelMon - #6471"
            />
            <HotDrop
              src="assets/img/pixelmon/pixelmon4.svg"
              name="PixelMon - #1581"
            />
            <HotDrop
              src="assets/img/pixelmon/pixelmon7.svg"
              name="PixelMon - #8163"
            />
            <HotDrop
              src="assets/img/pixelmon/pixelmon8.svg"
              name="PixelMon - #9712"
            />
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
          <TeamCard
            src="assets/img/pixelmon/pixelmon19.svg"
            name="Tom Rob"
            desc="Sed gravida vestibulum lacinia. Cras ac ex magna. Ut semper, augue
            ac fermentum vehicula, libero est finibus arcu, sed laoreet erat
            nulla ut quam. Mauris bibendum sapien vel fermentum facilisis.
            Phasellus commodo auctor malesuada. Ut sollicitudin, justo at
            tincidunt convallis, risus lorem ullamcorper metus, ut faucibus ex
            lacus eu mauris. Duis faucibus vel nibh vel consectetur."
            fbLink="#"
            twitterLink="#"
            instagramLink="#"
            githubLink="#"
          />
          <TeamCard
            src="assets/img/pixelmon/pixelmon18.svg"
            name="Raina Henry"
            desc="Sed gravida vestibulum lacinia. Cras ac ex magna. Ut semper, augue
            ac fermentum vehicula, libero est finibus arcu, sed laoreet erat
            nulla ut quam. Mauris bibendum sapien vel fermentum facilisis.
            Phasellus commodo auctor malesuada. Ut sollicitudin, justo at
            tincidunt convallis, risus lorem ullamcorper metus, ut faucibus ex
            lacus eu mauris. Duis faucibus vel nibh vel consectetur."
            fbLink="#"
            twitterLink="#"
            instagramLink="#"
            githubLink="#"
          />
          <TeamCard
            src="assets/img/pixelmon/pixelmon5.svg"
            name="Jaime Seymor"
            desc="Sed gravida vestibulum lacinia. Cras ac ex magna. Ut semper, augue
            ac fermentum vehicula, libero est finibus arcu, sed laoreet erat
            nulla ut quam. Mauris bibendum sapien vel fermentum facilisis.
            Phasellus commodo auctor malesuada. Ut sollicitudin, justo at
            tincidunt convallis, risus lorem ullamcorper metus, ut faucibus ex
            lacus eu mauris. Duis faucibus vel nibh vel consectetur."
            fbLink="#"
            twitterLink="#"
            instagramLink="#"
            githubLink="#"
          />
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
          <Timeline />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
