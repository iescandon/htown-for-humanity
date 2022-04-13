import { createClient } from "contentful";
import ContactForm from '../components/form'

export const Home = ({content}) => {
  console.log(content);
  return (
    <>
      {/* flag section */}
      <section className="relative w-screen h-full min-h-min">
        {/* blue image section */}
        <div className="relative h-[550px]">
          <div className="blueOverlay absolute w-full h-full flex flex-col justify-between">
            <div>      
              <img src={content[0].fields.logo.fields.file.url} className=" m-12 h-[120px]"/>
            </div>
            <div className="title font-saira font-bold text-white text-[4em] mx-24 my-10 leading-tight">{content[0].fields.headerTitle}<br></br>{content[0].fields.headerSubtitle}</div>
          </div>
          <div className="w-full h-full">
            <img src={content[0].fields.heroImage.fields.file.url} alt="hero image" className="w-full h-full object-cover"></img>
          </div>
        </div>
        {/* yellow section */}
        <div className="w-screen min-h-[350px] py-12 pl-24 pr-[550px] bg-flagYellow">

        {content[0].fields.paragraphText.content[0].content[0].value}
        {/* {content[0].fields.paragraphText.content.map((paragraph)=>{
          <p>
            {paragraph.content[0].value}
          </p>
          console.log(paragraph.content[0].value)
        })
        } */}
        </div>
        <div className="absolute w-full h-full flex top-0 justify-end items-center">
          <div className="relative bg-white w-[375px] h-[750px] mr-20"></div>
        </div>
      </section>
      {/* 1st white section */}
      <section className="h-[300px]">

      </section>
      {/* blue section */}
      <section className="h-[500px] flex flex-row">
        <div className="bg-flagBlue h-full w-2/3 flex flex-row justify-center items-center">
          <div className="card bg-white m-8 w-full h-90percent p-6">
          <ContactForm contactFormTitle={content[0].fields.contactFormTitle}/>  
          </div>
        </div>
        <img className="bg-white h-full w-1/3 object-cover" src={content[0].fields.contactAsideImage.fields.file.url}/>
      </section>      
      {/* 2nd white section */}
      {/* <section className="h-[500px]">

      </section> */}
      {/* footer */}
      <footer className="bg-black h-[100px]">

      </footer>
    </>
  )
}

export async function getStaticProps()
 {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
  const res = await client.getEntries({ content_type: 'pageContent'})
  return {
    props: {
      content: res.items
    }
  }
 }

 export default Home;


{/* <section className="bg-gradient-to-b from-flagBlue to-black h-[450px]"> */}