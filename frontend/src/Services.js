import React, { useState } from 'react';

const AppointmentModal = ({ isOpen, closeModal, title }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      date,
      symptoms,
      title,
    };

    // Send data to backend API using fetch or axios
    try {
      const response = await fetch('https://doctor-consultation-backend.onrender.com/api/book-appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //const data = await response.json();
      if (response.ok) {
        alert('Appointment booked successfully!');
      } else {
        alert('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    closeModal(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <button onClick={closeModal} className="absolute top-2 right-2 text-red-600">
          X
        </button>
        <h2 className="text-2xl font-semibold mb-4">Book an Appointment: {title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Preferred Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="symptoms" className="block text-gray-700">Symptoms</label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const services = [
    { title: 'Respiratory Consultation', description: 'Consult with an expert if you have respiratory issues such as asthma, bronchitis, or other lung-related conditions.' },
    { title: 'Cardiology Consultation', description: 'Get expert advice for heart conditions, high blood pressure, and other cardiovascular health issues.' },
    { title: 'Neurology Consultation', description: 'Consult with a neurologist for conditions such as migraines, epilepsy, and other neurological disorders.' },
    { title: 'Pediatric Consultation', description: 'Consult with pediatricians for the health and wellbeing of your child, from infants to teenagers.' },
    { title: 'General Checkup', description: 'A comprehensive health checkup to ensure your overall health is in good condition.' },
  ];

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-gray-50 py-10">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="sm:text-5xl text-4xl font-medium title-font text-gray-900" id="2">Our Services</h1>
          <p className="text-lg text-gray-600 mt-2">Explore the different consultations we offer and book your appointment.</p>
        </div>
        <div className="flex flex-wrap justify-center -m-4">
          {services.map((service, index) => (
            <div key={index} className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg bg-white shadow-lg border-2 border-gray-300 flex flex-col relative overflow-hidden hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  className="bg-indigo-600 text-white py-2 px-6 rounded-full self-start hover:bg-indigo-700 focus:outline-none transition-colors"
                  onClick={() => openModal(service.title)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AppointmentModal isOpen={isModalOpen} closeModal={closeModal} title={modalTitle} />
    </section>
  );
};

export default Services;
