import researchData from "@/data/research.json";

type ResearchItem = {
  status: string;
  title: string;
  description: string;
};

export default function Research() {
  return (
    <div id="research" className="content__block block-large">
      {/* H3 Block Start */}
      <div className="section-h3">
        <h3 className="h3__title animate-in-up">Research & Publications</h3>
      </div>
      {/* H3 Block End */}
      {/* Research Lines Start */}
      <div className="container-fluid p-0 resume-lines">
        {(researchData as ResearchItem[]).map((item, idx) => (
          <div className="row g-0 resume-lines__item animate-in-up" key={idx}>
            <div className="col-12 col-md-2">
              <span className="resume-lines__date animate-in-up" style={{ fontSize: "1.3rem", color: "var(--accent)" }}>
                {item.status}
              </span>
            </div>
            <div className="col-12 col-md-5">
              <h5 className="resume-lines__title animate-in-up">
                {item.title}
              </h5>
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
