import educationData from "@/data/education.json";

type EducationItem = {
  date: string;
  title: string;
  source: {
    name: string;
    link: string;
  };
  description: string;
};

export default function Education() {
  return (
    <div id="education" className="content__block block-large">
      {/* H3 Block Start */}
      <div className="section-h3">
        <h3 className="h3__title animate-in-up">My education</h3>
      </div>
      {/* H3 Block End */}
      {/* Education Lines Start */}
      <div className="container-fluid p-0 resume-lines">
        {(educationData as EducationItem[]).map((item, idx) => (
          <div className="row g-0 resume-lines__item animate-in-up" key={idx}>
            <div className="col-12 col-md-2">
              <span className="resume-lines__date animate-in-up">
                {item.date}
              </span>
            </div>
            <div className="col-12 col-md-5">
              <h5 className="resume-lines__title animate-in-up">
                {item.title}
              </h5>
              <p className="resume-lines__source animate-in-up">
                Course by
                <a
                  href={item.source.link}
                  className="text-link-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.source.name}
                </a>
              </p>
            </div>
            <div className="col-12 col-md-5">
              <p className="small resume-lines__descr animate-in-up">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
