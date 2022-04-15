import { createClient } from "contentful";
import ContactForm from "../components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingDollar,
  faPeopleGroup,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [instagramFeed, setInstagramFeed] = useState(null);

  useEffect(() => {
    fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_API_ACCESS_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredArray = data?.data?.filter(
          (item) =>
            item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM"
        );
        const slicedArray = filteredArray?.slice(0, 8);
        setInstagramFeed(slicedArray);
      });
  }, []);

  // console.log(content);
  // console.log(instagramFeed);
  // console.log(process.env.INSTAGRAM_API_URL);
  return (
    <>
      <section className="relative">
        {/* hero image section */}
        <div className="relative h-[550px]">
          <div className="blueOverlay absolute w-full h-full flex flex-col top-0 justify-between">
            <div className="flex flex-row w-full justify-end">
              <img
                src={content[0].fields.logo.fields.file.url}
                className="mx-24 my-12 h-[150px] w-auto"
              />
            </div>
            <div className="title font-lato font-extrabold text-white leading-tight mx-24 my-12">
              <span className="text-[4em] pb-16">
                {content[0].fields.headerTitle}
              </span>
              <br></br>
              <span className="text-[4em] pb-16">
                {content[0].fields.headerSubtitle}
              </span>
            </div>
          </div>
          <div className="absolute border-l-4 border-flagYellow h-[250px] top-16 left-16"></div>
          <div className="absolute border-r-4 border-flagYellow h-[250px] bottom-16 right-16"></div>
          <div className="absolute border-t-4 border-flagYellow w-[250px] top-16 left-16"></div>
          <div className="absolute border-b-4 border-flagYellow w-[250px] bottom-16 right-16"></div>
          {/* <div className="absolute border-l-8 border-flagYellow h-[140px] bottom-14 left-16"></div> */}
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
            {content[0].fields.paragraphText.content.map((paragraph) => {
              // console.log(paragraph)
              return (
                <p className="pb-4" key={paragraph.content[0].value}>
                  {paragraph.content[0].value}
                </p>
              );
            })}
            <p className="font-roboto underline">
              Якщо ви біженець, який потребує допомоги, натисніть тут
            </p>
          </div>
          <div className="relative flex flex-col w-40percent h-full items-center justify-center">
            <div className="absolute w-[425px] h-[381] top-0 right-12">
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
      <section className="h-[350px] flex flex-row mt-10">
        <div className="w-1/3 flex flex-row justify-center items-center">
          <div className="card w-80percent h-80percent flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon
              className="text-5xl mb-6 bg-flagBlue text-white p-4 rounded-full"
              icon={faMoneyBill1Wave}
            />
            <p className="text-5xl font-lato font-extrabold">$300</p>
            <p className="uppercase text-light">raised in total</p>
          </div>
        </div>
        <div className="w-1/3 flex flex-row justify-center items-center">
          <div className="card w-80percent h-80percent flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon
              className="text-5xl mb-6 bg-flagBlue text-white p-4 rounded-full"
              icon={faPeopleGroup}
            />
            <p className="text-5xl font-lato font-extrabold">15</p>
            <p className="uppercase text-light">refugees helped</p>
          </div>
        </div>
        <div className="w-1/3 flex flex-row justify-center items-center">
          <div className="card w-80percent h-80percent flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon
              className="text-5xl mb-6 bg-flagBlue text-white p-4 rounded-full"
              icon={faHandHoldingDollar}
            />
            <p className="text-5xl font-lato font-extrabold">100%</p>
            <p className="uppercase text-light">of donations distributed</p>
          </div>
        </div>
      </section>
      {/* contact form section */}
      <section className="h-[500px] flex flex-row">
        <div className="mask w-1/3 relative">
          <img
            className="w-full h-full object-cover mx-4"
            src={content[0].fields.contactAsideImage.fields.file.url}
          />
          <div className="blueOverlayLight absolute w-full h-full flex flex-col top-0 justify-between"></div>
        </div>
        <div className="h-full w-2/3 flex flex-row justify-center items-center">
          <ContactForm contactFormTitle={content[0].fields.contactFormTitle} />
        </div>
      </section>
      {/* other donations accepted */}
      <section className="bg-gradient-to-b from-[#ECF4FA] to-white h-[400px] flex flex-col px-12">
        <h2 className="font-lato font-extrabold text-[3em] pb-4">
          We also accept
        </h2>
        <div className="flex flex-row justify-between px-2">
          <ul>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
          </ul>
          <ul>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
          </ul>
          <ul>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
          </ul>
          <ul>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
          </ul>
          <ul>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
          </ul>
          <ul>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
            <li className="uppercase">stuff</li>
          </ul>
        </div>
      </section>
      {/* social media */}
      <section className="bg-white flex flex-col px-12 pb-12 relative">
        {/* <div className="absolute bottom-10 right-16">
          <h2 className="font-lato font-extrabold text-[4em] text-white title">#htownforhumanity<span className="ml-2">🇺🇦</span></h2>
 
        </div> */}
        <div className="flex flex-row h-[600px] w-full min-h-min flex-wrap justify-center">
          {instagramFeed?.map((pic) => {
            // console.log(pic);
            return (
              <div key={`div-${pic.id}`} className="h-1/2 w-1/4">
                <img
                  className="h-full w-full object-cover"
                  key={pic.id}
                  src={pic.media_url}
                />
              </div>
            );
          })}
        </div>
      </section>
      <footer className="bg-black h-[80px] flex flex-row items-center p-6 justify-between">
        <div className="flex flex-col text-white text-xs font-light">
          <p>
            H Town for humanity is a 501(c)(3) not-for-profit organization. EIN
            number 13-5660870.
          </p>
          <p>Copyright H Town for humanity, 2022.</p>
        </div>
        <div className="text-[3.5em]">
          <FontAwesomeIcon
            className="text-3xl text-white rounded-full p-2"
            icon={faFacebook}
          />
          <FontAwesomeIcon
            className="text-3xl text-white rounded-full p-2"
            icon={faInstagram}
          />
          <FontAwesomeIcon
            className="text-3xl text-white rounded-full py-2 pl-2"
            icon={faTiktok}
          />
        </div>
      </footer>
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
