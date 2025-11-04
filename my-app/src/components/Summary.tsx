import { useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Summary.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Sidebar.css";
import StatButtons from "../components/StatButtons ";
import "../styles/navbar-progress.css";

interface SummaryValues {
  auditors: number;
  areas: number;
  standards: number;
  procedures: number;
  records: number;
}

interface AuditProps {
  progress?: number;
  values?: SummaryValues;
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
  count? : number;
}

const Summary: FC<AuditProps> = ({ progress = 100 }) => {
  // Checklist state (sidebar)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true ,count: 0 },
    { label: "Areas", key: "areas", isActive: false ,count: 0},
    { label: "Standards", key: "standards", isActive: false ,count: 0},
    { label: "Procedures", key: "procedures", isActive: false ,count: 0},
    { label: "Records", key: "records", isActive: false ,count: 0},
    { label: "Summary", key: "summary", isActive: false ,count: 0},
  ]);

  const [localProgress, setLocalProgress] = useState<number>(progress);
  const navigate = useNavigate();
const [summaryValues] = useState<SummaryValues>({
  auditors: Math.floor(Math.random() )  ,    
  areas: Math.floor(Math.random() ) ,        
  standards: Math.floor(Math.random() ) ,    
  procedures: Math.floor(Math.random()) ,   
  records: Math.floor(Math.random() )      
});


  // ✅ Total count
  const totalCount =
    summaryValues.auditors +
    summaryValues.areas +
    summaryValues.standards +
    summaryValues.procedures +
    summaryValues.records;

  // Checklist toggle
  const toggleChecklist = (key: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  function handleNextStep() {
    navigate("/Dashboard");
  }

  const auditors = [
    {
      initials: "SJ",
      name: "Sarah Johnson",
      role: "Lead Auditor",
      standards: ["ISO 9001", "AS 9100D"],
    },
    {
      initials: "RP",
      name: "Rajesh Patel",
      role: "Quality Auditor",
      standards: ["ISO 13485", "ISO 14001"],
    },
  ];

  return (
    <div className="Summary">
      {/* Sidebar */}
      <Sidebar checklistItems={checklistItems} toggleChecklist={toggleChecklist} />

      {/* Main Content */}
      <main className="Summary-container" style={{ flex: 1 }}>
        {/* Header */}
        <div className="Summary-header">
          <div
            className="Summary-header-content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>

            <div
              className="Summary-header-left"
              style={{ display: "flex", alignItems: "center", gap: 12 }}>
                
              <div className="Summary-icon" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                  <path d="M20 3v4" />
                  <path d="M22 5h-4" />
                  <path d="M4 17v2" />
                  <path d="M5 18H3" />
                </svg>
              </div>
              <div className="Summary-text">
                <h1 className="Summary-title">Create Audit Checklist</h1>
                <p className="Summary-subtitle">Configure your audit parameters</p>
              </div>
            </div>

            <div
              className="Summary-header-right"
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <button type="button" className="Summary-dashboard-btn" onClick={handleDashboardClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#69f450ff"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                  <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                </svg>
                <span style={{color:"#69f450ff"}}>Dashboard</span>
              </button>
              <img
                className="Summary-user-avatar"
                src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="Summary-progress-bar">
          <div className="Summary-line">
            <span className="Summary-step-text">Step 6: Review</span>
            <span className="Summary-progress-text">
              {localProgress}% Complete
            </span>
          </div>
          <div className="Summary-bar-background">
            <div
              className="Summary-bar-fill"
              style={{ width: `${localProgress}%` }}
            />
          </div>
        </div>

        {/* Stat Buttons */}
        <div className="button-container">
          <StatButtons
            // selectedCount={totalCount}
            selectedAuditorCount={summaryValues.auditors}
            selectedAreasCount={summaryValues.areas}
            selectedStandardsCount={summaryValues.standards}
            selectedProceduresCount={summaryValues.procedures}
            selectedRecordsCount={summaryValues.records}
          />
        </div>

        {/* Section Title */}
        <div className="Summary-text">
          <h2>Review & Generate</h2>
          <p>Review your audit configuration before generating the checklist</p>
        </div>

        {/* Main Section */}
        <div className="Summary-main">
          <div className="Summary-main-Scheduled">
            <div className="Summary-main-Calender">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </div>
        <div className="Cal-Info">
  <div>Scheduled Audit Date</div>
  <div>{new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })}
  </div>
  </div>
  </div>
          {/* Summary Boxes */}
          <div className="Summary-Icon-Box">
            {/* Auditors */}
            <div className="summary-box">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4fee77ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <div>0</div>
                <div className="label">Auditors</div>
              </div>
            </div>

            {/* Areas */}
            <div className="summary-box">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3480ebff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                </svg>
                <div>0</div>
                <div className="label">Areas</div>
              </div>
            </div>

            {/* Standards */}
            <div className="summary-box">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b456c5ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <div>0</div>
                <div className="label">Standards</div>
              </div>
            </div>

            {/* Procedures */}
            <div className="summary-box">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#db6565ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                </svg>
                <div>0</div>
                <div className="label">Procedures</div>
              </div>
            </div>

            {/* Records */}
            <div className="summary-box">
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2ed7ccff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                </svg>
                <div>0</div>
                <div className="label">Records</div>
              </div>
            </div>
          </div>

          {/* Assigned Auditors */}
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h2>Assigned Auditors</h2>
          </div>

          <div className="Auditors-card">
            {auditors.map((auditor) => (
              <div key={auditor.initials} className="auditor-card">
                <div className="auditor-initials-wrapper">
                  <div className="auditor-initials">{auditor.initials}</div>
                </div>
                <div className="auditor-standards">
                  {auditor.standards.map((std) => (
                    <span key={std} className="standard-badge">
                      {std}
                    </span>
                  ))}
                </div>
                <div className="auditor-info text-center">
                  <div className="auditor-name">{auditor.name}</div>
                  <div className="auditor-role">{auditor.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <h3>Areas</h3>
              </div>
              <div className="card-body blue-bg">Purchasing</div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Standards</h3>
              </div>
              <div className="card-body purple-bg">ISO 9001:2015</div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Procedures</h3>
              </div>
              <div className="card-body orange-bg">
                SOP-002: Corrective Action
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Records</h3>
              </div>
              <div className="card-body green-bg">
                Form QF-002: Training Record
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="Summary-footer">
          <button className="summary-back" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
          <div className="summary-right">
            <button className="Preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#83f981ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              Preview
            </button>
            <button className="Generate" onClick={handleNextStep}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check w-5 h-5 mr-2"><path d="M20 6 9 17l-5-5"></path></svg>
              Generate Audit Checklist
            </button>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Summary;
