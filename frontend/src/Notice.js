import React, { useState, useEffect } from 'react';

const NoticeSection = () => {
  const notices = [
    {
      title: "Scheduled Maintenance",
      description: "The server will undergo maintenance on Dec 20th from 12:00 AM to 4:00 AM.",
      date: "2024-12-19",
    },
    {
      title: "New Feature Release",
      description: "We are excited to announce the release of our new feature for doctor profiles.",
      date: "2024-12-18",
    },
    {
      title: "Holiday Announcement",
      description: "The clinic will remain closed on Christmas Day.",
      date: "2024-12-25",
    },
  ];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const nextNotice = () => {
    setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
  };

  const prevNotice = () => {
    setCurrentNoticeIndex((prevIndex) => 
      prevIndex === 0 ? notices.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="notice-section">
      <h2>Latest Notices</h2>
      <div className="notice">
        <h3>{notices[currentNoticeIndex].title}</h3>
        <p><strong>Date:</strong> {notices[currentNoticeIndex].date}</p>
        <p>{notices[currentNoticeIndex].description}</p>
      </div>

      <div className="buttons">
        <button onClick={prevNotice} disabled={currentNoticeIndex === 0}>Prev</button>
        <button onClick={nextNotice} disabled={currentNoticeIndex === notices.length - 1}>Next</button>
      </div>

      <style jsx>{`
        .notice-section {
          width: 80%;
          margin: 20px auto;
          padding: 20px;
          background-color:rgb(153, 145, 145);
          border-radius: 10px;
        }

        .notice-section h2 {
          text-align: center;
          font-size: 2em;
          margin-bottom: 20px;
          color: #333;
        }

        .notice {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          background-color: #fff;
        }

        .notice h3 {
          font-size: 1.6em;
          margin-bottom: 10px;
          color: #333;
        }

        .notice p {
          font-size: 1em;
          color: #555;
        }

        .buttons {
          text-align: center;
          margin-top: 20px;
        }

        .buttons button {
          padding: 12px 25px;
          margin: 0 15px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.1em;
        }

        .buttons button:hover {
          background-color: #45a049;
        }

        .buttons button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .buttons button:focus {
          outline: 2px solid #4CAF50;
        }
      `}</style>
    </div>
  );
};

export default NoticeSection;
