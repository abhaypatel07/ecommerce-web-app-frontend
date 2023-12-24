import React from "react";
import Layout from "../components/Layout/Layout";

const PolicyPage = () => {
  return (
    <div>
      <Layout title="Private Policy - Ecommerce App">
        <div className="contect">
          <div className="left">
            <img
              src="https://catchspaces.sfo2.digitaloceanspaces.com/devotepress/2017/05/Privacy-Policy.jpg"
              alt=" this is contect img"
              width="600px"
            />
          </div>
          <div className="right">
            <h2>Privacy Policy</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              qui, dignissimos esse officiis sunt tenetur praesentium ad, vel
              nostrum doloremque laboriosam deleniti velit facilis, repudiandae
              porro sit accusantium libero omnis optio cumque tempora asperiores
              repellat nemo magnam. Reprehenderit, nesciunt accusantium.
            </p>
          </div>
        </div>
        ;
      </Layout>
    </div>
  );
};

export default PolicyPage;
