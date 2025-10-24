import { useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Procedures.css";

interface AuditProps {
  progress?: number; // Progress percentage (0-100)
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
}

interface Standard {
  id: number;
  title: string;
  description: string;
}

const Procedures: FC<AuditProps> = ({ progress = 25 }) => {
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

  // Standards Data
  const [standards] = useState<Standard[]>([
    { id: 1, title: "SOP-001: Document Control", description: "Procedure for managing controlled documents and records" },
    { id: 2, title: "SOP-002: Correative Action", description: "Process for handling nonconformities and corrective action" },
    { id: 3, title: "SOP-003: Internal Audits", description: "Guidelines for conducting internal quality audits" },
    { id: 4, title: "SOP-004: Supplier Evaluation", description: "Process for evaluating and approving suppliers" },
    { id: 5, title: "SOP-005: Change Management", description: "Procedure for managing engineering and process changes"},
    { id: 6, title: "SOP-006: Risk Assessment", description:"Process for identifying itigating operational risk"},
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);


  // Search query for areas
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Checklist toggle
  const toggleChecklist = (key: string) => {
    setChecklistItems((prev) =>
      prev.map((it) => (it.key === key ? { ...it, isActive: !it.isActive } : it))
    );
  };

  // Select standard toggle
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleNextStep = () => {
    setLocalProgress((p) => Math.min(100, p + 25));
  };

  return (
    <div className="audit">
      {/* Sidebar */}
      <aside className="checklist-sidebar">
        {checklistItems.map((item) => (
          <div
            key={item.key}
            className={`checklist-item ${item.isActive ? "active" : ""}`}
            onClick={() => toggleChecklist(item.key)}
            role="button"
            tabIndex={0}
            onKeyDown={() => toggleChecklist(item.key)}
          >
            <div className={`circle ${item.isActive ? "filled" : ""}`} />
            <span className="label">{item.label}</span>
            <button type="button" className="menu" aria-label={`menu-${item.key}`}>
              ...
            </button>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
            <span className="step-text">Step 4: Procedures </span>
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
                     <span>0</span> 
                     <span>Auditors</span> 
                    </div> 
            </button>
            <button type="button" className="stat-btn areas">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 21V3h18v18H3z" />
                   <path d="M9 3v18M3 9h18" /> 
                </svg> 
                    <div className="text">
                        <span>0</span>
                        <span>Areas</span> 
                    </div>
            </button>
            <button type="button" className="stat-btn standards">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                   <path d="M7 7h10M7 12h10M7 17h10" />
                </svg> 
                <div className="text">
                    <span>0</span>
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
                    <span>0</span> 
                    <span>Records</span> 
                </div> 
            </button> 
            </div>

        {/* Section Title */}
        <div className="icon-text">
          <h2>Select Procedures</h2>
          <p>Choose relevant procedures for verification</p>
        </div>

        <div className="Audit-Areas" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div className="icon"> 
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list w-5 h-5 text-orange-600"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg> 
                </div> 
                <h3>Procedures</h3>
                <span>{selectedIds.length} selected</span>
                </div> 
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => setSelectedIds([])}
                    aria-label="clear-selected-standards"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width="18" height="18"> 
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> 
                    </svg> 
                    <span>Clear</span> 
                  </button>
                )}
        </div>

               {/* Search box */} 
               <div className="search-box"> 
                <div className="text"> 
                    <input type="text" placeholder="Search audit areas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> 
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 7.5 7.5a7.5 7.5 0 0 0 9.15 9.15z"/> 
                    </svg> 
                </div>
               </div>     

        {/* Standards Grid */}
        <div className="standards-container">
          {standards.map((std) => (
            <div
              key={std.id}
              className={`standard-card ${selectedIds.includes(std.id) ? "selected" : ""}`}
              onClick={() => toggleSelect(std.id)}
              role="button"
              tabIndex={0}
              onKeyDown={() => toggleSelect(std.id)}
            >
              <div className="standard-content">
                <h3>{std.title}</h3>
                <p>{std.description}</p>
              </div>
              <div className="check-icon">
                {selectedIds.includes(std.id) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#9b5de5" />
                    <path d="M9 12l2 2 4-4" stroke="#9b5de5" />
                  </svg>
                )}
              </div>
            </div>
          ))}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
              </svg>
              Preview
            </button>

            <button className="next-button" onClick={handleNextStep}>
              Next Step
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

export default Procedures;
