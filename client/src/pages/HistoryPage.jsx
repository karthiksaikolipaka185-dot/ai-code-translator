import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getHistory, deleteHistoryItem, clearHistory } from '../services/historyService.js';
import HistoryList from '../components/HistoryList.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import OutputPanel from '../components/OutputPanel.jsx';
import './historyPage.css';

const ITEMS_PER_PAGE = 8;

const HistoryPage = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [currentPage]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory(currentPage, ITEMS_PER_PAGE);
      setEntries(data.entries || []);
      setTotalPages(data.pages || 1);
      setTotalEntries(data.total || 0);
    } catch (error) {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (entry) => {
    setSelectedEntry(entry);
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success("Item deleted successfully");
      if (selectedEntry && selectedEntry._id === id) {
        setSelectedEntry(null);
      }
      fetchHistory();
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      try {
        await clearHistory();
        toast.success("History cleared successfully");
        setSelectedEntry(null);
        setCurrentPage(1);
        fetchHistory();
      } catch (error) {
        toast.error("Failed to clear history");
      }
    }
  };

  return (
    <div className="history-container">
      <div className="history-sidebar">
        <div className="sidebar-header">
          <h2>History ({totalEntries})</h2>
          <button 
            className="clear-all-btn" 
            onClick={handleClearAll}
            disabled={entries.length === 0}
          >
            Clear All
          </button>
        </div>
        
        {loading && <div className="loading-state">Loading history...</div>}

        <div className="history-list-wrapper">
          <HistoryList 
            entries={entries} 
            onView={handleView} 
            onDelete={handleDelete} 
          />
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="page-info">{currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="history-content">
        {selectedEntry ? (
          <div className="history-detail">
            <div className="detail-header">
              <div className="detail-meta">
                <span className={`history-type type-${selectedEntry.type}`}>
                  {selectedEntry.type}
                </span>
                <span className="detail-date">
                  {new Date(selectedEntry.createdAt).toLocaleString()}
                </span>
              </div>
              <button 
                className="close-detail-btn" 
                onClick={() => setSelectedEntry(null)}
              >
                ×
              </button>
            </div>
            
            <div className="detail-body">
              <div className="detail-input">
                <h3>Input Code ({selectedEntry.sourceLanguage})</h3>
                <div className="editor-container">
                  <CodeEditor 
                    language={selectedEntry.sourceLanguage} 
                    value={selectedEntry.inputCode} 
                    readOnly={true} 
                  />
                </div>
              </div>
              
              <div className="detail-output">
                <h3>Output</h3>
                <div className="output-container">
                  <OutputPanel 
                    action={selectedEntry.type} 
                    result={selectedEntry.type === 'translate' ? { translatedCode: selectedEntry.output } : selectedEntry.output}
                    targetLanguage={selectedEntry.targetLanguage} 
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="history-placeholder">
            <p>Select a history entry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
