import achievements from "@/data/facts.json";
import services from "@/data/services.json";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="inner about">
      {/* Content Block - H2 Section Title Start */}
      <div className="content__block section-grid-title">
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
          <span>About Me</span>
        </p>
        <h2 className="h2__title animate-in-up">
          Building simple, efficient, and scalable cloud & AI applications
        </h2>
      </div>
      {/* Content Block - H2 Section Title End */}
      {/* Content Block - Achievements Start */}
      <div className="content__block grid-block">
        <div className="achievements d-flex flex-column flex-md-row align-items-md-stretch">
          {achievements.map(
            (item: { number: number; descr: string }, idx: number) => (
              <div
                key={idx}
                className="achievements__item d-flex flex-column grid-item animate-card-3"
              >
                <div className="achievements__card">
                  <p className="achievements__number">{item.number}+</p>
                  <p className="achievements__descr">{item.descr}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {/* Content Block - Achievements End */}
      {/* Content Block - About Me Data Start */}
      <div className="content__block grid-block block-large">
        <div className="container-fluid p-0">
          <div className="row g-0 justify-content-between">
            {/* About Me Description Start */}
            <div className="col-12 col-xl-8 grid-item about-descr">
              <p className="about-descr__text animate-in-up">
                I’m Gayathri M, an MCA student specializing in Storage and Cloud Technology. I have a strong interest in frontend development, React, full-stack web development, cloud computing and machine learning.
              </p>{" "}
              <p className="about-descr__text animate-in-up">
                I have worked on academic projects involving web applications, artificial intelligence, machine learning, computer vision and database-backed systems. I enjoy creating clean, responsive and user-friendly interfaces while continuously strengthening my knowledge of backend development, cloud technologies and scalable application design.
              </p>{" "}
              <p className="about-descr__text animate-in-up">
                My goal is to gain practical experience, improve my technical skills and contribute to meaningful IT projects.
              </p>{" "}
              <div className="btn-group about-descr__btnholder animate-in-up">
                <a
                  className="btn mobile-vertical btn-default btn-hover btn-hover-accent"
                  href="/Gayathri_M_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="btn-caption">View Resume</span>
                  <i className="ph-bold ph-file-pdf" />
                </a>
              </div>
            </div>
            {/* About Me Description End */}
            {/* About Me Information Start */}
            <div className="col-12 col-xl-4 grid-item about-info">
              <div className="about-info__item animate-in-up">
                <h6>
                  <small className="top">Name</small>
                  Gayathri M
                </h6>
              </div>
              <div className="about-info__item animate-in-up">
                <h6>
                  <small className="top">Phone</small>
                  <a className="text-link-bold" href="tel:+916363498706">
                    +91 6363498706
                  </a>
                </h6>
              </div>
              <div className="about-info__item animate-in-up">
                <h6>
                  <small className="top">Email</small>
                  <a
                    className="text-link-bold"
                    href="mailto:gayathrimgayathri4@gmail.com?subject=Message%20from%20your%20site"
                  >
                    gayathrimgayathri4@gmail.com
                  </a>
                </h6>
              </div>
              <div className="about-info__item animate-in-up">
                <h6>
                  <small className="top">Location</small>
                  <a
                    className="text-link-bold"
                    href="https://www.google.com/maps/place/Bengaluru,+Karnataka,+India/"
                    target="_blank"
                  >
                    Bengaluru, India
                  </a>
                </h6>
              </div>
            </div>
            {/* About Me Information End */}
          </div>
        </div>
      </div>
      {/* Content Block - About Me Data End */}
      {/* Content Block - Languages Known Start */}
      <div className="content__block grid-block block-large border-top pt-4">
        <div className="container-fluid p-0">
          <div className="section-h3">
            <h3 className="h3__title animate-in-up">Languages Known</h3>
          </div>
          <div className="row g-3 animate-in-up">
            {["English", "Kannada", "Tamil", "Hindi"].map((lang, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div className="about-info__item p-3 rounded text-center animate-in-up" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h5 className="m-0" style={{ fontSize: "1.6rem", fontWeight: 600 }}>{lang}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Content Block - Languages Known End */}
      {/* Content Block - Services Start */}
      <div className="content__block grid-block">
        <div className="container-fluid p-0">
          <div className="row g-0 align-items-stretch cards">
            {services.map(
              (
                service: {
                  title: string;
                  tags: string[];
                  text: string;
                  img: string;
                },
                idx: number
              ) => (
                <div
                  key={idx}
                  className="col-12 col-md-6 cards__item grid-item animate-card-2"
                >
                  <div className="cards__card d-flex flex-column">
                    <div className="cards__descr">
                      <h4 className="cards__title animate-in-up">
                        {service.title}
                      </h4>
                      <div className="cards__tags d-flex flex-wrap animate-in-up">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="rounded-tag tag-outline"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="small cards__text animate-in-up">
                        {service.text}
                      </p>
                    </div>
                    <div className="cards__image d-flex animate-in-up">
                      <Image
                        alt="Service/Feature Image"
                        src={service.img}
                        width={1200}
                        height={900}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Content Block - Services End */}
    </section>
  );
}
