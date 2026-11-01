import previewCards from "@/data/previewCards.json";
import Link from "next/link";
import Image from "next/image";

export default function Pages() {
  return (
    <div id="live-preview" className="demo__preview">
      <div className="preview__content">
        <div className="container-fluid p-0">
          <div className="row g-0 align-items-stretch">
            {previewCards.map((card, idx) => (
              <div
                className="col-12 col-md-6 card animate-in-up"
                data-delay={idx % 2 ? "0.3" : "0"}
                key={idx}
              >
                <div className="card__inner">
                  <Link
                    rel="noopener noreferrer"
                    href={card.href}
                    className="card__link"
                    target="_blank"
                  >
                    <div className="card__image">
                      <div className={`image__container ${card.imgClass}`}>
                        <Image
                          alt="Preview"
                          src={card.img}
                          width={1366}
                          height={768}
                        />
                      </div>
                    </div>
                    <div className="card__caption">
                      <span className="btn btn-line btn-transparent slide-right">
                        <span className="btn-caption">{card.caption}</span>
                        <i className="ph-bold ph-arrow-right" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
