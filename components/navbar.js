/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const router = useRouter();
  const route = router.pathname;
  const [selectedTab, setSelectedTab] = useState("How we can help");

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

  console.log("navbar");
  return (
    <>
      <nav className="bg-flagYellow h-[60px] font-extrabold flex flex-row items-center justify-between px-6 sticky inset-0 z-30">
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
          className={`flex flex-col space-y-6 w-full items-start p-6 drop-shadow-md bg-white z-20 absolute ease-in-out duration-500 ${
            isOpen ? "top-0 right-0" : "-top-[600px]"
          }`}
        >
          {navLinks?.map((link) => {
            return (
              <>
              {/* {isOpen ? */}
              <button
                key={link.tabText}
                tabIndex={isOpen ? 1 : -1}
                onClick={(e) => {
                  // e.preventDefault();
                  // setSelectedTab(link.tabText);
                  const route = "/help/" + link.tabSlug;
                  window.location.href = route;
                }}
              >
                <li
                  className={`cursor-pointer font-light ${
                    language === "ukrainian" ? "font-roboto" : "font-lato"
                  } ${`/help/${link.tabSlug}` === route ? "underline" : null}`}
                  key={link.tabSlug}
                >
                  {link.tabText}
                </li>
              </button>
              {/* : null } */}
              </>
            );
          })}
        </ul>
      </div>
      {isOpen ? (
        <div className="w-screen h-screen bg-black bg-opacity-60 absolute inset-0"></div>
      ) : null}
    </>
  );
};

export default Navbar;
