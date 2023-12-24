import React from "react";
import Layout from "../components/Layout/Layout";
import { AiTwotoneMail } from "react-icons/ai";
import { FaHeadset } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";

const ContectPage = () => {
  return (
    <Layout title="Contect - Ecommerce App ">
      <div className="contect">
        <div className="left">
          <img
            src="https://www.webhostingpad.com/images/contact-us.jpg"
            alt=" this is contect img"
            width="500px"
          />
        </div>
        <div className="right">
          <h2>Contact Us</h2>
          <p>
            Any query about product feel free to call anytime we are available
            24X7
          </p>
          <p>
            <AiTwotoneMail />
            www.help@ecommerceapp.com
          </p>
          <p>
            <IoMdShareAlt />
            +91 89562 2456
          </p>
          <p>
            <FaHeadset />
            1800 2006 2345(tollfree)
          </p>
        </div>
      </div>
      ;
    </Layout>
  );
};

export default ContectPage;
