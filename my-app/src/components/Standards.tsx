import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Standards.css";
import "../styles/Sidebar.css";
import "../styles/navbar-progress.css";
import Sidebar from "../components/Sidebar";
import Stat_btn from "../components/Stat_btn";

interface AuditProps {
  progress?: number;
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
  count?: number;
}

interface Standard {
  id: number;
  title: string;
  description: string;
}

const standards: Standard[] = [
  { id: 1, title: "ISO 9001:2015", description: "Quality Management Systems standard" },
  { id: 2, title: "ISO 14001", description: "Environmental Management Systems standard" },
  { id: 3, title: "ISO 13485:2016", description: "Medical devices quality management standard" },
  { id: 4, title: "AS 9100D", description: "Aerospace quality management standard" },
];

const Standards: FC<AuditProps> = ({ progress = 50 }) => {
  const navigate = useNavigate();
  const [selectedStandards, setSelectedStandards] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [localProgress] = useState<number>(progress);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true, count: 0 },
    { label: "Areas", key: "areas", isActive: false, count: 0 },
    { label: "Standards", key: "standards", isActive: true, count: 0 },
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
    setSelectedStandards((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((stdId) => stdId !== id)
        : [...prev, id];

      // Update count in checklist for Standards
      setChecklistItems((prevItems) =>
        prevItems.map((item) =>
          item.key === "standards" ? { ...item, count: updated.length } : item
        )
      );

      // const newProgress = 50 + updated.length * 10;
      // setLocalProgress(Math.min(newProgress, 100));

      return updated;
    });
  };

  const handleClear = () => {
    setSelectedStandards([]);
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.key === "standards" ? { ...item, count: 0 } : item
      )
    );
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleNextStep = () => {
    if (selectedStandards.length === 0) return;
    // const nextProgress = Math.min(localProgress + 100 / 6, 100);
    // setLocalProgress(nextProgress);
    navigate("/Procedures");
  };

  const filteredStandards = standards.filter((std) =>
    std.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="audit_Standards">
      {/* Sidebar */}
      <Sidebar checklistItems={checklistItems} toggleChecklist={toggleChecklist} />

      <main className="audit_Standards-container" style={{ flex: 1 }}>
        {/* Header */}
        <div className="audit_Standards-header">
          <div className="audit_Standards-header-content flex-between">
            <div className="audit_Standards-header-left flex gap-3">
              <div className="audit_Standards-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              </div>
              <div>
                <h1 className="audit_Standards-title">Create Audit Checklist</h1>
                <p className="audit_Standards-subtitle">Configure your audit parameters</p>
              </div>
            </div>

            <div className="audit_Standards-header-right flex gap-3">
              <button className="audit_Standards-dashboard-btn" onClick={handleDashboardClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2">
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
          <div className="line flex-between">
            <span className="step-text">Step 3: Standards</span>
            <span className="progress-text">{Math.round(localProgress)}% Complete</span>
          </div>
          <div className="bar-background">
            <div className="bar-fill transition-all" style={{ width: `${localProgress}%` }} />
          </div>
        </div>

        {/* Stat Buttons */}
        <Stat_btn selectedStandardsCount={selectedStandards.length} />

        {/* Standards Header */}
        <div className="audit_Standards-Areas flex items-center gap-3">
          <h3>Quality Standards</h3>
          <span>{selectedStandards.length} selected</span>
          {selectedStandards.length > 0 && (
            <button type="button" className="delete-btn" onClick={handleClear}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" stroke="currentColor" fill="none" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Search Box */}
        <div className="audit_Standards-search-box relative">
          <input
            type="text"
            placeholder="Search standards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 7.5 7.5a7.5 7.5 0 0 0 9.15 9.15z" />
          </svg>
        </div>

        {/* Standards Grid */}
        <div className="audit_Standard-container">
          {filteredStandards.map((std) => {
            const isSelected = selectedStandards.includes(std.id);
            return (
              <div
                key={std.id}
                onClick={() => toggleSelect(std.id)}
                className={`standard-card ${isSelected ? "selected" : ""}`}
              >
                <div className="audit_Standards-content">
                  <h3>{std.title}</h3>
                  <p>{std.description}</p>
                </div>
                {isSelected && (
                  <div className="audit_Standards-check-icon animate-fadeIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#9b5de5" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="audit_Standards-footer">
          <button className="audit_Standards-back" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="audit_Standards-right-footer">
            <button className="audit_Standards-Preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#83f981ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              Preview</button>

            <button
              className={`audit_Standards-next-button ${selectedStandards.length === 0 ? "disabled" : ""}`}
              disabled={selectedStandards.length === 0}
              onClick={handleNextStep}
            >
              Next Step
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Standards;
