import React from "react";
import "../styles/standard.css";

interface Auditor {
  initials: string;
  name: string;
  role: string;
  tags: string[];
}

const auditors: Auditor[] = [
  { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "EC", name: "Emily Chen", role: "Internal Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "MW", name: "Marcus Williams", role: "Senior Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "SR", name: "Sofia Rodriguez", role: "Compliance Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "DT", name: "David Thompson", role: "Quality Manager", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "AK", name: "Aisha Khan", role: "Process Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
  { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", tags: ["Purchasing", "Design", "Calibration", "Production", "Training"] },
];

const Auditors: React.FC = () => {
  return (
    <div className="audit-container">
      <div className="audit-header">
        <div className="title">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5a3dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <h2>ISO 9001:2015</h2>
        </div>
        <span className="assignments">35 assignments</span>
      </div>

      <div className="auditor-grid">
        {auditors.map((auditor, index) => (
          <div className="auditor-card" key={index}>
            <div className="auditor-info">
              <div className="avatar">{auditor.initials}</div>
              <div>
                <h3>{auditor.name}</h3>
                <p>{auditor.role}</p>
              </div>
            </div>
            <div className="tag-list">
              {auditor.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auditors;
