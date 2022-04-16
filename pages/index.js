/* eslint-disable @next/next/no-sync-scripts */
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
import Link from "next/link";
import Head from "next/head";

export const Home = ({ content }) => {
  const [pageContent, setPageContent] = useState(content[0].fields);
  const [instagramFeed, setInstagramFeed] = useState(null);
  console.log(pageContent);

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

  return (
    <>
      <Head>
        {/* <script
          type="text/javascript"
          defer
          src="https://donorbox.org/install-popup-button.js"
        ></script>
        <script type="text/javascript" src="/js/popup.js"></script> */}
        <script
          src="https://donorbox.org/widget.js"
          paypalExpress="false"
        ></script>
      </Head>
      <div className="md:hidden bg-flagYellow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center pl-6">
        htownforhumanity.org
      </div>
      <section className="relative">
        {/* hero image section */}
        <div className="relative h-[200px] md:h-[400px] lg:h-[550px]">
          <div className="blueOverlay absolute w-full h-full flex flex-col top-0 justify-between">
            <div className="flex flex-row w-full justify-end">
              <img
                src={pageContent.logoPictureOnly.fields.file.url}
                className="mx-6 md:mx-20 lg:mx-24 mt-6 md:mt-12 h-[50px] md:h-[100px] lg:h-[150px] w-auto"
              />
            </div>
            <div className="title font-extrabold text-white leading-tight mx-6 md:mx-20 lg:mx-24 mb-6 md:mb-12">
              <span className="text-[1.5em] md:text-[3em] lg:text-[4em]">
                {pageContent.headerTitle}
              </span>
              <br></br>
              <span className="text-[1.5em] md:text-[3em] lg:text-[4em]">
                {pageContent.headerSubtitle}
              </span>
            </div>
          </div>
          <div className="absolute border-l-4 border-t-4 border-flagYellow md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px] md:top-14 md:left-14 lg:top-16 lg:left-16 hidden md:block"></div>
          <div className="absolute border-r-4 border-b-4 border-flagYellow md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px] md:bottom-14 md:right-14  lg:bottom-16 lg:right-16 hidden md:block"></div>
          <div className="w-full h-full">
            <img
              src={pageContent.heroImage.fields.file.url}
              alt="hero image"
              className="w-full h-full object-cover"
            ></img>
          </div>
        </div>
      </section>
      {/* about/donate section */}
      <section>
        <div className="flex flex-col md:flex-row w-screen h-[800px] md:h-[550px] py-12 lg:pl-24 bg-white md:bg-flagYellow items-center justify-center">
          <div className="flex flex-col px-8 md:pl-10 md:pr-0 lg:px-16 lg:px-0 w-full md:w-45percent lg:w-60percent">
            <h3 className="text-[12px] lg:text-lg uppercase hidden md:block">
              {pageContent.paragraphSubtitle}
            </h3>
            <h2 className="softTitle text-[2em] lg:text-[3em] font-extrabold text-white pb-8 leading-tight hidden md:block">
              {pageContent.paragraphTitle}
            </h2>
            {pageContent.paragraphText.content.map((paragraph) => {
              return (
                <p className="pb-4" key={paragraph.content[0].value}>
                  {paragraph.content[0].value}
                </p>
              );
            })}
            <Link href="/help">
              <span className="font-roboto underline cursor-pointer max-w-max">
                {pageContent.ukrainianCta}
              </span>
            </Link>
          </div>
          <div className="flex flex-col w-full md:w-55percent lg:w-40percent h-full items-center justify-center">
            <iframe
            className=""
              src="https://donorbox.org/embed/h-town-for-humanity"
              name="donorbox"
              allowpaymentrequest="allowpaymentrequest"
              seamless="seamless"
              scrolling="no"
              height="500px"
              width="375px"
            ></iframe>
          </div>
        </div>
      </section>
      {/* stats section */}
      <section className="h-[350px] flex flex-col md:flex-row justify-center items-center mt-10">
        <div className="w-full md:w-1/3 flex flex-row justify-center items-center">
        <div className="card w-60percent md:w-80percent md:h-80percent flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8 mb-4 md:mb-0">
            <FontAwesomeIcon
              className="text-2xl md:text-4xl lg:text-5xl mb-4 lg:mb-6 bg-flagBlue text-white p-3 md:p-4 rounded-full"
              icon={faMoneyBill1Wave}
            />
            <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold">
              ${pageContent.numberOfDollarsDonated}
            </p>
            <p className="uppercase text-light text-xs md:text-base">raised in total</p>
          </div>
        </div>
        <div className="w-full md:w-1/3  flex flex-row justify-center items-center">
          <div className="card w-60percent md:w-80percent md:h-80percent flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8 mb-4 md:mb-0">
            <FontAwesomeIcon
                  className="text-2xl md:text-4xl lg:text-5xl mb-4 lg:mb-6 bg-flagBlue text-white p-3 md:p-4 rounded-full"
              icon={faPeopleGroup}
            />
               <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold">
              {pageContent.numberOfRefugeesHelped}
            </p>
            <p className="uppercase text-light text-xs md:text-base">refugees helped</p>
          </div>
        </div>
        <div className="w-full md:w-1/3  flex flex-row justify-center items-center">
        <div className="card w-60percent md:w-80percent md:h-80percent flex flex-col justify-center items-center text-center p-4 md:p-6 lg:p-8 mb-4 md:mb-0">
            <FontAwesomeIcon
                   className="text-2xl md:text-4xl lg:text-5xl mb-4 lg:mb-6 bg-flagBlue text-white p-3 md:p-4 rounded-full"
              icon={faHandHoldingDollar}
            />
            <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold">100%</p>
            <p className="uppercase text-light text-xs md:text-base">of donations distributed</p>
          </div>
        </div>
      </section>
      {/* contact form section */}
      <section className="h-[500px] min-h-min w-full flex flex-row">
        <div className="mask w-1/3 relative hidden md:block">
          <img
            className="w-full h-full object-cover mx-4"
            src={pageContent.contactAsideImage.fields.file.url}
          />
          <div className="blueOverlayLight absolute w-full h-full flex flex-col top-0 justify-between"></div>
        </div>
        <div className="h-full w-full md:w-2/3 flex flex-row justify-center items-center">
          <ContactForm
            contactFormTitle={pageContent.contactFormTitle}
            contactFormDropdownOptions={pageContent.contactFormDropdownOptions}
          />
        </div>
      </section>
      {/* other donations section */}
      <section className="bg-gradient-to-b from-[#ECF4FA] to-white flex flex-row px-8 lg:px-12 pb-16 items-center justify-around">
        <Link href={pageContent.otherDonationUrls.otherDonationsSpreadsheetUrl}>
          <div className="flex flex-row justify-center items-center w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer">
            <img className="h-[20px] md:h-[35px] lg:h-[50px]" src="/images/google-sheets.png" />
            <span className="ml-1 font-roboto text-[10px] md:text-xs lg:text-base">
              Non-perishable food & other supplies
            </span>
          </div>
        </Link>
        <Link href={pageContent.otherDonationUrls.amazonWishlistUrl}>
          <img
            className="w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer p-4"
            src="/images/amazon-wishlist.png"
          />
        </Link>
        <Link href={pageContent.otherDonationUrls.targetGiftRegistryUrl}>
          <img
            className="w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer p-4"
            src="/images/target-registry.png"
          />
        </Link>
      </section>
      {/* insta feed */}
      <section className="bg-white flex flex-col px-12 pb-12 hidden md:flex relative">
        <div className="bottom-12 right-16 z-10 absolute">
          <h2 className=" font-extrabold text-[2em] lg:text-[3em] text-white">
            {pageContent.instagramHashtagText}
          </h2>
        </div>
        <div className="hidden md:flex flex-row md:h-[350px] lg:h-[600px] w-full min-h-min flex-wrap justify-center">
          {instagramFeed?.map((pic, i) => {
            return (
              <div key={`div-${pic.id}`} className="h-1/2 w-1/4 relative">
                <img
                  className="h-full w-full object-cover"
                  key={pic.id}
                  src={pic.media_url}
                />
                {i > 3 ? (
                  <div className="absolute h-full w-full inset-0 blackOverlay z-1"></div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
      {/* insta carousel */}
      <section className="bg-white flex flex-col px-12 pb-12 md:hidden">
          <p>add carousel here</p>
      </section>
      <footer className="bg-black h-[160px] md:h-[80px] flex flex-col md:flex-row items-center p-6 justify-between">
        <div className="flex flex-col text-white text-xs font-light">
          <p>
            H Town for humanity Inc is a 501(c)(3) not-for-profit organization.
            EIN number 88-1595598.
          </p>
          <p>Copyright H Town for humanity Inc, 2022.</p>
        </div>
        <div className="md:text-[3em]">
          <Link href={pageContent.socialMediaInfo.facebookUrl}>
            <FontAwesomeIcon
              className="cursor-pointer text-3xl text-white rounded-full p-2"
              icon={faFacebook}
            />
          </Link>
          <Link href={pageContent.socialMediaInfo.instagramUrl}>
            <FontAwesomeIcon
              className="cursor-pointer text-3xl text-white rounded-full p-2"
              icon={faInstagram}
            />
          </Link>
          <Link href={pageContent.socialMediaInfo.tikTokUrl}>
            <FontAwesomeIcon
              className="cursor-pointer text-3xl text-white rounded-full py-2 pl-2"
              icon={faTiktok}
            />
          </Link>
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
