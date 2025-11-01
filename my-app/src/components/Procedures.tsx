import { useState, type FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Procedures.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/Sidebar.css";
import Stat_btn from "../components/Stat_btn";
import "../styles/navbar-progress.css";

interface AuditProps {
  progress?: number; // Progress percentage (0–100)
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
  count?: number;
}

interface Procedure {
  id: number;
  title: string;
  description: string;
}

const proceduresList: Procedure[] = [
  {
    id: 1,
    title: "SOP-001: Document Control",
    description: "Procedure for managing controlled documents and records",
  },
  {
    id: 2,
    title: "SOP-002: Corrective Action",
    description: "Process for handling nonconformities and corrective actions",
  },
  {
    id: 3,
    title: "SOP-003: Internal Audits",
    description: "Guidelines for conducting internal quality audits",
  },
  {
    id: 4,
    title: "SOP-004: Supplier Evaluation",
    description: "Process for evaluating and approving suppliers",
  },
  {
    id: 5,
    title: "SOP-005: Change Management",
    description: "Procedure for managing engineering and process changes",
  },
  {
    id: 6,
    title: "SOP-006: Risk Assessment",
    description: "Process for identifying and mitigating operational risks",
  },
];

const Procedures: FC<AuditProps> = ({ progress = 68 }) => {
  const navigate = useNavigate();
  const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [localProgress,] = useState<number>(progress);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true, count: 0 },
    { label: "Areas", key: "areas", isActive: false, count: 0 },
    { label: "Standards", key: "standards", isActive: false, count: 0 },
    { label: "Procedures", key: "procedures", isActive: true, count: 0 },
    { label: "Records", key: "records", isActive: false, count: 0 },
    { label: "Summary", key: "summary", isActive: false, count: 0 },
  ]);

  // ✅ Toggle Sidebar checklist
  const toggleChecklist = (key: string) => {
    setChecklistItems((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  // ✅ Toggle select/unselect procedures
  const toggleSelect = (id: number) => {
    setSelectedProcedures((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((procId) => procId !== id)
        : [...prev, id];

      setChecklistItems((prevItems) =>
        prevItems.map((item) =>
          item.key === "procedures" ? { ...item, count: updated.length } : item
        )
      );

      // const newProgress = 68 + updated.length * 5;
      // setLocalProgress(Math.min(newProgress, 100));
      return updated;
    });
  };

  // ✅ Clear selected procedures
  // const handleClear = () => {
  //   setSelectedProcedures([]);
  //   setChecklistItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.key === "procedures" ? { ...item, count: 0 } : item
  //     )
  //   );
  // };

  // ✅ Navigation Handlers
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleNextStep = () => {
    if (selectedProcedures.length === 0) return;
    // const nextProgress = Math.min(localProgress + 100 / 6, 100);
    // setLocalProgress(nextProgress);
    navigate("/Records");
  };

  // ✅ Filter search
  const filteredProcedures = proceduresList.filter((proc) =>
    proc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="audit-Pro">
      <Sidebar checklistItems={checklistItems} toggleChecklist={toggleChecklist} />

      <main className="audit-Pro-container" style={{ flex: 1 }}>
        {/* Header */}
        <div className="audit-Pro-header">
          <div className="audit-Pro-header-content flex justify-between items-center">
            <div className="audit-Pro-header-left flex items-center gap-3">
              <div className="audit-Pro-icon" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              </div>
              <div>
                <h1 className="audit-Pro-title">Create Audit Checklist</h1>
                <p className="audit-Pro-subtitle">Configure your audit parameters</p>
              </div>
            </div>

            <div className="audit-Pro-header-right flex items-center gap-3">
              <button type="button" className="dashboard-btn" onClick={handleDashboardClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
        <div className="audit-Pro-progress-bar">
          <div className="audit-Pro-line">
            <span className="audit-Pro-step-text">Step 4: Procedures</span>
            <span className="audit-Pro-progress-text">
              {Math.round(localProgress)}% Complete
            </span>
          </div>
          <div className="audit-Pro-bar-background">
            <div
              className="audit-Pro-bar-fill transition-all duration-500"
              style={{ width: `${localProgress}%` }}
            />
          </div>
        </div>

        {/* Stat Button */}
        <div className="audit-Pro-button-container">
          <Stat_btn selectedProceduresCount={selectedProcedures.length} />
        </div>

        {/* Title */}
        <div className="audit-Pro-icon-text">
          <h2>Select Procedures</h2>
          <p>Choose relevant procedures for verification</p>
        </div>

        {/* Search Box */}
        <div className="audit-Pro-search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input
            type="text"
            placeholder="Search procedures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Procedures List */}
        <div className="audit-Pro-list">
          {filteredProcedures.map((proc) => {
            const isSelected = selectedProcedures.includes(proc.id);
            return (
              <div
                key={proc.id}
                onClick={() => toggleSelect(proc.id)}
                className={`audit-Pro-card ${isSelected ? "selected" : ""}`}
                role="button"
                tabIndex={0}
              >
                <div className="audit-Pro-content">
                  <h3>{proc.title}</h3>
                  <p>{proc.description}</p>
                </div>
                {isSelected && (
                  <div className="audit-Pro-check-icon animate-fadeIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
        <div className="audit-Pro-footer">
          <button className="audit-Pro-footer-back" onClick={() => navigate(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="audit-Pro-footer-right">
            <button className="audit-Pro-footer-right-Preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#83f981ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-5 h-5 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
              Preview</button>

            <button
              className={`audit-Pro-footer-next-button ${
                selectedProcedures.length === 0 ? "disabled" : ""
              }`}
              onClick={handleNextStep}
              disabled={selectedProcedures.length === 0}
            >
              Next Step
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
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
