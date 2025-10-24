import { useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Summary.css";

interface AuditProps {
  progress?: number; // Progress percentage (0-100)
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
}

const Summary: FC<AuditProps> = ({ progress = 25 }) => {
  // Checklist state (sidebar)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true },
    { label: "Areas", key: "areas", isActive: false },
    { label: "Standards", key: "standards", isActive: false },
    { label: "Procedures", key: "procedures", isActive: false },
    { label: "Records", key: "records", isActive: false },
    { label: "Summary", key: "summary", isActive: false },
  ]);

  const [localProgress, setLocalProgress] = useState<number>(progress);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Checklist toggle
  const toggleChecklist = (key: string) => {
    setChecklistItems((prev) =>
      prev.map((it) => (it.key === key ? { ...it, isActive: !it.isActive } : it))
    );
  };

  const handleNextStep = () => {
    setLocalProgress((p) => Math.min(100, p + 25));
  };

  const summaryData = [
    { label: "Auditors", value: 2, icon: "👥", color: "from-green-100 to-green-50" },
    { label: "Areas", value: 2, icon: "🏢", color: "from-blue-100 to-blue-50" },
    { label: "Standards", value: 1, icon: "📄", color: "from-purple-100 to-purple-50" },
    { label: "Procedures", value: 1, icon: "📋", color: "from-orange-100 to-orange-50" },
    { label: "Records", value: 1, icon: "📁", color: "from-teal-100 to-teal-50" },
  ];

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

  // Derived counts for UI (avoid undefined variables)
  const selectedCount = auditors.length;
  const areasCount = summaryData.find((s) => s.label === "Areas")?.value ?? 0;


  
  return (
    <div className="audit">
      {/* Sidebar */}
     <aside className="checklist-sidebar">
  {checklistItems.map((item) => (
    <div
      key={item.key}
      className={`checklist-item ${item.isActive ? "completed" : ""}`}
      onClick={() => toggleChecklist(item.key)}
      role="button"
      tabIndex={0}
      onKeyDown={() => toggleChecklist(item.key)}
    >
      <div className="circle">
        {item.isActive && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="label">{item.label}</span>
      <span className="count">...</span>
    </div>
  ))}
</aside>


      {/* Main Content */}
      <main className="audit-container" style={{ flex: 1 }}>
        {/* Header */}
        <div className="audit-header">
          <div
            className="audit-header-content"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="audit-header-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="audit-icon" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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
              <div className="audit-text">
                <h1 className="audit-title">Create Audit Checklist</h1>
                <p className="audit-subtitle">Configure your audit parameters</p>
              </div>
            </div>

            <div className="audit-header-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button type="button" className="dashboard-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                </svg>
                <span>Dashboard</span>
              </button>
              <img
                className="user-avatar"
                src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="line flex">
            <span className="step-text">Step 6:Review</span>
            <span className="progress-text">{localProgress}% Complete</span>
          </div>
          <div className="bar-background">
            <div className="bar-fill" style={{ width: `${localProgress}%` }} />
          </div>
        </div>

        <div className="button-container"> 
            <button type="button" className="stat-btn auditors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 21v-2a4 4 0 0 0-8 0v2" /> 
                  <circle cx="12" cy="7" r="4" />
                   </svg> 
                    <div className="text">
                     <span>{selectedCount}</span> 
                     <span>Auditors</span> 
                    </div> 
            </button>
            <button type="button" className="stat-btn areas">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 21V3h18v18H3z" />
                   <path d="M9 3v18M3 9h18" /> 
                </svg> 
                    <div className="text">
                        <span>{areasCount}</span>
                        <span>Areas</span> 
                    </div>
            </button>
            <button type="button" className="stat-btn standards">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                   <path d="M7 7h10M7 12h10M7 17h10" />
                </svg> 
                <div className="text">
                    <span>{selectedIds.length}</span>
                    <span>Standards</span>
                </div>
            </button> 
            <button type="button" className="stat-btn procedures">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M7 8h10M7 12h10M7 16h10" />
                </svg> <div className="text">
                     <span>{selectedIds.length}</span> 
                     <span>Procedures</span>
                      </div>
            </button> 
            <button type="button" className="stat-btn records">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> 
                 <path d="M4 4h16v16H4z" /> 
                 <path d="M4 4l8 8 8-8" /> 
                 </svg> 
                <div className="text"> 
                    <span>{selectedIds.length}</span> 
                    <span>Records</span> 
                </div> 
            </button> 
            </div>

        {/* Section Title */}
        <div className="icon-text">
          <h2>Review & Generate</h2>
          <p>Review your audit configuration before generating the checklist</p>
        </div>


      {/* main */}
    <div className="main">
      <div className="Scheduled">
        <div className="Calender">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>
        </div>
        <div className="Cal-Info">
          <div> Scheduled Audit Date </div>
          <div> Friday, October 24th, 2025</div>
        </div>
      </div>

      {/* Summary Boxes */}
      <div className="Icon-Box">
        {summaryData.map((item) => (
          <div key={item.label} className={`summary-box ${item.color}`}>
            <div className="icon">{item.icon}</div>
            <div className="value">{item.value}</div>
            <div className="label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Assigned Auditors */}
      <div className="Auditor.text">
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38d08f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M9 21v-2a4 4 0 0 1 3-3.87"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h2>Assigned Auditors</h2>
        </div>

        <div className="Auditors-card">
              {auditors.map((auditor) => (
            <div key={auditor.initials} className="auditor-card">
      
      {/* Auditor Initials */}
      <div className="auditor-initials-wrapper">
        <div className="auditor-initials">
          {auditor.initials}
        </div>
      </div>

      {/* Auditor Standards */}
      <div className="auditor-standards">
        {auditor.standards.map((std) => (
          <span key={std} className="standard-badge">{std}</span>
        ))}
      </div>

      {/* Auditor Name & Role */}
      <div className="auditor-info text-center">
        <div className="auditor-name">{auditor.name}</div>
        <div className="auditor-role">{auditor.role}</div>
      </div>
      </div>
      ))}
      </div>
      </div>

    <div className="card-grid">
      {/* Areas */}
      <div className="card">
        <div className="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building w-5 h-5 text-blue-600"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
          <h3>Areas</h3>
        </div>
        <div className="card-body blue-bg">Purchasing</div>
      </div>

      {/* Standards */}
      <div className="card">
        <div className="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-5 h-5 text-purple-600"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
          <h3>Standards</h3>
        </div>
        <div className="card-body purple-bg">ISO 9001:2015</div>
      </div>

      {/* Procedures */}
      <div className="card">
        <div className="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list w-5 h-5 text-orange-600"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
          <h3>Procedures</h3>
        </div>
        <div className="card-body orange-bg">
          SOP-002: Corrective Action
        </div>
      </div>

      {/* Records */}
      <div className="card">
        <div className="card-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder w-5 h-5 text-teal-600"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
          <h3>Records</h3>
        </div>
        <div className="card-body green-bg">
          Form QF-002: Training Record
        </div>
      </div>
    </div>
    </div>



              
        {/* Footer */}
        <div className="footer">
          <button className="back">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="right-footer">
            <button className="Preview">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
             <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
             <path d="M20 3v4"></path>
             <path d="M22 5h-4"></path>
             <path d="M4 17v2"></path>
             <path d="M5 18H3"></path>
             </svg>
              Preview
            </button>

            <button className="next-button" onClick={handleNextStep}>
              Generate Audit Checklist
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Summary;

