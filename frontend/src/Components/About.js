import '../ComponentsStyle/About.css'
import React from 'react';

const About = () => {
  return (
    <div className="about-us-container pt-5">
      
      <section className="about-us-section">
        <h2 className="section-title">Welcome to EasyLance</h2>
        <p className="section-content">
          FreelanceHub is a platform that connects businesses and individuals with top freelancers from around the world. Whether you need a web developer, graphic designer, content writer, or any other skilled professional, FreelanceHub makes it easy to find, connect, and collaborate.
        </p>
        <p className="section-content">
          Our goal is to simplify the hiring process by providing a transparent, user-friendly, and safe environment for both freelancers and clients. We believe in empowering talent and giving businesses access to the best resources, no matter their size.
        </p>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>

        <div className="how-it-works-content">
          <h3>As a User (Client)</h3>
          <p className="how-to-use">
            1. Browse through available freelancers on the platform based on your project needs.<br />
            2. Send a request to a freelancer whose skills align with your requirements.<br />
            3. The freelancer will reach out to you via the email you registered with.<br />
            4. Have a brief discussion about the project scope, timeline, and pricing.<br />
            5. Once you agree on terms, the freelancer will start working on your project.<br />
          </p>

          <h3>As a Freelancer</h3>
          <p className="how-to-use">
            1. Create your profile and specify your area of expertise and services.<br />
            2. Respond to user requests based on your skills and availability.<br />
            3. Once a user sends you a request, check the details and contact them via email.<br />
            4. Have a brief discussion with the user about the project requirements.<br />
            5. Once the terms are agreed upon, start working on the project and deliver high-quality results.<br />
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;

