import { createClient } from "contentful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export const Help = ({ content }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(content);
  }, []);

  return (
    <>
      <nav className="bg-flagYellow h-[60px] font-extrabold sticky inset-0 z-50 flex flex-row items-center justify-between pl-6">
        <Link href="/">
          <FontAwesomeIcon
            className="text-3xl cursor-pointer"
            icon={faArrowLeftLong}
          />
        </Link>
        <img />
      </nav>
      <div className="p-8 lg:p-12 flex flex-row justify-center">
        <h2 className="text-[2em] lg:text-[3em] font-extrabold">Help</h2>
      </div>
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

export default Help;
