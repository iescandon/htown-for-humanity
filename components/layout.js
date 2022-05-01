/* eslint-disable @next/next/no-html-link-for-pages */
import { createClient } from "contentful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Toggle from "./toggle.js";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Layout = ({ img, alt, headerTitle, children }) => {
  const router = useRouter();
  const route = router.pathname;

  const englishNav = [
    {
      tabText: "How we can help",
      tabSlug: "how-we-can-help",
    },
    {
      tabText: "Housing",
      tabSlug: "housing",
    },
    {
      tabText: "Learn English",
      tabSlug: "learn-english",
    },
    {
      tabText: "Job Support",
      tabSlug: "job-support",
    },
    {
      tabText: "Immigration Law",
      tabSlug: "immigration-law",
    },
    {
      tabText: "FAQs",
      tabSlug: "faqs",
    },
    {
      tabText: "Resources",
      tabSlug: "resources",
    },
  ];
  const [language, setLanguage] = useState("ukrainian");
  const [navLinks, setNavLinks] = useState(englishNav);
  const [selectedTab, setSelectedTab] = useState("How we can help");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // console.log(language)
    setNavLinks(englishNav);

    // if (language === "ukrainian") {
    //   setHeaderTitle(pageContent.ukrainianHeaderTitle);
    //   setFAQs(pageContent.ukrainianFAQs)
    // } else {
    //   setHeaderTitle(pageContent.englishHeaderTitle);
    //   setFAQs(pageContent.englishFAQs)
    // }
  }, [language, selectedTab]);

  return (
    <>
      <Head>
        <title>Help for Refugees | H Town for humanity </title>
        <meta
          name="description"
          content="If you are a refugee in need of assistance, please contact us so we can help you."
        />
        <meta
          name="keywords"
          content="refugees, asylum, houston, texas, h-town, h town, htown, for, humanity, htx, helps, donate, donations, ukraine, ukrainians, families, crisis"
        />
      </Head>
      {/* navbar sections */}
      <nav className="bg-flagYellow h-[60px] font-extrabold sticky inset-0 flex flex-row items-center justify-between px-4 z-30">
        <a href="/" aria-label="back button">
          <h2>#htownforhumanity</h2>
        </a>
        {/* <div className="">
          <Toggle language={language} setLanguage={setLanguage} />
        </div> */}
                <button
          className=""
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <FontAwesomeIcon className="cursor-pointer" icon={faXmark} />
          ) : (
            <FontAwesomeIcon className="cursor-pointer" icon={faBars} />
          )}
        </button>
      </nav>
      <div className="relative">
        <ul
          className={`flex flex-col space-y-6 w-full items-start p-6 drop-shadow-md bg-white z-10 absolute ease-in-out duration-500 ${
            isOpen ? "top-0 right-0" : "-top-96"
          }`}
        >
                  {/* <ul
          className={`flex flex-col space-y-6 lg:space-y-0 lg:flex-row w-full items-start lg:justify-around px-6 py-3 drop-shadow-md bg-white z-10 absolute ease-in-out duration-500 lg:relative lg:transition-none ${
            isOpen ? "top-0 right-0" : "-top-96 lg:top-0 right-0"
          }`}
        > */}
          {navLinks?.map((link) => {
            return (
              <button
                key={link.tabText}
                onClick={(e) => {
                  // e.preventDefault();
                  // setSelectedTab(link.tabText);
                  const route = "/help/" + link.tabSlug;
                  window.location.href = route;
                }}
              >
                <li
                  className={`cursor-pointer ${
                    language === "ukrainian" ? "font-roboto" : "font-lato"
                  } ${`/help/${link.tabSlug}` === route ? "underline" : null}`}
                  key={link.tabSlug}
                >
                  {link.tabText}
                </li>
              </button>
            );
          })}
        </ul>
      </div>
      {/* hero image */}
      <section className="h-[200px] md:h-[300px] lg:h-[400px] w-full relative">
        <div className="h-full w-full absolute blackOverlay flex flex-col justify-center items-center">
          <h2
            className={`text-[1.5em] md:text-[2em] lg:text-[3em] text-white title ${
              language === "ukrainian"
                ? "font-roboto font-bold"
                : "font-lato font-extrabold"
            }`}
          >
            {headerTitle}
          </h2>
        </div>
        <img className="h-full w-full object-cover" src={img} />
      </section>
      <div className="p-6 lg:p-12 flex flex-col bg-white">
        <section
          className={`md:mx-8 lg:mx-32 ${
            language === "ukrainian" ? "font-roboto" : "font-lato"
          }`}
        >
          {children}
        </section>
      </div>
    </>
  );
};

export default Layout;
