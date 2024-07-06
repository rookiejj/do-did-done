import React, { useState, useEffect } from "react";

const activities = ["기상", "산책", "식사", "운동", "스터디", "간식"];

// 스타일 정의
const styles = `
  .tracker-container {
    padding: 24px;
    max-width: 400px;
    margin: 0 auto;
    background-color: #f9fafb;
    border-radius: 24px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .tracker-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
    color: #1f2937;
  }
  .button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
  .toss-button {
    background-color: #3b82f6;
    color: white;
    font-weight: 500;
    padding: 12px 16px;
    border-radius: 12px;
    border: none;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  .toss-button:hover {
    background-color: #2563eb;
    transform: scale(1.05);
  }
  .card {
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 16px;
  }
  .card-header {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #374151;
  }
  .card-content {
    padding: 16px;
  }
  .activity-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  .activity-item {
    display: flex;
    align-items: center;
    color: #4b5563;
    margin-bottom: 8px;
  }
  .activity-dot {
    width: 8px;
    height: 8px;
    background-color: #3b82f6;
    border-radius: 50%;
    margin-right: 8px;
  }
  .no-activities {
    text-align: center;
    color: #6b7280;
  }
`;

const DailyActivityTracker = () => {
  const [logs, setLogs] = useState({});

  useEffect(() => {
    try {
      const savedLogs = localStorage.getItem("activityLogs");
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } catch (error) {
      console.error("Failed to load logs from localStorage:", error);
    }
  }, []);

  const logActivity = (activity) => {
    const now = new Date();
    const dateKey = now.toISOString().split("T")[0];
    const timeString = now.toTimeString().split(" ")[0];

    setLogs((prevLogs) => {
      const newLogs = {
        ...prevLogs,
        [dateKey]: [
          ...(prevLogs[dateKey] || []),
          `${timeString} - ${activity}`,
        ],
      };
      try {
        localStorage.setItem("activityLogs", JSON.stringify(newLogs));
      } catch (error) {
        console.error("Failed to save logs to localStorage:", error);
      }
      return newLogs;
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="tracker-container">
        <h1 className="tracker-title">일일 활동 추적기</h1>

        <div className="button-grid">
          {activities.map((activity) => (
            <button
              key={activity}
              onClick={() => logActivity(activity)}
              className="toss-button"
            >
              {activity}
            </button>
          ))}
        </div>

        <div>
          {Object.entries(logs).length > 0 ? (
            Object.entries(logs)
              .reverse()
              .map(([date, activities]) => (
                <div key={date} className="card">
                  <div className="card-header">
                    <h2 className="card-title">{date}</h2>
                  </div>
                  <div className="card-content">
                    <ul className="activity-list">
                      {activities.map((activity, index) => (
                        <li key={index} className="activity-item">
                          <span className="activity-dot"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
          ) : (
            <p className="no-activities">아직 기록된 활동이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DailyActivityTracker;
