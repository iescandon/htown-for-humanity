import { createClient } from "contentful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Toggle from "../components/toggle.js";
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
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    setPageContent(content[0].fields)
    if (language === "ukrainian") {
      setHeaderTitle(pageContent.ukrainianHeaderTitle);
      setQuestions(pageContent.ukrainianQuestions);
      setAnswers(pageContent.ukrainianAnswers);
    } else {
      setHeaderTitle(pageContent.russianHeaderTitle);
      setQuestions(pageContent.russianQuestions);
      setAnswers(pageContent.russianAnswers);
    }  
  }, [content, language, headerTitle, questions, answers]);

  return (
    <>
      <nav className="bg-flagYellow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center justify-between pl-6">
        <Link href="/">
          <FontAwesomeIcon
            className="text-3xl cursor-pointer"
            icon={faArrowLeft}
          />
        </Link>
        <img />
      </nav>
      <div className="p-8 lg:p-12 flex flex-col">
        <section className="flex flex-row justify-between items-center pb-12">
          <div className="hidden md:block w-[85px]"></div>
          <h2 className="text-[2em] lg:text-[3em] font-bold font-roboto">
            {headerTitle}
          </h2>
          <div>
            <Toggle language={language} setLanguage={setLanguage} />
          </div>
        </section>
        <section className="md:mx-8 lg:mx-32">
          <Accordion allowMultiple>
            {questions?.map((q, i) => {
              return (
                <AccordionItem className="border" key={`item-${q}`}>
                  <h2>
                    <AccordionButton className="font-roboto md:hover:bg-[#ECF4FA]">
                    <div className="flex flex-row md:h-[40px] min-h-min p-6 w-full justify-between items-center">
                      <div>
                        {q}
                      </div>
                      <AccordionIcon />
                      </div>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="font-roboto p-8 bg-[#ECF4FA]">
                    {answers[i]}
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
  };
}

export default Help;
