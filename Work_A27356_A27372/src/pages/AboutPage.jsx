import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
            Welcome to Vinyl Records, where music meets the timeless charm of vinyl records. Our mission is to celebrate the art of music by offering a carefully curated selection of classic and contemporary records that resonate with music enthusiasts and collectors alike.

            At Vinly Records, we believe that vinyl is more than just a medium for music—it's an experience. From the warm crackle of a needle hitting the record to the stunning album artwork, every element contributes to a story that digital platforms can’t replicate. 

            Whether you're a seasoned collector hunting for rare gems, a newcomer exploring the magic of vinyl, or someone looking for the perfect gift for a music lover, we've got you covered. Our collection spans a variety of genres, including rock, jazz, hip-hop, blues, and more, ensuring there's something for every taste.


            Join us in celebrating the enduring soul of vinyl and keeping the tradition alive. Spin a record, feel the music, and let the vibes flow.
        </p>

     
      </div>
      <Footer />
    </>
  )
}

export default AboutPage