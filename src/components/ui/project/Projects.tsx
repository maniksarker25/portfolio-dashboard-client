/* eslint-disable @typescript-eslint/no-explicit-any */
// swiper
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
const Projects = ({ projects }: { projects: any }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div>
      {projects?.map((project: any, index: number) => (
        <div key={index}>
          <h3
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
            className="text-3xl mb-4"
          >
            {project?.title}{" "}
            <span className="text-2xl">({project?.shortDescription})</span>
          </h3>
          <Swiper
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
          >
            {project?.images?.map((image: string) => (
              <SwiperSlide>
                <img className="md:h-80 w-full" src={image} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
            className=" space-x-4 my-4 underline"
          >
            <Link to={`${project?.liveLink}`}>Live Site</Link>
            <Link to={`${project?.backEndRepo}`}>Server Side Code</Link>
            <Link to={`${project?.frontEndRepo}`}>Client Side Code</Link>
          </div>
          <h4
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
          >
            <span className="font-bold text-secondary">Technology used:</span>{" "}
            {project?.technologyUsed}
          </h4>
          <div
            data-aos="fade-right"
            data-aos-delay="400"
            data-aos-offset="100"
            data-aos-duration="1000"
          >
            <h3 className="text-3xl font-semibold my-4">Features</h3>
            <div className="space-y-2">
              <p>* {project?.featureOne}</p>
              <p>* {project?.featureTwo}</p>
              <p>* {project?.featureThree}</p>
              {project?.note && (
                <p>
                  <span className="font-bold">note:</span>
                  {project?.note}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
