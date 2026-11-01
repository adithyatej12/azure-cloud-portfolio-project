import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Profile({
  profileImage = "/img/avatars/gayathri_new.png",
}) {
  return (
    <div id="avatar" className="avatar animate-fade">
      <style>{`
        /* Profile image square card */
        .profile-image-card {
          width: 240px !important;
          height: 240px !important;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid var(--stroke-elements) !important;
          border-radius: 24px !important;
          padding: 0px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
          margin: 0 auto 2.5rem auto !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease !important;
        }
        [color-scheme="light"] .profile-image-card {
          background: rgba(0, 0, 0, 0.03) !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05) !important;
        }
        .profile-image-card img {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          display: block !important;
          border-radius: 24px !important;
        }
        
        .avatar__logo {
          margin-bottom: 1.2rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100%;
        }
        
        .avatar__name {
          font-family: var(--_font-default);
          font-weight: 800;
          font-size: 2.6rem;
          color: var(--t-bright, #ffffff);
          text-align: center;
          margin-top: 0 !important;
          margin-bottom: 0.5rem !important;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .avatar__subtitle {
          font-family: var(--_font-default);
          font-weight: 600;
          font-size: 1.4rem;
          color: var(--t-muted, #a1a1af);
          text-align: center;
          margin-top: 0 !important;
          margin-bottom: 2.5rem !important;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        /* Circular social icon buttons with hover scale and glow */
        .circular-social-link {
          width: 46px;
          height: 46px;
          border-radius: 50% !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          color: var(--text-heading, #ffffff) !important;
          background: rgba(255, 255, 255, 0.02) !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          font-size: 2rem !important;
          text-decoration: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        [color-scheme="light"] .circular-social-link {
          border-color: rgba(0, 0, 0, 0.12) !important;
          color: #2b2b2b !important;
          background: rgba(0, 0, 0, 0.02) !important;
        }
        .circular-social-link:hover {
          transform: scale(1.18) !important;
          border-color: #4CAF50 !important;
          color: #4CAF50 !important;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.45) !important;
        }

        /* Responsive Layout Overrides */
        @media only screen and (min-width: 992px) {
          #avatar.avatar {
            position: fixed !important;
            top: 3rem !important;
            left: 3rem !important;
            width: 300px !important;
            height: calc(100vh - 6rem) !important;
            margin: 0 !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            z-index: 10 !important;
          }
          .avatar__container {
            height: 100% !important;
            padding: 3rem !important;
          }
          /* Shift the main content block 50px further to the right on desktop */
          .content {
            padding-left: 380px !important;
          }
        }
        @media only screen and (min-width: 1200px) {
          #avatar.avatar {
            left: 6rem !important;
          }
          .content {
            padding-left: 415px !important;
          }
        }
        @media only screen and (min-width: 1400px) {
          #avatar.avatar {
            top: 5rem !important;
            left: 8rem !important;
            width: 400px !important;
            height: calc(100vh - 10rem) !important;
          }
          .avatar__container {
            padding: 4rem !important;
          }
          .content {
            padding-left: 540px !important;
          }
        }
        @media only screen and (min-width: 1600px) {
          #avatar.avatar {
            left: 10rem !important;
          }
          .content {
            padding-left: 560px !important;
          }
        }
      `}</style>
      <div className="avatar__container d-flex flex-column justify-content-lg-between">
        {/* image and logo */}
        <div className="avatar__block">
          <div className="avatar__logo d-flex align-items-center justify-content-center">
            <div className="logo__image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
              >
                <defs>
                  <linearGradient
                    id="gradientFill"
                    x1="9.9604"
                    y1="75.0338"
                    x2="75.0387"
                    y2="9.9555"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="var(--accent)" />
                    <stop offset="1" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#gradientFill)"
                  d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
              c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
              v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v-3.9h3.9h3.9v3.9v1
              C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
              h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
              v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
              h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
              h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
                />
              </svg>
            </div>
            <span className="logo__caption">
              <p>GM</p>
            </span>
          </div>
          <div className="avatar__name">
            Gayathri M
          </div>
          <div className="profile-image-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Gayathri M developer illustration"
              src={profileImage}
            />
          </div>
        </div>

        {/* data caption #1 */}
        <div className="avatar__block">
          <h6>
            <small className="top">Specialization:</small>
            Storage & Cloud Technology
            <br />
            Full Stack Developer
          </h6>
        </div>

        {/* data caption #2 */}
        <div className="avatar__block">
          <h6>
            <small className="top">Based in:</small>
            Bengaluru, India
          </h6>
        </div>

        {/* socials and CTA button */}
        <div className="avatar__block">
          <div className="avatar__socials mb-5">
            <ul className="socials-square d-flex justify-content-around align-items-center gap-3" style={{ padding: 0, margin: 0, listStyle: "none" }}>
              <li className="socials-square__item">
                <a
                  className="circular-social-link"
                  href="https://www.linkedin.com/in/gayathri-m-a5a86120a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li className="socials-square__item">
                <a
                  className="circular-social-link"
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </li>
              <li className="socials-square__item">
                <a
                  className="circular-social-link"
                  href="mailto:gayathrimgayathri4@gmail.com?subject=Message%20from%20your%20site"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <MdEmail />
                </a>
              </li>
            </ul>
          </div>
          <div className="avatar__btnholder">
            <a
              className="btn btn-default btn-fullwidth btn-hover btn-hover-accent"
              href="#contact"
            >
              <span className="btn-caption">Let&apos;s Work Together!</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
