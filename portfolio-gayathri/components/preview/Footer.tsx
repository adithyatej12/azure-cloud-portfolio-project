export default function Footer() {
  return (
    <footer className="demo__footer">
      <div className="footer__content">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="footer__footercta d-flex flex-column">
                <div className="footercta__logo d-flex justify-content-center animate-in-up">
                  <a href="#0" target="_blank">
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
                      <style
                        type="text/css"
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                        .gradient-fill {\n                          fill: url(#gradientFillFooter);\n                        }\n                      ",
                        }}
                      />
                      <g>
                        <linearGradient
                          id="gradientFillFooter"
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
                  </a>
                </div>
                <div className="footercta__caption d-flex justify-content-center animate-in-up">
                  <p>
                    Show yourself brightly with Braxton - unique and creative
                    portfolio Next.Js template!
                  </p>
                </div>
                <div className="footercta__cta animate-in-up">
                  <a
                    className="btn btn-default btn-hover btn-hover-accent"
                    href="https://themeforest.net/item/braxton-personal-portfolio-resume-react-nextjstemplate/59550577"
                    target="_blank"
                  >
                    {/* template link here */}
                    <span className="btn__caption">Purchase Now</span>
                    <i className="ph-bold ph-shopping-cart" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="footer__links d-flex flex-column flex-lg-row justify-content-lg-between">
                <p className="additional-text">
                  Let&apos;s talk on{" "}
                  <a
                    className="text-link-bold"
                    href="mailto:ibthemes21@gmail.com"
                  >
                    ibthemes21@gmail.com
                  </a>
                </p>
                <p className="additional-text">
                  Made with <i className="ph ph-heart" /> by {" "}
                  <a
                    className="text-link-bold"
                    href="https://themeforest.net/user/ib-themes"
                    target="_blank"
                  >
                    ib-themes
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
