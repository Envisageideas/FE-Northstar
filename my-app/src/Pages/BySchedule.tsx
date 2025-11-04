import React from "react";
import "../styles/Schedule.css";

interface Auditor {
  initials: string;
  name: string;
  role: string;
  areas: number;
  standards: number;
  status: string;
}

interface AuditDay {
  date: string;
  totalAudits: number;
  auditors: Auditor[];
}

const auditData: AuditDay[] = [
  {
    date: "Thursday, October 16, 2025",
    totalAudits: 3,
    auditors: [
      { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", areas: 1, standards: 2, status: "Pending" },
      { initials: "EC", name: "Emily Chen", role: "Internal Auditor", areas: 1, standards: 2, status: "Pending" },
      { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", areas: 1, standards: 2, status: "Pending" },
    ],
  },
  {
    date: "Wednesday, October 22, 2025",
    totalAudits: 4,
    auditors: [
      { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", areas: 2, standards: 1, status: "Pending" },
      { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", areas: 2, standards: 1, status: "Pending" },
      { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", areas: 2, standards: 1, status: "Pending" },
      { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", areas: 2, standards: 1, status: "Pending" },
    ],
  },
];

const AuditSchedule: React.FC = () => {
  return (
    <div className="schedule-container">
      {auditData.map((day, index) => (
        <div key={index} className="audit-day">
          <div className="schedule-header">
            <div className="header-left">
              <span className="schedule-cal-icon">📅</span>
              <h3>{day.date}</h3>
              <span className="schedule-count">{day.totalAudits} audits</span>
            </div>
          </div>

          <div className="schedule-list">
            {day.auditors.map((auditor, idx) => (
              <div key={idx} className="schedule-card">
                <div className="schedule-info">
                  <div className="schedule-avatar">{auditor.initials}</div>
                  <div className="schedule-details">
                    <p className="schedule-name">{auditor.name}</p>
                    <p className="schedule-role">{auditor.role}</p>
                    <div className="schedule-meta">
                      <span className="meta-item">🏢 {auditor.areas} areas</span>
                      <span className="meta-item">📄 {auditor.standards} standards</span>
                    </div>
                  </div>
                </div>
                <div className="schedule-status-btn">{auditor.status}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuditSchedule;
