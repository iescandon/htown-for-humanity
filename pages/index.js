import { createClient } from "contentful";

export default function Home({content}) {
  console.log(content);
  return (
    <>
      <div className="relative">
      <h1 className="absolute text-white bottom-1/2 translate-y-1/2 text-[6em] w-full flex justify-center">H-TOWN FOR HUMANITY</h1>
      <div className="w-screen h-[500px]">
        <img src={content[0].fields.heroImage.fields.file.url} class="w-full h-full object-cover"></img>
      </div>
      </div>
    </>
  )
}

export async function getStaticProps()
 {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: 'images'})

  return {
    props: {
      content: res.items
    }
  }
 }