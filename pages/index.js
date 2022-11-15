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
import Head from "next/head";
import Script from "next/script";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Chart from "../components/chart";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const Home = ({ content }) => {
  const [pageContent, setPageContent] = useState(content[0].fields);
  const [instagramFeed, setInstagramFeed] = useState(null);

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
        <meta
          name="description"
          content="H Town for humanity is a non-profit organization helping refugees in Houston, Texas."
        />
        <meta
          name="keywords"
          content="refugees, asylum, houston, texas, h-town, h town, htown, for, humanity, htx, helps, donate, donations, ukraine, ukrainians, families, crisis"
        />
      </Head>
      {/* nav section */}
      <nav className="md:hidden bg-flagYellow drop-shadow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center px-4 md:px-6">
        {pageContent.paragraphTitle}
      </nav>
      {/* hero image section */}
      <section className="relative h-[200px] md:h-[400px] lg:h-[520px]">
        <div className="blueOverlay absolute w-full h-full flex flex-col top-0 justify-between">
          <div className="flex flex-row w-full justify-end">
            <img
              alt="htown for humanity logo"
              src={pageContent.logoPictureOnly.fields.file.url}
              className="mx-6 md:mx-12 lg:mx-24 mt-6 md:mt-12 h-[50px] md:h-[100px] lg:h-[150px] w-auto"
            />
          </div>
          <div className="title font-extrabold text-white leading-tight mx-6 md:mx-12 lg:mx-24 mb-6 md:mb-12">
            <span className="text-[1.5em] md:text-[2.5em] lg:text-[3.5em]">
              {pageContent.headerTitle}
            </span>
            <br></br>
            <span className="text-[1.5em] md:text-[2.5em] lg:text-[3.5em]">
              {pageContent.headerSubtitle}
            </span>
          </div>
        </div>
        <div className="absolute border-l-4 border-t-4 border-flagYellow md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[200px] md:top-8 md:left-8 lg:top-16 lg:left-16 hidden md:block"></div>
        <div className="absolute border-r-4 border-b-4 border-flagYellow md:w-[150px] md:h-[150px] lg:w-[250px] lg:h-[200px] md:bottom-8 md:right-8 lg:bottom-16 lg:right-16 hidden md:block"></div>
        <div className="w-full h-full">
          <img
            alt="htown for humanity hero image"
            src={pageContent.heroImage.fields.file.url}
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* about/donate section */}
      <section className="md:pl-8 lg:pl-16 md:bg-flagYellow">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[1800px] mx-auto">
          <div className="px-4 py-8 md:p-0 md:bg-transparent flex flex-col w-full md:w-45percent lg:w-60percent">
            <h3 className="text-[12px] lg:text-lg uppercase hidden md:block">
              {pageContent.paragraphSubtitle}
            </h3>
            <h2 className="text-[2em] lg:text-[2.5em] font-extrabold text-black pb-8 leading-tight hidden md:block">
              {pageContent.paragraphTitle}
            </h2>
            <div className="space-y-4 pb-4">
              {documentToReactComponents(pageContent.paragraphText)}
            </div>
            <a href="/help/faqs" className="max-w-max">
              <span className="font-roboto underline cursor-pointer hover:no-underline">
                {pageContent.ukrainianCta}
              </span>
            </a>
          </div>
          <div className="md:pt-6 flex flex-col w-full md:w-55percent lg:w-40percent h-full items-center justify-center md:bg-transparent">
            <iframe
              className="hidden md:block"
              title="donation form"
              src="https://donorbox.org/embed/h-town-for-humanity"
              name="donorbox"
              allowpaymentrequest="allowpaymentrequest"
              seamless="seamless"
              scrolling="no"
              height="500px"
              width="375px"
            ></iframe>
            <a
              tabIndex={-1}
              className="w-full text-center px-4 md:hidden"
              href="https://donorbox.org/h-town-for-humanity"
            >
              <button
                className="submitBtn bg-black text-white p-3 w-full rounded mb-5"
                // onKeyDown={(e) => {
                //   if (e.key === " " || e.key === "Enter") {
                //     console.log("clicked");
                //   }
                // }}
              >
                {/* <img className="inline mr-2" src="https://donorbox.org/images/red_logo.png" alt="" /> */}
                <span>Click here to donate today</span>
              </button>
            </a>
          </div>
        </div>
      </section>
      {/* other donations section */}
      <section className="bg-white px-4 pt-0 pb-8 md:p-6 drop-shadow-md">
        <div className="flex flex-row items-center justify-around w-full max-w-[1920px] mx-auto">
          <a href={pageContent.otherDonationUrls.googleSheetsUrl} aria-label="google sheet other acceptable donations list link">
            <div className="flex flex-row justify-center items-center w-[100px] md:w-[150px] lg:w-[200px] cursor-pointer mx-2 my-4">
              <img
                className="h-[20px] md:h-[30px] lg:h-[40px]"
                src="/images/google-sheets.png"
                alt="google sheets icon"
              />
              <span className="ml-1 text-[10px] md:text-xs lg:text-base">
                Non-perishable food & other supplies
              </span>
            </div>
          </a>
          <a href={pageContent.otherDonationUrls.amazonUrl} aria-label="amazon donation link">
            <img
              className="w-[90px] md:w-[125px] lg:w-[150px] cursor-pointer mx-2 my-4"
              src="/images/amazon-wishlist.png"
              alt="amazon wishlist icon"
            />
          </a>
          <a href={pageContent.otherDonationUrls.targetUrl} aria-label="target donation link">
            <img
              className="w-[90px] md:w-[125px] lg:w-[150px] cursor-pointer mx-2 my-4"
              src="/images/target-registry.png"
              alt="target gift registry icon"
            />
          </a>
        </div>
      </section>
      <div className="pt-6 md:py-8 lg:py-12 bg-[#f3f6fd]">
        {/* stats section */}
        <section className="px-4 py-6 md:p-8 lg:p-12 flex flex-col-reverse md:flex-row justify-center md:justify-around items-center max-w-[1600px] mx-auto">
          <div className="relative flex flex-col items-center">
            <div className="w-[200px] lg:w-[300px]">
              <Chart content={pageContent.moneyRaised} />
            </div>
            <div className="absolute top-[5rem] left-[3.9rem] lg:top-[7.7rem] lg:left-[6rem] flex flex-col items-center">
              <p className="text-[1.5em] lg:text-[2em] font-extrabold leading-none">
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
            <p className="text-2xl text-[1.5em] md:text-[2em] lg:text-[2.5em] font-extrabold pb-1 md:pb-2 lg:pb-3">
              {pageContent.asideTitle}
            </p>
            <div className="space-y-2">
              {documentToReactComponents(pageContent.asideText)}
            </div>
          </div>
        </section>
        {/* insta feed */}
        <section className="py-6 md:py-8 lg:py-12 flex-col hidden md:flex relative max-w-[1920px] mx-auto">
          <div className="hidden md:flex flex-row min-h-min w-full min-h-min flex-wrap justify-center">
            {instagramFeed?.map((pic, i) => {
              return (
                <div
                  key={`div-${pic.id}`}
                  className={`h-[25vw] w-1/4 relative`}
                >
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
                <div key={`div-${pic.id}`} className={`h-[100vw]`}>
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
        <section className="px-4 pt-6 pb-12 md:p-8 lg:p-12 space-y-6 bg-white md:bg-[#f3f6fd] flex w-full flex-row justify-around max-w-[1700px] mx-auto">
          {/* md:mr-4 lg:mr-8 */}
          <div className="h-full w-full md:w-2/3 flex flex-row justify-center items-center md:max-w-[500px] lg:max-w-[700px]">
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
      {/* media appearance section */}
      {/* <section className="h-[500px] bg-gradient-to-b from-[#f3f6fd] to-white hidden">
      </section> */}

      {/* footer section */}
      <footer className="px-4 md:px-8 lg:px-12 py-8 md:py-6 bg-black text-white ">
        {/* other contact/info section */}
        <div className="md:h-[160px] font-light text-sm flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
          <div className="flex flex-col">
            <h4 className="font-bold uppercase">Follow</h4>
            <div className="flex flex-row">
              <a
                href={pageContent.socialMediaInfo.facebookUrl}
                aria-label="facebook page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl py-2 pr-6 md:pr-3"
                  icon={faFacebook}
                />
              </a>
              <a
                href={pageContent.socialMediaInfo.instagramUrl}
                aria-label="instagram page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl py-2 pr-6 md:pr-3"
                  icon={faInstagram}
                />
              </a>
              <a
                href={pageContent.socialMediaInfo.linkedInUrl}
                aria-label="linked in page link"
              >
                <FontAwesomeIcon
                  className="cursor-pointer text-4xl md:text-2xl py-2 pr-6 md:pr-3"
                  icon={faLinkedinIn}
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold uppercase">About</h4>
            <a href="/about">About H Town for Humanity</a>
            <a href="/help/faqs">Help for Refugees</a>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold uppercase">Contact</h4>
            <a href="mailto:donations@htownforhumanity.org">
              donations@htownforhumanity.org
            </a>
            <a href="mailto:help@htownforhumanity.org">
              help@htownforhumanity.org
            </a>
            <a href="mailto:admin@htownforhumanity.org" className="mb-3">
              admin@htownforhumanity.org
            </a>
            <a href="tel:8326302396">832-630-2396</a>
          </div>
          <div className="flex flex-col space-y-2 h-full pb-8 md:pb-0">
            <h4 className="font-bold uppercase">Donate</h4>
            <a href="https://paypal.me/htownforhumanity" aria-label="paypal donation link">
              <div className="h-[35px] w-[170px] lg:w-[200px] bg-[#FEC238] rounded shadow-md flex flex-row justify-center items-center">
                <img className="h-[30px]" src="/images/paypal.png" />
              </div>
            </a>
            <a href="https://venmo.com/code?user_id=3530905607996736831" aria-label="venmo donation link">
              <div className="h-[35px] w-[170px] lg:w-[200px] bg-[#028DFF] rounded shadow-md flex flex-row justify-center items-center">
                <img className="h-[20px]" src="/images/venmo.png" />
              </div>
            </a>
            <a href="https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiSCBUT1dOIEZPUiBIVU1BTklUWSBJTkMiLCJhY3Rpb24iOiJwYXltZW50IiwidG9rZW4iOiI4MzI2MzAyMzk2In0=" aria-label="zelle donation link" className="hover:no-underline">
              <div className="h-[80px] w-[170px] lg:w-[200px] bg-[#6C1CD3] rounded shadow-md flex flex-col justify-center items-center">
                <img className="h-[25px]" src="/images/zelle.png" />
                <div className="pt-2">
                <p className="uppercase text-[10px] font-bold leading-tight text-[#5CDAB6]">Send payment to:</p>
                <p className="text-[10px] font-semibold">donations@htownforhumanity.org</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        {/* ein copyright section */}
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col text-sm font-light">
            <p>
              H Town for humanity Inc is a Non-Profit Organization. EIN number
              88-1595598.
            </p>
            <p>
              Website created by{" "}
              <a href="https://inescandon.vercel.app/">
                <span className="underline cursor-pointer text-blue-200 hover:text-white">
                  Inez Escandon
                </span>
              </a>
            </p>
          </div>
        </div>
      </footer>
      <Script
        src="https://donorbox.org/widget.js"
        paypalExpress="false"
      ></Script>
      <style jsx>{`
        // button {
        //   padding: 20px;
        //   background: #eee;
        //   color: #999
        // }
      `}</style>
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
    revalidate: 1,
  };
}

export default Home;
