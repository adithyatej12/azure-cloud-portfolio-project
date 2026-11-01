"use client";
import testimonials from "@/data/testimonials.json";
import Image from "next/image";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <>
      <div className="content__block section-title">
        <p className="h2__subtitle animate-in-up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="13px"
            height="13px"
            viewBox="0 0 13 13"
            fill="currentColor"
          >
            <path
              fill="currentColor"
              d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8
            C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7
            C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"
            />
          </svg>
          <span>Testimonials</span>
        </p>
        <h2 className="h2__title animate-in-up">Clients say about me</h2>
      </div>
      <div className="content__block">
        {/* Testimonials Slider Start */}
        <div className="testimonials-slider">
          <Swiper
            className="swiper-testimonials"
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={30}
            slidesPerView={1}
            loop
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide className="swiper-slide" key={idx}>
                <div className="testimonials-card animate-in-up">
                  <div className="testimonials-card__tauthor d-flex animate-in-up">
                    <div className="tauthor__avatar">
                      <Image
                        alt="Review Author"
                        src={item.avatar}
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="tauthor__info d-flex flex-column justify-content-center">
                      <p className="tauthor__name">{item.name}</p>
                      <p className="tauthor__position">
                        {item.position.split(" in ")[0]} in{" "}
                        <a
                          href={item.companyLink}
                          className="text-link-bold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.position.split(" in ")[1]}
                        </a>
                      </p>
                      <div className="tauthor__rating d-flex">
                        {Array.from({ length: item.rating }).map(
                          (_, starIdx) => (
                            <i className="ph-fill ph-star" key={starIdx} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="testimonials-card__descr animate-in-up">
                    <p>{item.description}</p>
                  </div>
                  <div className="testimonials-card__btnholder animate-in-up">
                    <a
                      className="btn mobile-vertical btn-line btn-transparent slide-right"
                      href={item.projectLink}
                    >
                      <span className="btn-caption">Project Page</span>
                      <i className="ph-bold ph-arrow-right" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* navigation buttons */}
            <div className="swiper-button-prev mxd-slider-btn-square mxd-slider-btn-square-prev animate-in-up">
              <a
                className="btn btn-square btn-square-s btn-outline slide-left"
                href="#"
              >
                <i className="ph-bold ph-caret-left" />
              </a>
            </div>
            <div className="swiper-button-next mxd-slider-btn-square mxd-slider-btn-square-next animate-in-up">
              <a
                className="btn btn-square btn-square-s btn-outline slide-right"
                href="#"
              >
                <i className="ph-bold ph-caret-right" />
              </a>
            </div>
          </Swiper>
        </div>
        {/* Testimonials Slider End */}
      </div>
    </>
  );
}
