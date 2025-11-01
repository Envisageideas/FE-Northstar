import React from "react";
import "../styles/Auditors.css";

const AuditorCard: React.FC = () => {
  return (
    <div className="auditor-card-1">
      {/* Header Section */}
      <div className="auditor-header-1">
        <div className="auditor-info-1">
          <div className="avatar-1">SJ</div>
          <div>
            <h3>Sarah Johnson</h3>
            <p>Lead Auditor • 11/10/2025</p>
          </div>
        </div>
        <div className="status-1">Pending</div>
      </div>
      {/* Areas and Standards */}
      <div className="auditor-sections-1">
        <div className="areas-box-1">
          <h4>Areas</h4>
          <div className="tags-1">
            <span>Purchasing</span>
            <span>Design</span>
            <span>Calibration</span>
            <span>Production</span>
            <span>Training</span>
          </div>
        </div>
        

        <div className="standards-box-1">
          <h4>Standards</h4>
          <div className="tags purple-1">
            <span>ISO 9001:2015</span>
            <span>ISO 14001</span>
            <span>ISO 13485:2016</span>
            <span>AS 9100D</span>
          </div>
        </div>
      </div>

      {/* Procedures and Records */}
      <div className="auditor-summary-1">
        <div className="summary-box peach-1">
          <h4>Procedures</h4>
          <p className="count-1">6</p>
          <span>items selected</span>
        </div>
        <div className="summary-box mint-1">
          <h4>Records</h4>
          <p className="count teal-1">8</p>
          <span>items selected</span>
        </div>
      </div>
    </div>
  );
};

export default AuditorCard;
