import { createClient } from "contentful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingDollar,
  faPeopleGroup,
  faMoneyBill1Wave,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const Help = ({ content }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(content);
  }, []);

  return (
    <div className="m-20">
      <h1>HELP</h1>
      <br></br>
      <Link href="/">
        <button>BACK</button>
      </Link>
    </div>
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
