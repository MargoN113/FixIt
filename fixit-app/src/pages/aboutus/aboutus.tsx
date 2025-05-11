import React from "react";
import "./aboutus.scss"; // Adjust the path as necessary
import Header from "../../components/header/header";

const AboutUs: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <div className="aboutus">
        <h2>About Us</h2>

        <p>
          So far it lists 39 Repair Cafés, but we are working on getting the
          information from more confirmed.
        </p>

        <p>
          The website is open source, see the source code on{" "}
          <a href="https://github.com">Github</a>.
        </p>

        <p>
          All information on this website is Augsburg specific, for more
          information on Repair Cafés in general see{" "}
          <a href="https://repaircafe.org">repaircafe.org</a>.
        </p>

        <p>
          If you would like to add a Repair Café or if any information is
          incorrect or incomplete, we would greatly appreciate an email. For
          adding, we prefer to use this{" "}
          <a href="#" title="Questionnaire (currently in Dutch)">
            questionnaire
          </a>
          .
        </p>

        <p>We are still looking for help with:</p>

        <ul className="list-disc list-inside">
          <li>
            <strong>Community management.</strong> Someone who supports in the
            communication with the Repair Cafés so that the agenda is as
            accurate and complete as possible and stays that way.
          </li>
          <li>
            <strong>Visual / UI / UX Design.</strong> Someone who can contribute
            ideas on structure, navigation, how things should work and what it
            should look like. We have a Figma file full of designs we'd love to
            share with you.
          </li>
          <li>
            <strong>Development.</strong> Mainly front-end development. Someone
            who can possibly co-develop and act as a backup. Someone with
            knowledge of for example React, Next and Tailwind. See the code on{" "}
            <a href="https://github.com">Github</a> for more info.
          </li>
        </ul>

        <p>Contact</p>
        <p>
          <a href="mailto:info@repaircafe.fixit">info@repaircafe.fixit</a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
