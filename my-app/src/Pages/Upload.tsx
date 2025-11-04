import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import "../styles/Upload.css"; // CSS file given below


interface UploadModalProps {
  onClose: () => void; // 🔹 Add this
}

const UploadModal: React.FC<UploadModalProps> = ({onClose}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    console.log("Uploading files:", files);
    alert(`Pretend-uploaded ${files.length} file(s).`);
    setFiles([]);
    onClose();
  };

  const handleCancel =() => {
    setFiles([]);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="upload-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Upload Documents</h2>
        <p>Upload procedures, records, or other audit-related documents</p>

        <div
          className={`dropzone ${dragActive ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15a4 4 0 0 0-3.9-3.998A5 5 0 0 0 7 11.2 4 4 0 0 0 7 19h13z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 3v10M8 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="drop-text">Drop files here or click to browse</p>
          <p className="drop-subtext">
            Supports PDF, DOC, DOCX, XLS, XLSX files
          </p>
          <button
            className="select-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Files
          </button>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <div className="file-list">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  {file.name}
                  <span onClick={() => removeFile(index)} className="remove">
                    ×
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button className="upload-1" onClick={handleUpload}>Upload Files</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
