import React from "react";
import carouselImage1 from "../images/airline_slider1.png";
import carouselImage2 from "../images/airline_slider2.png";
import carouselImage3 from "../images/airline_slider3.png";

const Carousel = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "-20px", marginBottom: "20px" }} // Adjust the gap by reducing the top margin and adding bottom margin
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={carouselImage1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={carouselImage2} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={carouselImage3} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      ></button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      ></button>

      <style jsx>{`
        .carousel-item img {
          object-fit: contain;
          height: 60vh;
          border-radius: 0.5rem;
        }

        .carousel-indicators button {
          width: 12px;
          height: 12px;
          background-color: #007bff;
          border: none;
          border-radius: 50%;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
          opacity: 0.75;
        }

        .carousel-indicators .active {
          background-color: #ff5722;
          opacity: 1;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          background-color: #007bff;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
