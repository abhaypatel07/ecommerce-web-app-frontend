import React from 'react'
import Layout from '../components/Layout/Layout'

const AboutPage = () => {
  return (
    <Layout title="About Us - Ecommerce App">
    <div className="contect">
      <div className="left">
        <img
          src="https://evisionmedia.ca/wp-content/uploads/2015/06/Compelling-About-Page-768x422.jpg"
          width="500px"
          alt='this is about pic'
        />
      </div>
      <div className="right">
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem perferendis, fuga quia, necessitatibus officiis consequatur incidunt unde iste asperiores quos voluptates sapiente explicabo. Harum temporibus a illo in hic deleniti, ipsa aliquid nobis ut eligendi ullam eius illum! Recusandae, deleniti?
          24X7
        </p>
      </div>
    </div>
    ;
  </Layout>
  )
}

export default AboutPage
