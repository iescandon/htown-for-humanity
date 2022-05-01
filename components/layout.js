/* eslint-disable @next/next/no-html-link-for-pages */
import { createClient } from "contentful";
import Toggle from "./toggle.js";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./navbar.js";

export const Layout = ({ img, alt, headerTitle, children }) => {
  const [language, setLanguage] = useState("ukrainian");


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
      <section className="sticky inset-0 z-10">
      <Navbar />
      </section>
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
