import { createClient } from "contentful";
import ContactForm from "../components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingDollar,
  faHouseChimney,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";

export const Home = ({ content }) => {
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = "https://donorbox.org/widget.js";
  //   // script.paypalExpress = "false";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);
  console.log(content);
  return (
    <>
      <section className="relative">
        {/* hero image section */}
        <div className="relative h-[550px]">
          <div className="blueOverlay absolute w-full h-full flex flex-col justify-between">
            <div className="flex flex-row w-full justify-end">
              <img
                src={content[0].fields.logo.fields.file.url}
                className="mx-24 my-12 h-[150px] w-auto"
              />
            </div>
            <div className="title font-lato font-extrabold text-white mx-24 my-12 leading-tight">
              <span className="text-[4em] pb-16">
                {content[0].fields.headerTitle}
              </span>
              <br></br>
              <span className="text-[4em] pb-16">
                {content[0].fields.headerSubtitle}
              </span>
            </div>
          </div>
          <div className="w-full h-full">
            <img
              src={content[0].fields.heroImage.fields.file.url}
              alt="hero image"
              className="w-full h-full object-cover"
            ></img>
          </div>
        </div>
      </section>
      {/* about/donate section */}
      <section>
        <div className="flex flex-row w-screen h-[550px] min-h-[550px] py-12 pl-24 bg-flagYellow items-center justify-center">
          <div className="flex flex-col w-60percent pr-12">
            <h3 className="text-[1.25em] font-lato uppercase">
              {content[0].fields.paragraphSubtitle}
            </h3>
            <h1 className="text-[3em] font-lato font-extrabold text-white pb-8 leading-tight">
              {content[0].fields.paragraphTitle}
            </h1>
            <p className="">
              {content[0].fields.paragraphText.content[0].content[0].value}
            </p>
            {/* {content[0].fields.paragraphText.content.map((paragraph) => {
              <p>{paragraph.content[0].value}</p>;
              console.log(paragraph.content[0].value);
            })} */}
          </div>
          <div className="relative flex flex-col w-40percent h-full items-center justify-center">
            <div className="absolute w-[423px] h-[381] top-0 right-12">
              <iframe
                src="https://donorbox.org/embed/h-town-for-humanity"
                name="donorbox"
                allowpaymentrequest="allowpaymentrequest"
                seamless="seamless"
                scrolling="no"
                height="900px"
                width="100%"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* stats section */}
      <section className="h-[350px] flex flex-row">
        <div className="w-1/3 flex flex-row justify-center items-center">
          <div className="card w-80percent h-80percent flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon
              className="text-5xl mb-6 bg-flagBlue text-white p-4 rounded-full"
              icon={faMoneyBill1Wave}
            />
            <p className="text-5xl font-lato font-semibold">$300</p>
            <p>raised since April 12, 2022</p>
          </div>
        </div>
        <div className="w-1/3 flex flex-row items-center">
          <div className="card w-80percent h-80percent flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon
              className="text-5xl mb-6 bg-flagBlue text-white p-4 rounded-full"
              icon={faHouseChimney}
            />
            <p className="text-5xl font-lato font-semibold">15</p>
            <p>families placed in homes</p>
          </div>
        </div>
        <div className="w-1/3 flex flex-row items-center">
          <div className="card w-80percent h-80percent flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon
              className="text-5xl mb-6 bg-flagBlue text-white p-4 rounded-full"
              icon={faHandHoldingDollar}
            />
            <p className="text-5xl font-lato font-semibold">100%</p>
            <p>of donations given to refugees in need</p>
          </div>
        </div>
      </section>
      {/* contact form section */}
      <section className="h-[500px] flex flex-row mb-8">
        <div className="mask w-1/3">
          <img
            className="h-full w-full object-cover mx-4"
            // className="h-full w-full object-cover mx-4 w-1/3"
            src={content[0].fields.contactAsideImage.fields.file.url}
          />
        </div>
        <div className="h-full w-2/3 flex flex-row justify-center items-center">
          {/* <div className="card bg-white m-8 w-full h-90percent"> */}
          <ContactForm contactFormTitle={content[0].fields.contactFormTitle} />
          {/* </div> */}
        </div>
      </section>
      {/* extra section/social media/contact/alexa? */}
      <section className="bg-gradient-to-b from-[#ECF4FA] to-white h-[550px] flex flex-row justify-center items-center">
        {/* <div className="card w-90percent h-90percent"> */}
          <h1>extra section</h1>
        {/* </div> */}
      </section>
      {/* footer */}
      <footer className="bg-white h-[100px]"></footer>
    </>
  );
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const res = await client.getEntries({ content_type: "pageContent" });
  return {
    props: {
      content: res.items,
    },
  };
}

export default Home;

{
  /* <section className="bg-gradient-to-b from-flagBlue to-black h-[450px]"> */
}
