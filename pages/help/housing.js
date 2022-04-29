/* eslint-disable @next/next/no-html-link-for-pages */
import { createClient } from "contentful";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";

export const Housing = ({ content }) => {
  // const [pageContent, setPageContent] = useState(content[0].fields);
  // console.log(pageContent);
  console.log(content)


  return (
    <>
    <Layout img={''} alt={'yo'} headerTitle={'Housing'}>
    <h1>housing content</h1>
    </Layout>
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

export default Housing;
