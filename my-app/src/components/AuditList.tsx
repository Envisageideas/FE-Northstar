import { useState } from 'react';
import '../styles/AuditList.css';
import { useNavigate } from "react-router-dom";


interface Question {
  id: number;
  text: string;
  status: 'answered' | 'partial' | 'unanswered';
  category: string;
  comments: number;
  attachments: number;
  section: string;
  answer?: string;
  answerType?: string;
}

const AuditList = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [, setAnswerText] = useState<string>('');

  const questions: Question[] = [
    {
      id: 1,
      text: "Can you describe the methods used to control externally provided processes, products, or services, and how the organization evaluates and monitors supplier performance on an ongoing basis?",
      status: 'answered',
      category: 'PAR',
      comments: 1,
      attachments: 2,
      section: 'Section 4.1 - 4.4'
    },
    {
      id: 2,
      text: "In what way has the organization determined the needs and expectations of relevant interested parties (such as customers, suppliers, regulators,...and employees), and how is... this information...",
      status: 'answered',
      category: 'OFI',
      comments: 4,
      attachments: 3,
      section: 'QMS-001-2025',
      answer: "Yes. These factors, which include market trends, regulatory requirements, technological changes, organizational culture, and resource capabilities, are regularly monitored and reviewed to ensure they do not hinder but instead support the achievement of the intended results of the management system.",
      answerType: 'CAR'
    },
    {
      id: 3,
      text: "How does top management demonstrate visible commitment to the quality management system, for example through leadership, communication of the quality policy, and... allocation of resources?",
      status: 'unanswered',
      category: '...',
      comments: 0,
      attachments: 0,
      section: 'Industry specific'
    },
    {
      id: 4,
      text: "What processes are in place to ensure that infrastructure, equipment, and the work environment are adequate, maintained, and suitable to...",
      status: 'unanswered',
      category: '...',
      comments: 0,
      attachments: 0,
      section: 'Leadership meetings'
    },
    {
      id: 5,
      text: "",
      status: 'partial',
      category: '...',
      comments: 0,
      attachments: 0,
      section: 'Current version'

    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    if (expandedId !== id) {
      const question = questions.find(q => q.id === id);
      setAnswerText(question?.answer || '');
      setSelectedCategory(question?.answerType || '');
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'answered') {
      return (
        <div className="status-icon answered">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );
    }
    return <div className="status-icon unanswered">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>;
  };

   const handleNextStep = () => {
    navigate("/Audit");
  };

  return (
    <div className="auditList">
      {/* Header */}
      <header className="auditList-header">
        <div className="header-left">
          <div className="logo-section-1">
            <div className="logo-circle-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text-1">AUDITSMART</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-avatar img">
            <img src="https://tse4.mm.bing.net/th/id/OIP.9_MptOLxjJEGSGukPt9FWQHaHa?pid=Api&P=0&h=180" alt="User" />
            <span className="notification-badge"></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section-1">
        <div className="hero-content">
          <h1>Boeing</h1>
          <p className="hero-subtitle">
            Quality Management System Audit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '8px'}}>
              <circle cx="12" cy="12" r="10" fill="#14b8a6" stroke="black" stroke-width="3"/>
              <path d="M12 16v-4M12 8h.01" stroke="black" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </p>
        </div>
        <div className="hero-logo">
        <img alt=".hero-logo img" src="https://static.cdnlogo.com/logos/b/33/boeing.png"/>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Questions Section */}
        <div className="questions-section">
          {/* Filters */}
          <div className="filters-section">
            <div className="filter-dropdown">
              <span>All questions (24)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
            <div className="sort-dropdown">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="Pyramid">
                  <path d="M3 6h18v2H3z" fill="currentColor"/>
                  <path d="M6 10h12v2H6z" fill="currentColor"/>
                  <path d="M9 14h6v2H9z" fill="currentColor"/>           
              </svg>
              <span>Most urgent</span>
            </div>
          </div>

          {/* Questions List */}
          <div className="questions-list">
            {questions.map((question) => (
              <div key={question.id} className={`question-card ${expandedId === question.id ? 'expanded' : ''}`}>
                <div className="question-header" onClick={() => toggleExpand(question.id)}>
                  {getStatusIcon(question.status)}
                  <div className="question-text">{question.text}</div>
                  <div className="question-meta">
                    {question.category && <span className="category-badge">{question.category}</span>}
                    <div className="meta-icons">
                      <span className="meta-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
                          <path d="M16 12C15.87 12.0016 15.7409 11.9778 15.62 11.93C15.4971 11.8781 15.3852 11.8035 15.29 11.7101C15.2001 11.6179 15.1287 11.5092 15.08 11.39C15.0296 11.266 15.0025 11.1338 15 11C15.0011 10.7376 15.1053 10.4863 15.29 10.3C15.3825 10.2033 15.4952 10.1282 15.62 10.0801C15.8031 10.0047 16.0044 9.98535 16.1984 10.0245C16.3924 10.0637 16.5705 10.1596 16.71 10.3C16.8947 10.4863 16.9989 10.7376 17 11C16.9975 11.1338 16.9704 11.266 16.92 11.39C16.8713 11.5092 16.7999 11.6179 16.71 11.7101C16.6166 11.8027 16.5057 11.876 16.3839 11.9258C16.2621 11.9755 16.1316 12.0007 16 12Z" fill="#000000"></path>
                          <path d="M12 12C11.87 12.0016 11.7409 11.9778 11.62 11.93C11.4971 11.8781 11.3852 11.8035 11.29 11.7101C11.2001 11.6179 11.1287 11.5092 11.08 11.39C11.0296 11.266 11.0025 11.1338 11 11C11.0011 10.7376 11.1053 10.4863 11.29 10.3C11.3825 10.2033 11.4952 10.1282 11.62 10.0801C11.8031 10.0047 12.0044 9.98535 12.1984 10.0245C12.3924 10.0637 12.5705 10.1596 12.71 10.3C12.8947 10.4863 12.9989 10.7376 13 11C12.9975 11.1338 12.9704 11.266 12.92 11.39C12.8713 11.5092 12.7999 11.6179 12.71 11.7101C12.6166 11.8027 12.5057 11.876 12.3839 11.9258C12.2621 11.9755 12.1316 12.0007 12 12Z" fill="#000000"></path> 
                          <path d="M8 12C7.86999 12.0016 7.74091 11.9778 7.62 11.93C7.49713 11.8781 7.38519 11.8035 7.29001 11.7101C7.20006 11.6179 7.12873 11.5092 7.07999 11.39C7.0296 11.266 7.0025 11.1338 7 11C7.0011 10.7376 7.10526 10.4863 7.29001 10.3C7.3825 10.2033 7.49516 10.1282 7.62 10.0801C7.80305 10.0047 8.00435 9.98535 8.19839 10.0245C8.39244 10.0637 8.57048 10.1596 8.70999 10.3C8.89474 10.4863 8.9989 10.7376 9 11C8.9975 11.1338 8.9704 11.266 8.92001 11.39C8.87127 11.5092 8.79994 11.6179 8.70999 11.7101C8.61655 11.8027 8.50575 11.876 8.38391 11.9258C8.26207 11.9755 8.13161 12.0007 8 12Z" fill="#000000"></path>
                          <path d="M4.99951 16.55V19.9C4.99922 20.3102 5.11905 20.7114 5.34418 21.0542C5.56931 21.397 5.88994 21.6665 6.26642 21.8292C6.6429 21.9919 7.05875 22.0408 7.46271 21.9698C7.86666 21.8989 8.24103 21.7113 8.53955 21.4301L11.1495 18.9701H12.0195C17.5395 18.9701 22.0195 15.1701 22.0195 10.4701C22.0195 5.77009 17.5395 1.97009 12.0195 1.97009C6.49953 1.97009 2.01953 5.78009 2.01953 10.4701C2.042 11.6389 2.32261 12.7882 2.84125 13.8358C3.35989 14.8835 4.10373 15.8035 5.01953 16.53L4.99951 16.55Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        {question.comments}
                      </span>
                      <span className="meta-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        {question.attachments}
                      </span>
                    </div>
                    <button className="expand-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d={expandedId === question.id ? "M7 14l5-5 5 5z" : "M7 10l5 5 5-5z"}/>
                      </svg>
                    </button>
                  </div>
                </div>

                {expandedId === question.id && (
                  <div className="question-expanded">
                    {question.answer ? (
                      <div>
                        <div className="answer-display">
                              <div>
                            <p>{question.answer}</p>
                            </div>
                            <div>
                              {question.answerType && <p className="answer-type-badge">{question.answerType}</p>}
                          </div>

                        </div>
                        <div className="action-buttons">
                          <button className="btn-outline">Upload</button>
                          <button className="btn-outline">Edit</button>
                          <button className="btn-primary">Comment</button>
                        </div>
                      </div>
                    ) : (
                     <div>
                      <div className="answer-input">
                        <p className="input-label">Save your response with notes, or upload files...</p>
                        <div className="category-pills">
                          {['OFI', 'PAR', 'OBS', 'CAR'].map((cat) => (
                            <button
                              key={cat}
                              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                              onClick={() => setSelectedCategory(cat)}
                            >
                              {cat}
                            </button>
                          ))}
                          
                        </div>
                      </div>
                         
                        <div className="action-buttons">
                          <button className="btn-outline">Upload</button>
                          <button className="btn-primary">Save</button>
                        </div>
                      </div>
                      
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {questions.map((q) => (
            <div key={q.id} className="sidebar-item">
              <span>{q.section}</span>
              <a href="#" className="view-link">View</a>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-actions">
        <button className="btn-outline-large"onClick={() => navigate(-1)}>Previous</button>
        <button className="btn-primary-large" onClick={handleNextStep}>Next</button>
      </div>

      {/* Floating Action Button */}
      <button className="fab">
        <svg width="48" height="48" viewBox="0 0 60 65" fill="currentColor" role="img" aria-label="four point star" >
          <path
    d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z"
    transform="translate(2,20) scale(1.6)"
    fill="black"
    stroke="none"/>
  <path
    d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z"
    transform="translate(28,2) scale(0.75)"
    fill="black"
    stroke="none"/>
        </svg>
      </button>
    </div>
  );
};

export default AuditList;