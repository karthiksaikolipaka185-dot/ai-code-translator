import React from 'react';
import './history.css';

const HistoryList = ({ entries, onView, onDelete }) => {
  if (!entries || entries.length === 0) {
    return <div className="history-empty">No history yet</div>;
  }

  return (
    <div className="history-list">
      {entries.map(entry => (
        <div 
          key={entry._id} 
          className="history-item" 
          onClick={() => onView(entry)}
        >
          <div className="history-item-header">
            <span className={`history-type type-${entry.type}`}>{entry.type}</span>
            <button 
              className="delete-btn" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry._id);
              }}
              title="Delete"
            >
              ×
            </button>
          </div>
          <div className="history-item-body">
            {entry.type === 'translate' ? (
              <div className="history-langs">
                {entry.sourceLanguage} → {entry.targetLanguage}
              </div>
            ) : (
              <div className="history-langs">
                {entry.sourceLanguage}
              </div>
            )}
            <div className="history-date">
              {new Date(entry.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
