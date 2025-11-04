import { useEffect, useRef, useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";


import ByAuditors from "../Pages/ByAuditors";
import ByAreas from "../Pages/ByAreas";
import ByStandard from "../Pages/ByStandard";
import BySchedule from "../Pages/BySchedule";


interface Auditor {
  initials: string;
  name: string;
  role: string;
  assigned: number;
  standards: string[];
}
const AdminDashboard: React.FC= () => {
const [show, setShow] = useState(false);
const [activeTab, setActiveTab] = useState<string | null>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
useEffect(() =>{
  const handleClickOutside = (event: MouseEvent) => {
      if (
        tabContainerRef.current &&
        !tabContainerRef.current.contains(event.target as Node)
      ) {
        setActiveTab(null); // Close tabs if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/"); // Navigate to Audit.tsx
  };

  const auditors: Auditor[] = [
    { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", assigned: 12, standards: ["ISO 9001", "AS 9100D"] },
    { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", assigned: 10, standards: ["ISO 13485", "ISO 14001"] },
    { initials: "EC", name: "Emily Chen", role: "Internal Auditor", assigned: 3, standards: ["ISO 9001", "ISO 14001"] },
    { initials: "MW", name: "Marcus Williams", role: "Senior Auditor", assigned: 2, standards: ["AS 9100D", "ISO 13485"] },
    { initials: "SR", name: "Sofia Rodriguez", role: "Compliance Auditor", assigned: 2, standards: ["ISO 9001", "ISO 13485"] },
    { initials: "DT", name: "David Thompson", role: "Quality Manager", assigned: 4, standards: ["ISO 9001", "ISO 14001"] },
    { initials: "AK", name: "Aisha Khan", role: "Process Auditor", assigned: 2, standards: ["AS 9100D", "ISO 9001"] },
  ];

  

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#38d08f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div 
          style={{      display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#2e7c14ff',
                        backgroundColor: '#58e764ff',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        width: 'fit-content',}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg></div>
          <h1>Admin Dashboard</h1>
        </div>
        <button className="create-btn" onClick={handleCreateClick}>Create New Audit</button>
      </header>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card blue">
          <div className="card-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>
            TOTAL AUDITS
          </div>
          <p className="card-value">0</p>
        </div>

        <div className="card orange">
          <div className="card-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            IN PROGRESS
          </div>
          <p className="card-value">0</p>
        </div>

        <div className="card green">
          <div className="card-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            COMPLETED
          </div>
          <p className="card-value">0</p>
        </div>

        <div className="card gray">
          <div className="card-label">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
            PENDING
          </div>
          <p className="card-value">0</p>
        </div>
      </div>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
        <h2>Quick Stats</h2>
        </div>

        <div className="quick-cards">
          <div className="quick-card blue">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4c94e6ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>
            <span>Total Assignments</span>
            <p>0</p>
          </div>
          <div className="quick-card purple">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>Active Auditors</span>
            <p>0</p>
          </div>
          <div className="quick-card mint">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            <span>Completion Rate</span>
            <p>0%</p>
          </div>
        </div>
      </section>

      {/* Available Auditors */}
<section className="auditors">
      {/* Header Section */}
      <div className="auditor-headers">
        <div className="header-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#58E764"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h2>Available Auditors</h2>
        </div>

        {/* Toggle Button */}
        <button className="show-btn" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {/* Auditor List */}
      {show && (
        <div className="auditor-list">
          {auditors.map((a, index) => (
            <div key={index} className="auditor-cards">
              <div className="auditor-initial">{a.initials}</div>
              <div className="auditor-infos">
                <h3>{a.name}</h3>
                <p className="role">{a.role}</p>
                <p className="assigned">
                  <strong>{a.assigned}</strong> assigned
                </p>
                <div className="standard_s">
                  {a.standards.map((s, i) => (
                    <span key={i} className="standard_s-badge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>

      {/* Audit Assignments */}
    <section className="assignment">
      <div className="icontext">
        <div className="tab-container" ref={tabContainerRef}>
          <div className="tab-header">
            <div className="tab-title">
            <div className="tab-buttons">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#56f87eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <path d="m9 14 2 2 4-4"></path>
              </svg>
              <h2>Audit Assignments</h2>
            </div>
              <button className={`tab ${activeTab === "ByAuditor" ? "active" : ""}`} onClick={() => toggleTab("ByAuditor")}> By Auditor</button>
              <button className={`tab ${activeTab === "ByStandard" ? "active" : ""}`} onClick={() => toggleTab("ByStandard")}> By Standard </button>
              <button className={`tab ${activeTab === "ByArea" ? "active" : ""}`}onClick={() => toggleTab("ByArea")}> By Area </button>
              <button className={`tab ${activeTab === "BySchedule" ? "active" : ""}`} onClick={() => toggleTab("BySchedule")} > By Schedule</button>
            </div>
      <div className="tab-content">
        {activeTab === "ByAuditor" && <ByAuditors />}
        {activeTab === "ByStandard" && <ByStandard />}
        {activeTab === "ByArea" && <ByAreas />}
        {activeTab === "BySchedule" && <BySchedule />}
      </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};
export default AdminDashboard;
