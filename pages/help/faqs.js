/* eslint-disable @next/next/no-html-link-for-pages */
import { createClient } from "contentful";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/accordion";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";

export const FAQs = ({ content }) => {
  const [pageContent, setPageContent] = useState(content[0].fields);
  const [FAQs, setFAQs] = useState(pageContent.ukrainianFaqs);
  console.log(pageContent);


  return (
    <>
    <Layout img={pageContent.heroImage.fields.file.url} alt={'yo'} headerTitle={pageContent.englishHeaderTitle}>
        <Accordion allowMultiple>
            {FAQs?.map((item, i) => {
              return (
                // ${language === 'ukrainian' ? 'font-roboto' : 'font-lato'}
                <AccordionItem className={`bg-white rounded border-t border-r border-l ${i + 1 === FAQs.length ? 'border-b' : ''}`} key={`faq-${i + 1}`}>
                  <h2>
                    <AccordionButton className="md:hover:bg-[#f3f6fd]">
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
          </Layout>
    </>
  );
};

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const res = await client.getEntries({ content_type: "faqPageContent" });

  return {
    props: {
      content: res.items,
    },
    revalidate: 1
  };
}

export default FAQs;
