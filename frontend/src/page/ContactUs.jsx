import React from "react";

const ContactUs = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="text-center">
            <h1 className="display-4 font-weight-bold text-primary mb-4">
              Contact Us
            </h1>
            <p className="lead text-secondary">
              Have any questions, feedback, or need assistance? We're here to
              help! Our dedicated team is committed to providing you with the
              support you need to ensure a smooth and enjoyable experience with
              our Airline Reservation System.
            </p>
            <p className="lead text-secondary">
              Reach out to us through any of the channels below, and we'll get
              back to you as soon as possible.
            </p>
          </div>
          <div className="text-center mt-5">
            <h3 className="font-weight-bold text-success">Get in Touch</h3>
            <p className="text-secondary">
              <strong>Email:</strong> support@airline.com
            </p>
            <p className="text-secondary">
              <strong>Phone:</strong> +1 (234) 567-8900
            </p>
            <p className="text-secondary">
              <strong>Address:</strong> 123 Airline St, Travel City, TC 12345
            </p>
          </div>
          <div className="text-center mt-5">
            <h3 className="font-weight-bold text-success">Follow Us</h3>
            <p className="text-secondary">
              Stay connected with us on social media for the latest updates and
              offers.
            </p>
            <p className="text-secondary">
              <strong>Facebook:</strong> facebook.com/airline
              <br />
              <strong>Twitter:</strong> twitter.com/airline
              <br />
              <strong>Instagram:</strong> instagram.com/airline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
