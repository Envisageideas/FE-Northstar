import { useState } from 'react';
import './AuditList.css';

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
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [answerText, setAnswerText] = useState<string>('');

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
      category: '',
      comments: 0,
      attachments: 0,
      section: 'Industry specific'
    },
    {
      id: 4,
      text: "What processes are in place to ensure that infrastructure, equipment, and the work environment are adequate, maintained, and suitable to...",
      status: 'unanswered',
      category: '',
      comments: 0,
      attachments: 0,
      section: 'Leadership meetings'
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
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

  return (
    <div className="audit-container">
      {/* Header */}
      <header className="audit-header">
        <div className="header-left">
          <div className="logo-section">
            <div className="logo-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">AUDITSMART</span>
          </div>
        </div>
        <div className="header-right">
          <div className="user-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" />
            <span className="notification-badge">2</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Boeing</h1>
          <p className="hero-subtitle">
            Quality Management System Audit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft: '8px'}}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </p>
        </div>
        <div className="hero-logo">
          BOEING
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        {question.comments}
                      </span>
                      <span className="meta-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
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
                      <div className="answer-display">
                        <p>{question.answer}</p>
                        {question.answerType && <span className="answer-type-badge">{question.answerType}</span>}
                        <div className="action-buttons">
                          <button className="btn-outline">Upload</button>
                          <button className="btn-outline">Edit</button>
                          <button className="btn-primary">Comment</button>
                        </div>
                      </div>
                    ) : (
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
        <button className="btn-outline-large">Previous</button>
        <button className="btn-primary-large">Next</button>
      </div>

      {/* Floating Action Button */}
      <button className="fab">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </button>
    </div>
  );
};

export default AuditList;