import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Header />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <ToastContainer />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - shop now",
  description: "Mern Stack Project",
  keywords: "mern,react,mongodb,full stack",
  author: "Abhay Patel",
};

export default Layout;
