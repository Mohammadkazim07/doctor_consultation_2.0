import React, { useState, useEffect } from 'react';

const Notice = () => {
  const notices = [
    'Get 20% off on your first consultation!',
    'Download our app for easier booking!',
    'Check out our new specialist doctors!',
  ];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [notices.length]); // ✅ Fix for missing dependency error

  const noticeStyle = {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#333',
  };

  return (
    <div style={noticeStyle}>
      <p>{notices[currentNoticeIndex]}</p>
    </div>
  );
};

export default Notice;
