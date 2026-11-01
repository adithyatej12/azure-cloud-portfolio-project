"use client";
import menuItems from "@/data/menu.json";
import { useEffect, useState } from "react";

export default function Nav() {
  const [activeSection, setActiveSection] = useState(
    menuItems[0].href.replace("#", "")
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px" }
    );

    setTimeout(() => {
      menuItems.forEach((elm) => {
        const element = document.querySelector(elm.href);
        if (element) observer.observe(element);
      });
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector<HTMLElement>(id);
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {menuItems.map((item, idx) => (
        <li className="menu__item" key={idx}>
          <a
            className={
              activeSection == item.href.replace("#", "")
                ? "menu__link btn active"
                : "menu__link btn"
            }
            onClick={(e) => handleClick(e, item.href)}
            href={item.href}
          >
            <span className="menu__caption">{item.caption}</span>
            <i className={item.icon} />
          </a>
        </li>
      ))}
    </>
  );
}
