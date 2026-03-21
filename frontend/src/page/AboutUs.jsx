import React from "react";
import logo from "../images/logo.png";

const AboutUs = () => {
  return (
    <div className="container mt-5" style={{ paddingTop: "20px" }}>
      {" "}
      {/* Add paddingTop to create space */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="text-center">
            <img
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
            <h1 className="display-4 font-weight-bold text-primary mb-4">
              Welcome to Airline Reservation System
            </h1>
            <p className="lead text-secondary">
              Welcome to our Airline Reservation System, where seamless travel
              planning and exhilarating adventures meet. Embark on a journey of
              convenience as you navigate our user-friendly platform to explore
              an array of flights, destinations, and class options. Whether
              you're a seasoned traveler or a first-time flyer, our system
              offers you the power to book your flights with ease, ensuring a
              hassle-free experience from takeoff to landing.
            </p>
            <p className="lead text-secondary">
              From the moment you step into our digital gateway, you're one step
              closer to realizing your travel dreams. Join us as we redefine the
              way you book flights, making every adventure a memorable
              destination in itself.
            </p>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <h2 className="font-weight-bold text-success">
              Real-time Availability and Instant Confirmation
            </h2>
            <p className="text-secondary">
              Experience the ultimate in convenience with our real-time
              availability and instant confirmation system. Say goodbye to
              uncertainty and waiting – our cutting-edge technology ensures you
              receive up-to-the-minute flight availability and confirmation,
              giving you the confidence to secure your travel plans without
              delay.
            </p>
            <p className="text-secondary">
              Moreover, our system offers instant confirmation of bookings. Once
              users complete their reservation, they receive an immediate
              confirmation email or notification, assuring them that their
              tickets are secured and ready for travel. This eliminates any
              uncertainty and allows customers to proceed with their travel
              plans with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
