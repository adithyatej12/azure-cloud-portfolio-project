import Image from "next/image";

import MarqueeSlider from "./MarqueeSlider";

export default function Intro() {
  return (
    <section className="demo__intro">
      <div className="intro__header">
        <div className="header__container">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12">
                <div className="header__logo">
                  <a
                    className="d-flex justify-content-start align-items-center"
                    href="#0"
                    target="_blank"
                  >
                    {/* template link here */}
                    <div className="logo__image">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="85px"
                        height="85px"
                        viewBox="0 0 85 85"
                        enableBackground={"new 0 0 85 85"}
                        xmlSpace="preserve"
                        className="gradient-fill"
                      >
                        <style type="text/css" />
                        <g>
                          <linearGradient
                            id="gradientFill"
                            gradientUnits="userSpaceOnUse"
                            x1="9.9604"
                            y1="75.0338"
                            x2="75.0387"
                            y2="9.9555"
                          >
                            <stop
                              offset={0}
                              style={{ stopColor: "var(--accent)" }}
                            />
                            <stop
                              offset={1}
                              style={{ stopColor: "var(--secondary)" }}
                            />
                          </linearGradient>
                          <path
                            className="gradient-fill"
                            d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
                        c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
                        v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
                        C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
                        h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
                        v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
                        h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
                        h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="logo__caption">
                      <p>
                        Braxton
                        <br />
                        Template
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="intro__content">
        <div className="headline">
          <p className="headline__subtitle animate-in-up">
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
            <span>Meet Braxton!</span>
          </p>
          <h1
            className="headline__title animate-in-up"
            data-duration="0.6"
            data-delay="0.4"
          >
            Clean and bright portfolio Next.Js template
          </h1>
          <div className="headline__btnholder d-flex flex-column flex-sm-row">
            <a
              className="btn mobile-vertical btn-default btn-hover btn-hover-accent animate-in-up"
              href="#live-preview"
              data-delay="0.5"
              data-duration="0.7"
            >
              <span className="btn-caption">View Demos</span>
              <i className="ph-bold ph-squares-four" />
            </a>
            <a
              className="btn mobile-vertical btn-default btn-hover btn-hover-outline animate-in-up"
              href="https://themeforest.net/item/braxton-personal-portfolio-resume-react-nextjstemplate/59550577"
              target="_blank"
              data-delay=".8"
              data-duration="0.8"
            >
              <span className="btn-caption">Buy Now</span>
              <i className="ph-bold ph-basket" />
            </a>
          </div>
        </div>
        <div className="promo-image">
          <Image
            alt="Braxton"
            src="/img/demo/mockup.webp"
            width={1555}
            height={1200}
          />
        </div>
      </div>
      <MarqueeSlider />
    </section>
  );
}
