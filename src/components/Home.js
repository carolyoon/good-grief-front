import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1>Mission Statement:</h1>
        <p>We strive to create a safe environment for those with a broken heart from a relationship dissolution, and want to start the healing process. We aim provide resources, concerned with the five common stages of grief, to those that want to know how others have overcome the grieving process.</p>

        <div className="disclaimer">
          <h4>Disclaimer:</h4>
          <p>Good Grief DOES NOT provide medical advice.
            The information on this site is not intended or implied to be a substitute for professional medical advice, diagnosis, or treatment. All content, including text, graphics, images, and information, contained on or available through this website is for general information purposes only. Good Grief makes no representation and assumes no responsibility for the accuracy of the information contained on or available through this website. You are encouraged to confirm any information obtained from or through this website with other sources, and to consult a medical professional, if desired.
              <strong>NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY SEEKING MEDICAL TREATMENT BECAUSE OF SOMETHING YOU HAVE READ OR ACCESSED THROUGH THIS WEBSITE.</strong>
              Our purpose is to promote self awareness and assistance in self-healing. Always seek the advice of a medical professional if you have questions about your mental health or wellbeing. </p>
        </div>
      </div>
    );
  }
}

export default Home;
