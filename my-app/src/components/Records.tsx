import { useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Records.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Sidebar.css";
import StatButtons  from "../components/StatButtons ";
import "../styles/navbar-progress.css";

import Upload from "../Pages/Upload";


interface AuditProps {
  progress?: number; // Progress percentage (0-100)
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
  count?: number;
}

interface RecordsItem {
  id: number;
  title: string;
  description: string;
}

const RecordsList: RecordsItem[] = [
  { id: 1, title: "Form QF-001: Inspection Report", description: "Quality inspection and verification form" },
  { id: 2, title: "Form QF-002: Training Record", description: "Employee training completion and competency record" },
  { id: 3, title: "Form QF-003: Calibration Certificate", description: "Equipment calibration verification record" },
  { id: 4, title: "Form QF-004: Supplier Evaluation", description: "Supplier performance assessment form" },
  { id: 5, title: "Form QF-005: Nonconformance Report", description: "Document for reporting quality nonconformances" },
  { id: 6, title: "Form QF-006: Audit Checklist", description: "Internal audit verification checklist" },
  { id: 7, title: "Form QF-007: Change Request", description: "Engineering change order form" },
  { id: 8, title: "Form QF-008: Risk Register", description: "Risk identification and mitigation log" },
];

const Records: FC<AuditProps> = ({ progress = 85 }) => {
  const navigate = useNavigate();
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRecordsCount, setSelectedRecordsCount] = useState(0);
  const [localProgress] = useState<number>(progress);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true, count: 0 },
    { label: "Areas", key: "areas", isActive: false, count: 0 },
    { label: "Standards", key: "standards", isActive: false, count: 0 },
    { label: "Procedures", key: "procedures", isActive: false, count: 0 },
    { label: "Records", key: "records", isActive: false, count: 0 },
    { label: "Summary", key: "summary", isActive: false, count: 0 },
  ]);

  const toggleChecklist = (key: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const toggleSelect = (id: number) => {
    setSelectedRecords((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((recordId) => recordId !== id)
        : [...prev, id];

      setChecklistItems((prevItems) =>
        prevItems.map((item) =>
          item.key === "records" ? { ...item, count: updated.length } : item
        )
      );
      setSelectedRecordsCount(updated.length);
      return updated;
    });
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleNextStep = () => {
    navigate("/Summary");
  };

  const filteredRecords = RecordsList.filter((record) =>
    record.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

    const [showUpload, setShowUpload] = useState(false);

  const handleUploadClick = () => {
    setShowUpload(true); // show modal
  };

  const handleCloseUpload = () => {
    setShowUpload(false); // close modal
  };

  return (
    <div className="Records">
      {/* Sidebar */}
      <Sidebar checklistItems={checklistItems} toggleChecklist={toggleChecklist} />

      {/* Main Content */}
      <main className="Records-container" style={{ flex: 1 }}>
        {/* Header */}
        <div className="Records-header">
          <div
            className="Records-header-content"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="Records-header-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="Records-icon" aria-hidden>
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
              <div className="Records-text">
                <h1 className="Records-title">Create Audit Checklist</h1>
                <p className="Records-subtitle">Configure your audit parameters</p>
              </div>
            </div>

            <div className="Records-header-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button type="button" className="Records-dashboard-btn" onClick={handleDashboardClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#69f450ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                  <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                  <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                  <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                </svg>
                <span style={{color:"#69f450ff"}}>Dashboard</span>
              </button>
              <img
                className="Records-user-avatar"
                src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="Records-progress-bar">
          <div className="Records-line">
            <span className="Records-step-text">Step 5: Records</span>
            <span className="progress-text">{localProgress}% Complete</span>
          </div>
          <div className="Records-bar-background">
            <div className="Records-bar-fill" style={{ width: `${localProgress}%` }} />
          </div>
        </div>

        {/* Stat Buttons */}
        <div className="button-container">
          <StatButtons  selectedRecordsCount={selectedRecordsCount} />
        </div>

        {/* Section Title */}
        <div className="Records-icon-text">
          <h2>Select Records</h2>
          <p>Choose records to verify (optional)</p>
        </div>

        {/* Search Box + Upload */}
        <div className="Records-search">
          <div className="Records-search-box">
            <div className="Records-search-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="Records-search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 7.5 7.5a7.5 7.5 0 0 0 9.15 9.15z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="Records-search-input"
              />
            </div>
          </div>
        
        
        <div>
          <button type="button" className="upload-btn" onClick={handleUploadClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0d9488"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 5 17 10" />
          <line x1="12" y1="5" x2="12" y2="19" />
        </svg>
        <span style={{ color: "#0d9488", marginLeft: "6px" }}>Upload</span>
      </button>  
      </div>
      {showUpload && 
      <Upload onClose={handleCloseUpload} />}
        </div>

          <div className="Records-Forms">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
          <h3>Records & Forms</h3>
          <span>{selectedRecords.length} selected</span>
          {selectedRecords.length > 0 && ( 
          <button className="Records-clear-btn" data-testid="button-deselect-Records">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0ee2d1ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="Records-clear-icon">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
             Clear
          </button>
          )}
        </div>

        {/* Records Grid */}
        <div className="Records-container">
          {filteredRecords.map((record) => {
            const isSelected = selectedRecords.includes(record.id);
            return (
              <div
                key={record.id}
                className={`Records-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleSelect(record.id)}
                role="button"
                tabIndex={0}>

                <div className="Records-content">
                  <div style={{width: "40px",height: "40px",backgroundColor: "#ccfbf1",color: "#2a6a40ff", borderRadius: "10px",display: "flex",alignItems: "center",justifyContent: "center",}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-folder w-5 h-5 text-teal-600"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
                    </div>
                    <div>
                  <h3>{record.title}</h3>
                  <p>{record.description}</p>
                  </div>
                  {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="Records-check-icon"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  
                )}
              </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="Records-footer">
          <button className="back" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#222" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="Records-right-footer">
            <button className="Records-Preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#83f981ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              Preview</button>
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

export default Records;
