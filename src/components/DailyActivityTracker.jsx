import React, { useState, useEffect } from "react";

const activities = ["기상", "산책", "식사", "운동", "스터디", "간식"];

const buttonStyle = {
  padding: "10px",
  margin: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  margin: "10px 0",
  padding: "10px",
};

export default function DailyActivityTracker() {
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
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        일일 활동 추적기
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {activities.map((activity) => (
          <button
            key={activity}
            onClick={() => logActivity(activity)}
            style={buttonStyle}
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
              <div key={date} style={cardStyle}>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {date}
                </h2>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  {activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))
        ) : (
          <p>아직 기록된 활동이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
