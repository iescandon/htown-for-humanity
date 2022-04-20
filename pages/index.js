/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-sync-scripts */
import { createClient } from "contentful";
import ContactForm from "../components/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Chart from "../components/chart";

export const Home = ({ content }) => {
  const [pageContent, setPageContent] = useState(content[0].fields);
  const [instagramFeed, setInstagramFeed] = useState(null);
  console.log(pageContent);

  useEffect(() => {
    setPageContent(content[0].fields);
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
  }, [content]);

  return (
    <>
      <Head>
        <title>H Town for Humanity</title>
        <script
          src="https://donorbox.org/widget.js"
          paypalExpress="false"
        ></script>
      </Head>
      {/* nav section */}
      <nav className="md:hidden bg-flagYellow drop-shadow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center pl-6">
        {pageContent.paragraphTitle}
      </nav>
      {/* hero image section */}
      <section className="relative h-[200px] md:h-[400px] lg:h-[550px]">
        <div className="blueOverlay absolute w-full h-full flex flex-col top-0 justify-between">
          <div className="flex flex-row w-full justify-end">
            <img
              alt="htown for humanity logo"
              src={pageContent.logoPictureOnly.fields.file.url}
              className="mx-6 md:mx-12 lg:mx-24 mt-6 md:mt-12 h-[50px] md:h-[100px] lg:h-[150px] w-auto"
            />
          </div>
          <div className="title font-extrabold text-white leading-tight mx-6 md:mx-12 lg:mx-24 mb-6 md:mb-12">
            <span className="text-[1.5em] md:text-[3em] lg:text-[4em]">
              {pageContent.headerTitle}
            </span>
            <br></br>
            <span className="text-[1.5em] md:text-[3em] lg:text-[4em]">
              {pageContent.headerSubtitle}
            </span>
          </div>
        </div>
        <div className="absolute border-l-4 border-t-4 border-flagYellow md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px] md:top-8 md:left-8 lg:top-16 lg:left-16 hidden md:block"></div>
        <div className="absolute border-r-4 border-b-4 border-flagYellow md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[250px] md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 hidden md:block"></div>
        <div className="w-full h-full">
          <img
            alt="htown for humanity hero image"
            src={pageContent.heroImage.fields.file.url}
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* about/donate section */}
      <section className="md:pl-8 lg:pl-16 flex flex-col md:flex-row items-center justify-center md:bg-flagYellow w-full">
        <div className="px-6 py-8 md:p-0 md:bg-transparent flex flex-col w-full md:w-45percent lg:w-60percent">
          <h3 className="text-[12px] lg:text-lg uppercase hidden md:block">
            {pageContent.paragraphSubtitle}
          </h3>
          <h2 className="text-[2em] lg:text-[3em] font-extrabold text-black pb-8 leading-tight hidden md:block">
            {pageContent.paragraphTitle}
          </h2>
          {pageContent.paragraphText.content.map((paragraph) => {
            return (
              <p className="pb-4" key={paragraph.content[0].value}>
                {paragraph.content[0].value}
              </p>
            );
          })}
          <a href="/help" className="max-w-max">
            <span className="font-roboto underline cursor-pointer">
              {pageContent.ukrainianCta}
            </span>
          </a>
        </div>
        <div className="md:pt-6 flex flex-col w-full md:w-55percent lg:w-40percent h-full items-center justify-center md:bg-transparent">
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
      </section>
      {/* other donations section */}
      <section className="bg-white px-6 pt-0 pb-8 md:p-6 flex flex-row items-center justify-around w-full drop-shadow-md">
        <a href={pageContent.otherDonationUrls.googleSheetsUrl}>
          <div className="flex flex-row justify-center items-center w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer mx-2 my-4">
            <img
              className="h-[20px] md:h-[35px] lg:h-[50px]"
              src="/images/google-sheets.png"
              alt="google sheets icon"
            />
            <span className="ml-1 text-[10px] md:text-xs lg:text-base">
              Non-perishable food & other supplies
            </span>
          </div>
        </a>
        <a href={pageContent.otherDonationUrls.amazonUrl}>
          <img
            className="w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer mx-2 my-4"
            src="/images/amazon-wishlist.png"
            alt="amazon wishlist icon"
          />
        </a>
        <a href={pageContent.otherDonationUrls.targetUrl}>
          <img
            className="w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer mx-2 my-4"
            src="/images/target-registry.png"
            alt="target gift registry icon"
          />
        </a>
      </section>
      <div className="pt-6 md:py-8 lg:py-12 bg-[#f3f6fd]">
        {/* stats section */}
        <section className="p-6 md:p-8 lg:p-12 flex flex-col-reverse md:flex-row justify-center md:justify-around items-center">
          <div className="relative flex flex-col items-center">
            <div className="w-[200px] lg:w-[300px]">
              <Chart content={pageContent.moneyRaised} />
            </div>
            <div className="absolute top-[5rem] left-[4rem] lg:top-[7.3rem] lg:left-[6rem]">
              <p className="text-[2em] lg:text-[3em] font-extrabold leading-none">
                ${pageContent.moneyRaised.total}
              </p>
              <p className="text-xs lg:text-base pl-1 lg:pl-2">
                raised in total
              </p>
            </div>
            <div className="pl-1 pt-6 w-[200px]">
              <div className="flex flex-row items-center">
                <div className="h-4 w-4 bg-[#FF6384] mr-4"></div>
                Cash/Online Donations
              </div>
              <div className="flex flex-row items-center">
                <div className="h-4 w-4 bg-[#37A2EB] mr-4"></div>
                Gift Card Donations
              </div>
              <div className="flex flex-row items-center">
                <div className="h-4 w-4 bg-[#FFCD56] mr-4"></div>
                In Kind Donations
              </div>
            </div>
          </div>
          <div className="pb-12 md:pb-0 md:w-[400px] lg:w-[600px]">
            <p className="text-2xl text-[1.5em] md:text-[2em] lg:text-[3em] font-extrabold pb-1 md:pb-2 lg:pb-3">
              {pageContent.asideTitle}
            </p>
            {pageContent.asideText.content.map((paragraph) => {
              return (
                <p className="pb-1" key={paragraph.content[0].value}>
                  {paragraph.content[0].value}
                </p>
              );
            })}
          </div>
        </section>
        {/* insta feed */}
        <section className="py-6 md:py-8 lg:py-12 flex-col hidden md:flex relative">
          <div className="hidden md:flex flex-row md:h-[384px] lg:h-[720px] w-full min-h-min flex-wrap justify-center">
            {instagramFeed?.map((pic, i) => {
              return (
                <div key={`div-${pic.id}`} className="h-1/2 w-1/4 relative">
                  <img
                    className="h-full w-full object-cover"
                    key={pic.id}
                    src={pic.media_url}
                    alt="instagram photo"
                  />
                </div>
              );
            })}
          </div>
        </section>
        {/* insta carousel */}
        <section className="pt-6 md:hidden">
          <Carousel swipeable={true}>
            {instagramFeed?.map((pic) => {
              return (
                <div key={`div-${pic.id}`} className="">
                  <img
                    className="h-full w-full object-cover"
                    key={pic.id}
                    src={pic.media_url}
                    alt={pic.caption}
                  />
                </div>
              );
            })}
          </Carousel>
        </section>
        {/* contact form section */}
        <section className="px-6 pt-6 pb-12 md:p-8 lg:p-12 space-y-6 bg-white md:bg-[#f3f6fd] flex w-full flex-row">
          <div className="h-full w-full md:w-2/3 flex flex-row justify-center items-center md:mr-4 lg:mr-8">
            <ContactForm
              contactFormTitle={pageContent.contactFormTitle}
              contactFormDropdownOptions={
                pageContent.contactFormDropdownOptions
              }
            />
          </div>
          <div className="mask w-1/3 relative hidden md:block">
            <img
              className="w-full h-full object-cover"
              src={pageContent.contactAsideImage.fields.file.url}
              alt="image in shape of texas state"
            />
            <div className="blueOverlayLight absolute w-full h-full flex flex-col top-0 justify-between"></div>
          </div>
        </section>
      </div>
      {/* footer section */}
      <footer className="bg-black flex flex-col md:flex-row items-center px-6 py-6 justify-between">
        <div className="flex flex-col text-white text-xs font-light space-y-2 md:space-y-0 pb-6 md:pb-0">
          <p>
            H Town for humanity Inc is a Non-Profit Organization. EIN number
            88-1595598.
          </p>
          <p>
            Website created by{" "}
            <a href="https://inescandon.vercel.app/">
              <span className="underline cursor-pointer text-blue-200">
                Inez Escandon
              </span>
            </a>
          </p>
        </div>
        <div className="">
          <a href={pageContent.socialMediaInfo.facebookUrl}>
            <FontAwesomeIcon
              className="cursor-pointer text-2xl text-white p-2"
              icon={faFacebook}
            />
          </a>
          <a href={pageContent.socialMediaInfo.instagramUrl}>
            <FontAwesomeIcon
              className="cursor-pointer text-2xl text-white p-2"
              icon={faInstagram}
            />
          </a>
          <a href={pageContent.socialMediaInfo.linkedInUrl}>
            <FontAwesomeIcon
              className="cursor-pointer text-2xl text-white p-2"
              icon={faLinkedinIn}
            />
          </a>
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
