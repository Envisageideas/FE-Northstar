import React from "react";
import "../styles/navbar-progress.css";


interface StatButtonsProps {
  selectedLabel?:string;
  selectedCount: number;
  selectedAuditorCount?:number;
  selectedAreasCount?: number;
  selectedStandardsCount?: number;
  selectedProceduresCount?: number;
  selectedRecordsCount?: number;
}
const StatButtons: React.FC<StatButtonsProps> = ({
  selectedLabel,
  selectedAuditorCount =0,
  selectedAreasCount = 0,
  selectedStandardsCount = 0,
  selectedProceduresCount = 0,
  selectedRecordsCount = 0,
 }) => { 
  
  return (
    <div className="summary-buttons">

            {/* 🔹 Selected item display (from sidebar) */}
      {selectedLabel && (
        <div className="selected-label">
          <span>Selected: {selectedLabel}</span>
        </div>
      )}
      
      {/* Auditors */}
      <button className="summary-btn green">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <div className="label">
          <span className="count">{selectedAuditorCount}</span>
          <span className="text">Auditors</span>
        </div>
      </button>

      {/* Areas */}
      <button className="summary-btn blue">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"></path>
        </svg>
        <div className="label">
          <span className="count">{selectedAreasCount}</span>
          <span className="text">Areas</span>
        </div>
      </button>

      {/* Standards */}
      <button className="summary-btn purple">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8M16 13H8M16 17H8"></path>
        </svg>
        <div className="label">
          <span className="count">{selectedStandardsCount}</span>
          <span className="text">Standards</span>
        </div>
      </button>

      {/* Procedures */}
      <button className="summary-btn orange">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"></path>
        </svg>
        <div className="label">
          <span className="count">{selectedProceduresCount}</span>
          <span className="text">Procedures</span>
        </div>
      </button>

      {/* Records */}
      <button className="summary-btn teal">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
        </svg>
        <div className="label">
          <span className="count">{selectedRecordsCount}</span>
          <span className="text">Records</span>
        </div>
      </button>
    </div>
  );
};
export default StatButtons;
