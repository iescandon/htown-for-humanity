/* eslint-disable @next/next/no-html-link-for-pages */
import { createClient } from "contentful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Toggle from "../components/toggle.js";
import Head from "next/head";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const Help = ({ content }) => {
  const [pageContent, setPageContent] = useState(content[0].fields);
  const [language, setLanguage] = useState("ukrainian");
  const [headerTitle, setHeaderTitle] = useState();
  // const [questions, setQuestions] = useState(null);
  // const [answers, setAnswers] = useState(null);
  const [FAQs, setFAQs] = useState(null);
  console.log(pageContent);

  useEffect(() => {
    setPageContent(content[0].fields)
    if (language === "ukrainian") {
      setHeaderTitle(pageContent.ukrainianHeaderTitle);
      // setQuestions(pageContent.ukrainianQuestions);
      // setAnswers(pageContent.ukrainianAnswers);
      setFAQs(pageContent.ukrainianFAQs)
    } else {
      setHeaderTitle(pageContent.englishHeaderTitle);
      // setQuestions(pageContent.englishQuestions);
      // setAnswers(pageContent.englishAnswers);
      setFAQs(pageContent.englishFAQs)
    }
  }, [content, language, headerTitle, FAQs]);

  return (
    <>
      <Head>
        <title>Help for Refugees | H Town for humanity </title>
        <meta name="description" content="If you are a refugee in need of assistance, please contact us so we can help you." />
        <meta name="keywords" content="refugees, asylum, houston, texas, h-town, h town, htown, for, humanity, htx, helps, donate, donations, ukraine, ukrainians, families, crisis" />
      </Head>
      <nav className="bg-flagYellow drop-shadow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center justify-between px-4">
        <a href="/" aria-label="back button">
          <FontAwesomeIcon
            className="text-2xl cursor-pointer p-2"
            icon={faArrowLeft}
          />
        </a>
        <div className="pr-2">
            <Toggle language={language} setLanguage={setLanguage} />
          </div>
      </nav>
      <div className="p-6 lg:p-12 flex flex-col">
        {/* <section className="flex flex-row justify-between items-center pb-12"> */}
        <section className="flex flex-row justify-center items-center pb-6 lg:pb-12">
          {/* <div className="hidden md:block w-[85px]"></div> */}
          <h2 className={`text-[1.5em] md:text-[2em] lg:text-[3em] ${language === 'ukrainian' ? 'font-roboto font-bold' : 'font-lato font-extrabold'}`}>
            {headerTitle}
          </h2>
          {/* <div>
            <Toggle language={language} setLanguage={setLanguage} />
          </div> */}
        </section>
        {/* <section className="md:mx-8 lg:mx-32">
          <Accordion allowMultiple>
            {questions?.map((q, i) => {
              return (
                <AccordionItem className="border" key={`item-${q}`}>
                  <h2>
                    <AccordionButton className="font-roboto md:hover:bg-[#f3f6fd]">
                    <div className="flex flex-row md:h-[40px] min-h-min p-3 md:p-6 w-full justify-between items-center">
                      <div className="text-left">
                        {q}
                      </div>
                      <AccordionIcon />
                      </div>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="font-roboto px-3 py-6 md:p-6 bg-[#f3f6fd]">
                    {answers ? <p>
                      {answers[i] ? answers[i] : null}
                    </p> : null
                    }
                  </AccordionPanel> 
                </AccordionItem>
              );
            })}
          </Accordion>
        </section> */}
        <section className="md:mx-8 lg:mx-32">
          <Accordion allowMultiple>
            {FAQs?.map((item, i) => {
              return (
                <AccordionItem className={`rounded border-t border-r border-l ${i + 1 === FAQs.length ? 'border-b' : ''}`} key={`faq-${i + 1}`}>
                  <h2>
                    <AccordionButton className="font-roboto md:hover:bg-[#f3f6fd]">
                    <div className="flex flex-row md:h-[40px] min-h-min p-3 md:p-6 w-full justify-between items-center">
                      <div className="text-left">
                        {item.question}
                      </div>
                      <AccordionIcon />
                      </div>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="font-roboto px-3 py-6 md:p-6 bg-[#f3f6fd]">
                    <div className="whitespace-pre-line">
                    {item.answer}
                    </div>
                  </AccordionPanel> 
                </AccordionItem>
              );
            })}
          </Accordion>
        </section>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const res = await client.getEntries({ content_type: "helpPageContent" });

  return {
    props: {
      content: res.items,
    },
    revalidate: 1
  };
}

export default Help;
