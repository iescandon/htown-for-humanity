/* eslint-disable @next/next/no-html-link-for-pages */
import { createClient } from "contentful";
import React, { useState, useEffect } from "react";

export const About = ({ content }) => {
  // const [pageContent, setPageContent] = useState(content[0].fields);
  // console.log(pageContent);
  console.log(content);

  return (
    <>
      {/* nav section */}
      <nav className="bg-flagYellow drop-shadow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center px-4 md:px-6">
        <a href="/" aria-label="back button">
          <h2>#htownforhumanity</h2>
        </a>
      </nav>
      <h1 className="m-24">Coming soon...</h1>
    </>
  );
};

// export async function getStaticProps() {
//   const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
//   });
//   const res = await client.getEntries({ content_type: "faqPageContent" });

//   return {
//     props: {
//       content: res.items,
//     },
//     revalidate: 1
//   };
// }

export default About;
