import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorSection from './doctorSection';
import Header from './Header';
import Footer from './Footer';
import JournalsPublished from './JournalsPublished';
import Services from './Services';
import AchievementsSection from './Achievement';
import NoticeSection from './Notice';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('https://doctor-consultation-backend.onrender.com/api/message');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessage();
  }, [setMessage]); // or just [] if ESLint allows it

  return (
    <div>
      <Header />
      <DoctorSection />
      <NoticeSection />
      <JournalsPublished />
      <Services />
      <AchievementsSection />
      <Footer />
    </div>
  );
};

export default App;
