import React from "react";
import "../styles/Area.css";

interface Auditor {
  initials: string;
  name: string;
  role: string;
  standards: string[];
}

const auditors: Auditor[] = [
  { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "EC", name: "Emily Chen", role: "Internal Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "MW", name: "Marcus Williams", role: "Senior Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "SR", name: "Sofia Rodriguez", role: "Compliance Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "DT", name: "David Thompson", role: "Quality Manager", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "AK", name: "Aisha Khan", role: "Process Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
  { initials: "EC", name: "Emily Chen", role: "Internal Auditor", standards: ["ISO 9001:2015", "ISO 14001", "ISO 13485:2016", "AS 9100D"] },
];

const Purchasing: React.FC = () => {
  return (
    <div className="purchasing-container">
      <div className="purchasing-header">
        <div className="header-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon"
          >
            <path d="M3 3h18v18H3z" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
          </svg>
          <h2>Purchasing</h2>
        </div>
        <button className="assignments-btn">35 assignments</button>
      </div>

      <div className="auditor-grid">
        {auditors.map((auditor, index) => (
          <div key={index} className="auditor-card">
            <div className="auditor-avatar">{auditor.initials}</div>
            <div className="auditor-info">
              <h3>{auditor.name}</h3>
              <p>{auditor.role}</p>
              <div className="auditor-tags">
                {auditor.standards.map((std, i) => (
                  <span key={i} className="tag">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchasing;
