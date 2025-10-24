import { useState, type FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/Audit.css";

interface AuditProps {
  progress?: number; // Progress percentage (0-100)
}

interface Auditor {
  initials: string;
  name: string;
  role: string;
  standards: string[];
}

interface ChecklistItem {
  label: string;
  key: string;
  isActive: boolean;
}

const initialAuditors: Auditor[] = [
  { initials: "SJ", name: "Sarah Johnson", role: "Lead Auditor", standards: ["ISO 9001", "AS 9100D"] },
  { initials: "RP", name: "Rajesh Patel", role: "Quality Auditor", standards: ["ISO 13485", "ISO 14001"] },
  { initials: "EC", name: "Emily Chen", role: "Internal Auditor", standards: ["ISO 9001", "ISO 14001"] },
  { initials: "MW", name: "Marcus Williams", role: "Senior Auditor", standards: ["AS 9100D", "ISO 13485"] },
  { initials: "SR", name: "Sofia Rodriguez", role: "Compliance Auditor", standards: ["ISO 9001", "ISO 13485"] },
  { initials: "DT", name: "David Thompson", role: "Quality Manager", standards: ["ISO 9001", "ISO 14001"] },
  { initials: "AK", name: "Aisha Khan", role: "Process Auditor", standards: ["AS 9100D", "ISO 9001"] },
];

const Audit: FC<AuditProps> = ({ progress = 25 }) => {
  // Checklist state (sidebar)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    { label: "Auditors", key: "auditors", isActive: true },
    { label: "Areas", key: "areas", isActive: false },
    { label: "Standards", key: "standards", isActive: false },
    { label: "Procedures", key: "procedures", isActive: false },
    { label: "Records", key: "records", isActive: false },
    { label: "Summary", key: "summary", isActive: false },
  ]);
  
    // Auditors and selection state
  const [auditors] = useState<Auditor[]>(initialAuditors);
  const [selectedAuditors, setSelectedAuditors] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  // Local progress so UI can change (if you want to keep it purely controlled remove this)
  const [localProgress, setLocalProgress] = useState<number>(progress);
  // Toggle checklist item active
  function toggleChecklist(key: string) {
    setChecklistItems((prev) => prev.map((it) => (it.key === key ? { ...it, isActive: !it.isActive } : it)));
  }
// Toggle auditor selection by name (unique enough here)
  function toggleAuditor(name: string) {
    setSelectedAuditors((prev) => {
      const next = { ...prev };
      if (next[name]) delete next[name];
      else next[name] = true;
      return next;
    });
  }

  const clearAllSelectedAuditors = () => {
    setSelectedAuditors({});
  };
  
  // Filter auditors by search
  const filteredAuditors = auditors.filter((a) => {
    const s = search.trim().toLowerCase();
    if (!s) return true;
    return (a.name.toLowerCase().includes(s) ||
            a.role.toLowerCase().includes(s) ||
            a.initials.toLowerCase().includes(s) ||
            a.standards.join(" ").toLowerCase().includes(s)
    );
  });
  const selectedCount = Object.keys(selectedAuditors).length;

  // Example Next-Step handler (demo: increases progress)
  function handleNextStep() {
    setLocalProgress((p) => Math.min(25, p + 25));
    // In a real app you'd navigate or validate and save
  }

  const [selected, setSelected] = useState<string>('All Standards');
  const [open, setOpen] = useState<boolean>(false);

  const standards = [
  'All Standards',
  'ISO 9001',
  'ISO 13485',
  'ISO 14001',
  'AS 9100D',
];
  
  const [showStandardsList, setShowStandardsList] = useState(false);
  const [showRolesList, setShowRolesList] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All Roles");
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
  const handleSelect = (role: string) => {
    setSelectedRole(role);
    setShowRolesList(false);
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
            <span className="step-text">Step 1: Auditors</span>
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

        {/* Select Auditors */}
        <section className="Select-Auditors" >
          <div className="Select-Auditors-Container">
              <div className="Auditors-center">
                <h2>Select Auditors</h2>
                <p>Choose one or more auditors to perform this audit</p>
              </div>
          <div className="date">
            <div className="Audit-date">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                 <path d="M8 2v4"></path>
                 <path d="M16 2v4"></path>
                 <rect width={18} height={18} x={3} y={4} rx={2}></rect>
                 <path d="M3 10h18"></path>
              </svg>
              <span>Audit Date:</span>
            </div>
          <div className="calendar-button" style={{ position: "relative", display: "inline-block" }}>
      <button type="button"
        data-testid="button-select-date"
        aria-haspopup="dialog"
        aria-expanded={showCalendar}
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
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",}} >
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width={18} height={18} x={3} y={4} rx={2}></rect>
          <path d="M3 10h18"></path>
        </svg>
        <span>{selectedDate ? selectedDate.toLocaleDateString() : "Select audit date"}</span>
      </button>

      {/* Clear button appears when a date is selected */}
      {selectedDate && (
        <button
          type="button"
          onClick={clearDate}
          style={{ marginLeft: 8, border: '1px solid #e5e7eb', background: '#fff',  padding: '8px 10px', borderRadius: 8, cursor: 'pointer',  fontSize: 13,color: '#374151'}}>
          Clear
        </button>
      )}
      {showCalendar && (
        <div style={{ position: "absolute", top: "110%", left: 0, zIndex: 100 }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            inline/>
        </div>
      )}
    </div>
  </div>
            <div className="Select-Auditors-Header">
              <div className="Search-Filters-Wrapper">
                <div className="Search">
                  <label htmlFor="auditor-search"></label>
                  <div className="Search-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}>
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input id="auditor-search" type="text" placeholder="Search auditors..."
                       value={search}
                      onChange={(e) => setSearch(e.target.value)}/>
                  </div>
                </div>
              


<div className="Filters">
 {/* first Filter */}
     <div style={{ position: "relative", display: "inline-block" }}>
      <button type="button" onClick={() => setShowStandardsList((prev) => !prev)}
        style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #ddd", borderRadius: "10px", padding: "8px 12px", backgroundColor: "#fff", cursor: "pointer", minWidth: "180px", justifyContent: "space-between",}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
         <span style={{ fontSize: "14px", color: "#0b0909ff" }}>{selected}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}
          style={{transform: showStandardsList ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease",}}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {showStandardsList && (
        <ul
          style={{ position: "absolute", top: "100%", left: 0, marginTop: "4px", background: "#fff", border: "1px solid #ddd", borderRadius: "8px", listStyle: "none", padding: "6px 0", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "180px", zIndex: 10, }} >
          {standards.map((item) => (
            <li
              key={item}
              style={{ padding: "8px 12px", cursor: "pointer", transition: "background 0.2s", }}
              onClick={() => {
                setSelected(item);
                setShowStandardsList(false);}}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.backgroundColor = "#1e1d1dff")}
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.backgroundColor = "transparent")}>
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
      style={{ display: "flex",alignItems: "center",  justifyContent: "space-between", gap: "8px", border: "1px solid #ddd", borderRadius: "8px", padding: "8px 12px", backgroundColor: "#fff", cursor: "pointer", minWidth: "180px",}}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
      <span style={{ fontSize: "14px", color: "#333" }}>{selectedRole}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width={18} height={18}
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
</div>
              </div>
            </div>
            {/* Auditor Cards */}
            <div className="Auditor-Cards">
              {selectedCount > 0 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                  <button type="button" onClick={clearAllSelectedAuditors}
                    style={{ background: '#fff', border: '1px solid #f87171', color: '#b91c1c', padding: '8px 12px', borderRadius: 8, cursor: 'pointer'}}>
                    Deselect All
                  </button>
                </div>
              )}
              {filteredAuditors.map((auditor, index) => {
                const isSelected = !!selectedAuditors[auditor.name];
                return (
                  <div
                    key={auditor.name + index}
                    className={`Auditor-Card ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleAuditor(auditor.name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => toggleAuditor(auditor.name)}>
                    <div className="initials">
                      {auditor.initials}
                    </div>
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
          </div>
        </section>

        {/* Footer (Preview / Next) */}
        <footer className="footer">
          <button type="button" className="footer-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
              <path d="M20 3v4"></path>
              <path d="M22 5h-4"></path>
              <path d="M4 17v2"></path>
              <path d="M5 18H3"></path>
            </svg>
            Preview
          </button>

          <div>
            <button  className="next-btn" onClick={handleNextStep} disabled={selectedCount === 0}>
              Next Step →
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
export default Audit;
