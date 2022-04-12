import { createClient } from "contentful";

export const Home = ({content}) => {
  // console.log(content);
  return (
    <>
      {/* flag section */}
      <section className="relative w-screen h-full min-h-min">
        {/* blue image section */}
        <div className="relative h-[550px]">
          <div className="blueOverlay absolute w-full h-full flex justify-start items-end">
            <div className="title font-saira font-bold text-white text-[4em] mx-24 my-10 leading-tight">H-town can help: <br></br> Donate Now</div>
          </div>
          <div className="w-full h-full">
            <img src={content[0].fields.heroImage.fields.file.url} alt="hero image" className="w-full h-full object-cover"></img>
          </div>
        </div>
        {/* yellow section */}
        <div className="w-screen h-[350px] bg-flagYellow">
        </div>
        <div className="absolute w-full h-full flex top-0 justify-end items-center">
          <div className="card relative bg-white w-[375px] h-[750px] mr-20"></div>
        </div>
      </section>
      {/* 1st white section */}
      <section className="h-[300px]">

      </section>
      {/* blue section */}
      <section className="h-[450px] flex flex-row">
        <div className="bg-flagBlue h-full w-1/2">
        </div>
        <img src="https://www.politico.com/dims4/default/0081a6d/2147483647/strip/true/crop/8015x5346+0+0/resize/1260x840!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Ff7%2F13%2F25c33f46427190c964a69f15dcae%2Fgettyimages-1366284970.jpg" className="bg-white h-full w-1/2 object-cover"/>
      </section>  
      {/* 2nd white section */}
      <section className="h-[500px]">

      </section>
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
  const res = await client.getEntries({ content_type: 'images'})
  return {
    props: {
      content: res.items
    }
  }
 }

 export default Home;


{/* <section className="bg-gradient-to-b from-flagBlue to-black h-[450px]"> */}