import { useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/Areas.css";

interface AuditProps {
  progress?: number; // Progress percentage (0-100)
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
}

 interface AuditArea {
  id: number;
  title: string;
  description: string;
}


const Areas: FC<AuditProps> = ({ progress = 25 }) => {
  // Checklist state (sidebar)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true },
    { label: "Areas", key: "areas", isActive: false },
    { label: "Standards", key: "standards", isActive: false },
    { label: "Procedures", key: "procedures", isActive: false },
    { label: "Records", key: "records", isActive: false },
    { label: "Summary", key: "summary", isActive: false },
  ]);
  
  // Local progress so UI can change (if you want to keep it purely controlled remove this)
  const [localProgress, setLocalProgress] = useState<number>(progress);
  // Toggle checklist item active
  function toggleChecklist(key: string) {
    setChecklistItems((prev) => prev.map((it) => (it.key === key ? { ...it, isActive: !it.isActive } : it)));
  }

  // Example Next-Step handler (demo: increases progress)
  function handleNextStep() {
    setLocalProgress((p) => Math.min(25, p + 25));
    // In a real app you'd navigate or validate and save
  }

const auditAreasData: AuditArea[] = [
  { id: 1, title: "Purchasing", description: "Procurement and vendor management activities" },
  { id: 2, title: "Design", description: "Product design and development processes" },
  { id: 3, title: "Calibration", description: "Equipment calibration and measurement control" },
  { id: 4, title: "Production", description: "Manufacturing and assembly operations" },
  { id: 5, title: "Training", description: "Employee training and competency management" },
];

  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSelect = (id: number) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((areaId) => areaId !== id) : [...prev, id]
    );
  };

  const filteredAreas = auditAreasData.filter((area) =>
    area.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            onKeyDown={() => toggleChecklist(item.key)}>
            <div className={`circle ${item.isActive ? "filled" : ""}`} />
            <span className="label">{item.label}</span>
            <button type="button" className="menu" aria-label={`menu-${item.key}`}>
              ...
            </button>
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main className="audit-container" style={{ flex: 1 }}>
        {/* Combined Header Section */}
        <div className="audit-header">
          <div className="audit-header-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="audit-header-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="audit-icon" aria-hidden>
                {/* Fixed SVG attributes for JSX */}
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-6 h-6 text-white">
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
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
                alt="User Avatar"/>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-bar">
          <div className="line flex">
            <span className="step-text">Step 2: Areas</span>
            <span className="progress-text">{localProgress}% Complete</span>
          </div>
          <div className="bar-background">
            <div className="bar-fill"/>
          </div>
        </div>

        {/* Stat Buttons */}
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
              <span>{selectedAreas.length}</span>
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
            </svg>
            <div className="text">
              <span>0</span>
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


  <div className="icon-text">
      <h2>Select Audit Areas</h2>
      <p>Choose the areas to include in this audit</p>
  </div>

  <div className="Audit-Areas" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
        <path d="M9 22v-4h6v4"></path>
        <path d="M8 6h.01"></path>
        <path d="M16 6h.01"></path>
        <path d="M12 6h.01"></path>
        <path d="M12 10h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 10h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 10h.01"></path>
        <path d="M8 14h.01"></path>
        </svg>
      </div>
      <h3>Audit Areas</h3>
      <span>{selectedAreas.length} selected</span>
    </div>
    {selectedAreas.length > 0 && (<button type="button" className="delete-btn" onClick={() => setSelectedAreas([])} style={{ display: "flex", alignItems: "center", gap: "6px", color: "white", border: "none", borderRadius: "6px", padding: "6px 10px", cursor: "pointer",}}>
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

      {/* Grid of audit areas */}
      <div className="select-area">
        {filteredAreas.map((area) => (
          <div
            key={area.id}
            onClick={() => toggleSelect(area.id)}
            className={`cursor-pointer border rounded-xl p-4 transition ${
              selectedAreas.includes(area.id)
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-green-400"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={() => toggleSelect(area.id)}>
            <h4>{area.title}</h4>
            <p>{area.description}</p>
          </div>
        ))}
      </div>
      

      {/* Footer buttons */}
      <div className="footer">
        <button className="back">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="right-footer">
          <button className="Preview">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            Preview
          </button>

          <button className="next-button">
            Next Step
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      </main>
    </div>
  );
};
export default Areas;
