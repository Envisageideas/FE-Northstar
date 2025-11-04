import { useState, useEffect, type FC } from "react";
import DatePicker from "react-datepicker";
import { useNavigate,  } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Audit.css";
import Sidebar from "../components/Sidebar";
import "../styles/Sidebar.css";
import StatButtons  from "../components/StatButtons ";
import "../styles/navbar-progress.css";

interface AuditProps {
  progress?: number;
}

interface Auditor {
  initials: string;
  name: string;
  role: string;
  standards: string[];
}

type ChecklistItem = {
  label: string;
  key: string;
  isActive: boolean;
  count: number;
};

const initialAuditors: Auditor[] = [
  { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", standards: ["ISO 9001", "AS 9100D"] },
  { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", standards: ["ISO 13485", "ISO 14001"] },
  { initials: "EC", name: "Emily Chen", role: "Internal Auditor", standards: ["ISO 9001", "ISO 14001"] },
  { initials: "MW", name: "Marcus Williams", role: "Senior Auditor", standards: ["AS 9100D", "ISO 13485"] },
  { initials: "SR", name: "Sofia Rodriguez", role: "Compliance Auditor", standards: ["ISO 9001", "ISO 13485"] },
  { initials: "DT", name: "David Thompson", role: "Quality Manager", standards: ["ISO 9001", "ISO 14001"] },
  { initials: "AK", name: "Aisha Khan", role: "Process Auditor", standards: ["AS 9100D", "ISO 9001"] },
];

const Audit: FC<AuditProps> = ({ progress = 17 }) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedAuditors, setSelectedAuditors] = useState<Record<string, boolean>>({});
  const [selectedAuditorCount, setAuditorCount] = useState(0);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true, count: 0 },
    { label: "Areas", key: "areas", isActive: false, count: 0 },
    { label: "Standards", key: "standards", isActive: false, count: 0 },
    { label: "Procedures", key: "procedures", isActive: false, count: 0 },
    { label: "Records", key: "records", isActive: false, count: 0 },
    { label: "Summary", key: "summary", isActive: false, count: 0 },
  ]);

  const [localProgress, setLocalProgress] = useState<number>(progress);
  const [auditors] = useState<Auditor[]>(initialAuditors);
  const [search, setSearch] = useState<string>("");

  const [selected, setSelected] = useState<string>("All Standards");
  const [showStandardsList, setShowStandardsList] = useState(false);
  const [showRolesList, setShowRolesList] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const standards = ["All Standards", "ISO 9001", "ISO 13485", "ISO 14001", "AS 9100D"];
  const roles = [
    "All Roles",
    "Lead Auditor",
    "Quality Auditor",
    "Internal Auditor",
    "Senior Auditor",
    "Compliance Auditor",
    "Quality Manager",
    "Process Auditor",
  ];

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const clearDate = () => setSelectedDate(null);

  function toggleChecklist(key: string) {
    setChecklistItems((prev) =>
      prev.map((it) => (it.key === key ? { ...it, isActive: !it.isActive } : it))
    );
  }
  useEffect(() => {
    const savedData = localStorage.getItem("auditData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.selectedAuditorCount) setAuditorCount(parsed.selectedAuditorCount);
      if (parsed.selectedAuditors) setSelectedAuditors(parsed.selectedAuditors);
      if (parsed.selectedDate) setSelectedDate(new Date(parsed.selectedDate));
      if (parsed.localProgress) setLocalProgress(parsed.localProgress);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      selectedAuditorCount,
      selectedAuditors,
      selectedDate,
      // localProgress,
    };
    localStorage.setItem("auditData", JSON.stringify(dataToSave));
  }, [selectedAuditorCount, selectedAuditors, selectedDate, localProgress]);

  function toggleAuditor(name: string) {
    setSelectedAuditors((prev) => {
      const next = { ...prev };
      if (next[name]) {
        delete next[name];
      } else {
        next[name] = true;
      }

      const count = Object.keys(next).length;
      setAuditorCount(count);
      setChecklistItems((prev) =>
        prev.map((item) => (item.key === "auditors" ? { ...item, count } : item))
      );
      return next;
    });
  }

  const clearAllSelectedAuditors = () => {
    setSelectedAuditors({});
    setChecklistItems((prev) =>
      prev.map((item) => (item.key === "auditors" ? { ...item, count: 0 } : item))
    );
    setAuditorCount(0);
    setSelectedDate(null);
    setLocalProgress(17);
    // localStorage.clear();
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleNextStep = () => {
    if (selectedDate) {
      const selectedAuditorNames = Object.keys(selectedAuditors);
      const dataToPass = {          
          selectedAuditorNames,
          selectedDate,
          selectedAuditorCount: selectedAuditorNames.length,
          checklistItems,};
          localStorage.setItem("auditData", JSON.stringify({
            ...dataToPass,
            selectedAuditors,
            localProgress
          }));
      navigate("/Areas", { state: {selectedAuditors, selectedAuditorCount, selectedDate }});
    } else {
      toast.error("Please select a date");
      console.log("Date missing");
    }
  };

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    setShowRolesList(false);
  };

  const filteredAuditors = auditors.filter((a) => {
    const s = search.trim().toLowerCase();
    if (selected !== "All Standards" && !a.standards.includes(selected)) return false;
    if (selectedRole !== "All Roles" && a.role !== selectedRole) return false;
    if (!s) return true;
    return (
      a.name.toLowerCase().includes(s) ||
      a.role.toLowerCase().includes(s) ||
      a.initials.toLowerCase().includes(s) ||
      a.standards.join(" ").toLowerCase().includes(s)
    );
  });
  
const { state } = useLocation();
console.log(state?.selectedAuditors);

  return (
    <div className="audit">
      <Toaster position="top-center" />
      <Sidebar checklistItems={checklistItems} toggleChecklist={toggleChecklist} selectedAuditorCount={selectedAuditorCount} />

      <main className="audit-cont" style={{ flex: 1 }}>
        {/* Header */}
        <div className="audit-header">
          <div className="audit-header-content">
            <div className="audit-header-left">
              <div className="audit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          </div>

          <div className="audit-header-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button type="button" className="audit-dashboard-btn" onClick={handleDashboardClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#69f450ff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                <rect width="7" height="5" x="3" y="16" rx="1"></rect>
              </svg>
              <span style={{ color: "#69f450ff" }}>Dashboard</span>
            </button>
            <img
              className="audit-user-avatar"
              src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
              alt="User Avatar"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="line flex">
            <span className="step-text">Step 1: Auditors</span>
            <span className="progress-text">{localProgress}% Complete</span>
          </div>
          <div className="bar-background">
            <div className="bar-fill" style={{ width: `${localProgress}%`, transition: "width 0.6s ease-in-out" }} />
          </div>
        </div>

        {/* Stat Buttons */}
        <div className="button-container">
          <StatButtons  selectedAuditorCount={selectedAuditorCount} />
        </div>

        {/* Auditor Section */}
        <div className="Auditors-center">
          <h2>Select Auditors</h2>
          <p>Choose one or more auditors to perform this audit</p>
        </div>

        {/* Calendar */}
        <div className="date">
          <div className="Audit-date">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" stroke="#6ff19fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width={18} height={18} x={3} y={4} rx={2}></rect>
              <path d="M3 10h18"></path>
            </svg>
            <span>Audit Date:</span>
          </div>

          <div className="calendar-button" style={{ position: "relative", display: "flex" }}>
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                padding: "8px 14px",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span>{selectedDate ? selectedDate.toLocaleDateString() : "Select audit date"}</span>
            </button>

            {selectedDate && (
              <button
                type="button"
                onClick={clearDate}
                style={{
                  marginLeft: 8,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  padding: "8px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#374151",
                }}
              >
                Clear
              </button>
            )}

            {showCalendar && (
              <div style={{ position: "absolute", top: "110%", left: 0, zIndex: 100 }}>
                <DatePicker selected={selectedDate} onChange={handleChange} inline />
              </div>
            )}
          </div>
        </div>

        {/* Filter, Search, and Auditor Cards */}
           
        <div className="Select-Auditors-Header">
          <div className="Search-Filters-Wrapper">
            <div className="Search">
              <label htmlFor="auditor-search"></label>
              <div className="Search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#222"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  id="auditor-search"
                  type="text"
                  placeholder="Search auditors..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="Filters">
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  type="button"
                  onClick={() => setShowStandardsList((prev) => !prev)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    minWidth: "180px",
                    justifyContent: "space-between",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#222"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span style={{ fontSize: "14px", color: "#0b0909ff" }}>{selected}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#222"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    width={18}
                    height={18}
                    style={{
                      transform: showStandardsList ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {showStandardsList && (
                  <ul
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: "4px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      listStyle: "none",
                      padding: "6px 0",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      width: "180px",
                      zIndex: 10,
                    }}>
                    {standards.map((item) => (
                      <li
                        key={item}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                        onClick={() => {
                          setSelected(item);
                          setShowStandardsList(false);
                        }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.backgroundColor = "#f2f2f2")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.backgroundColor = "transparent")
                        }
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Second filter */}
              <div className="dropdown">
                <button
                  type="button"
                  onClick={() => setShowRolesList((prev) => !prev)}
                  style={{ display: "flex",alignItems: "center",  justifyContent: "space-between", gap: "8px", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 12px", backgroundColor: "#fff", cursor: "pointer", minWidth: "180px",}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#222" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}>
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span style={{ fontSize: "14px", color: "#333" }}>{selectedRole}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#222" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}
                    style={{ transform: showRolesList ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease",}}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {showRolesList && (
                  <ul className="dropdown-menu">
                    {roles.map((role) => (
                      <li key={role} onClick={() => handleSelect(role)}
                        style={{ padding: "8px 12px", cursor: "pointer", fontSize: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: role === selectedRole ? "#f5f8fa" : "#fff", color: "#333",}}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.backgroundColor = "#f2f2f2")}
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.backgroundColor =
                            role === selectedRole ? "#f5f8fa" : "#fff")}>
                        {role}
                        {role === selectedRole && (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={16} height={16}>
                              <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedAuditorCount > 0 && (
                <div style={{ width: '100%', display: 'flex', gap:'6px' }}>
                  <button
                    type="button"
                    onClick={clearAllSelectedAuditors}
                    style={{
                      background: '#fff',
                      border: '1px solid #f87171',
                      color: '#b91c1c',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      gap:'10px',
                      cursor: 'pointer'
                    }}>
                    Deselect All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Auditor Cards */}
        <div className="Auditor-Cards">
          {filteredAuditors.map((auditor, index) => {
            const isSelected = !!selectedAuditors[auditor.name];
            return (
              <div
                key={auditor.name + index}
                className={`Auditor-Card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleAuditor(auditor.name)}
                role="button"
                tabIndex={0}
                onKeyDown={() => toggleAuditor(auditor.name)}
              >
                {isSelected && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="#52ef6f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                )}
                <div className="initials">{auditor.initials}</div>
                <div className="auditor-details">
                  <div className="auditor-name">{auditor.name}</div>
                  <div className="auditor-role">{auditor.role}</div>
                  <div className="auditor-standards">
                    {auditor.standards.map((std, i) => (
                      <span key={i} className="standard-tag">
                        {std}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  
        <footer className="audit-footer">
          <button type="button" className="audit-footer-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#83f981ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            Preview
          </button>
          <button className="next-btn" onClick={handleNextStep}>
            Next Step →
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Audit;
