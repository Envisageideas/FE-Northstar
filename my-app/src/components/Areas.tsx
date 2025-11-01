import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Areas.css";
import "../styles/Sidebar.css";
import "../styles/navbar-progress.css";
import Sidebar from "../components/Sidebar";
import Stat_btn from "../components/Stat_btn";

interface AuditProps {
  progress?: number; // Progress percentage (0–100)
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
  count?: number;
}

interface AuditArea {
  id: number;
  title: string;
  description: string;
}

const auditAreasData: AuditArea[] = [
  { id: 1, title: "Purchasing", description: "Procurement and vendor management activities" },
  { id: 2, title: "Design", description: "Product design and development processes" },
  { id: 3, title: "Calibration", description: "Equipment calibration and measurement control" },
  { id: 4, title: "Production", description: "Manufacturing and assembly operations" },
  { id: 5, title: "Training", description: "Employee training and competency management" },
];

const Areas: FC<AuditProps> = ({ progress = 33 }) => {
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [localProgress, setLocalProgress] = useState<number>(progress);

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
    setSelectedAreas((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((areaId) => areaId !== id)
        : [...prev, id];

 

      // ✅ Update sidebar count
      setChecklistItems((prevItems) =>
        prevItems.map((item) =>
          item.key === "areas" ? { ...item, count: updated.length } : item
        )
      );

      // ✅ Update progress dynamically
      // const newProgress = 33 + updated.length * 10;
      // setLocalProgress(Math.min(newProgress, 100));

      return updated;
    });
  };

  const filteredAreas = auditAreasData.filter((area) =>
    area.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleNextStep = () => {
    if (selectedAreas.length === 0) {
      return;
    }
    navigate("/Standards");
  };

  return (
    <div className="audit_1">
      {/* Sidebar */}
      <Sidebar checklistItems={checklistItems} toggleChecklist={toggleChecklist} />

      {/* Main Content */}
      <main className="audit__container" style={{ flex: 1 }}>
        {/* Header */}
        <div className="audit__header">
          <div className="audit__header-content">
            <div className="audit__header-left">
              <div className="audit__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              </div>
              <div className="audit__text">
                <h1 className="audit__title">Create Audit Checklist</h1>
                <p className="audit__subtitle">Configure your audit parameters</p>
              </div>
            </div>

            <div className="audit__header-right">
              <button type="button" className="audit__dashboard-btn" onClick={handleDashboardClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" strokeWidth={2} fill="none">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span>Dashboard</span>
              </button>
              <img
                className="audit__avatar"
                src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="audit__progress">
          <div className="audit__progress-line">
            <span className="audit__progress-step">Step 2: Areas</span>
            <span className="audit__progress-text">{localProgress}% Complete</span>
          </div>
          <div className="audit__progress-bar">
            <div
              className="audit__progress-fill"
              style={{
                width: `${localProgress}%`,
                transition: "width 0.6s ease-in-out",
              }}
            />
          </div>
        </div>

        {/* Stat Buttons */}
        <div className="button-container">
          <Stat_btn selectedAreasCount={selectedAreas.length} />
        </div>

        {/* Section Header */}
        <div className="audit__section-header">
          <h2>Select Audit Areas</h2>
          <p>Choose the areas to include in this audit</p>
        </div>

        {/* Search Box */}
        <div className="audit__search">
          <div className="audit__search-wrapper">
            <input
              type="text"
              className="audit__search-input"
              placeholder="Search audit areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="audit__search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 7.5 7.5a7.5 7.5 0 0 0 9.15 9.15z" />
            </svg>
          </div>
        </div>

        {/* Grid of Audit Areas */}
        <div className="audit__area-grid">
          {filteredAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.id);
            return (
              <div
                key={area.id}
                onClick={() => toggleSelect(area.id)}
                className={`audit__area-card ${isSelected ? "audit__area-card--selected" : ""}`}
                role="button"
                tabIndex={0}
                onKeyDown={() => toggleSelect(area.id)}
              >
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="audit__area-check-icon"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
                <h4>{area.title}</h4>
                <p>{area.description}</p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="audit__footer">
          <button className="audit__footer-back" onClick={() => navigate(-1)}>
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
            Back
          </button>

          <div className="audit__footer-right">
            <button className="audit__footer-preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#83f981ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
            Preview</button>
            <button
              className={`audit__footer-next ${selectedAreas.length === 0 ? "disabled" : ""}`}
              onClick={handleNextStep}
              disabled={selectedAreas.length === 0}
            >
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

