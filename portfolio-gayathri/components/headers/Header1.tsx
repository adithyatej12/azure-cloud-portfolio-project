import Nav from "./Nav";
import ThemeSwitcherButton from "./ThemeSwitcherButton";

export default function Header1() {
  return (
    <>
      <style>{`
        /* ===== NAVBAR OVERRIDES ===== */
        .header {
          padding: 0 2rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 0 !important;
        }
        .header__navigation {
          flex: 1 1 auto;
          overflow: visible;
        }

        /* Nav items: one row, tighter spacing, smaller font */
        .menu__list {
          display: flex !important;
          flex-wrap: nowrap !important;
          justify-content: flex-start !important;
          align-items: center !important;
          gap: 2px !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
        }
        .menu__item {
          display: inline-flex !important;
          flex-shrink: 0;
        }
        .menu__link {
          font-size: 14px !important;
          padding: 6px 10px !important;
          white-space: nowrap !important;
        }
        .menu__link .menu__caption {
          font-size: 14px !important;
        }

        /* Controls: theme toggle + Let's Talk button */
        .header__controls {
          flex-shrink: 0;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding-left: 8px !important;
        }
        .header__trigger {
          white-space: nowrap !important;
          flex-shrink: 0 !important;
          padding: 6px 16px !important;
          font-size: 14px !important;
        }

        /* Contrast fix: dark mode menu links */
        [color-scheme="dark"] .menu__link {
          color: rgba(255, 255, 255, 0.78) !important;
        }
        [color-scheme="dark"] .menu__link:hover,
        [color-scheme="dark"] .menu__link.active {
          color: #ffffff !important;
        }

        /* ===== MOBILE RESPONSIVE ===== */
        @media only screen and (max-width: 991px) {
          .header {
            width: 92% !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            height: auto !important;
            padding: 8px 14px !important;
            border-radius: 30px !important;
            display: flex !important;
            justify-content: space-between !important;
            bottom: 2rem !important;
            top: auto !important;
          }
          .header__navigation {
            flex: 1;
            overflow: hidden;
          }
          .menu__list {
            justify-content: space-around !important;
            gap: 0 !important;
          }
          .menu__link {
            padding: 6px 6px !important;
            font-size: 12px !important;
          }
          .menu__link .menu__caption {
            font-size: 12px !important;
          }
          .header__controls {
            gap: 6px !important;
            padding-left: 6px !important;
          }
          .header__trigger {
            padding: 6px 10px !important;
            font-size: 12px !important;
          }
          .trigger__caption {
            display: none !important;
          }
        }

        @media only screen and (max-width: 767px) {
          .menu__link .menu__caption {
            display: none !important;
          }
          .menu__link {
            padding: 8px !important;
          }
        }
      `}</style>

      <header id="header" className="header d-flex justify-content-between">
        <div className="header__navigation">
          <nav id="menu" className="menu">
            <ul className="menu__list d-flex align-items-center">
              <Nav />
            </ul>
          </nav>
        </div>
        <div className="header__controls d-flex align-items-center">
          <ThemeSwitcherButton />
          <a
            id="notify-trigger"
            className="header__trigger btn"
            href="mailto:gayathrimgayathri4@gmail.com?subject=Message%20from%20your%20site"
          >
            <span className="trigger__caption">Let&apos;s Talk</span>
            <i className="ph-bold ph-chat-dots" />
          </a>
        </div>
      </header>
    </>
  );
}
