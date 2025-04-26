import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header id="home" className="text-center py-16 bg-blue-500 text-white">
        <h2 className="text-4xl font-bold">Find Your Perfect Scholarship or Internship</h2>
        <p className="mt-4 text-lg">Connecting students with the best opportunities to shape their careers.</p>
      </header>

      {/* Main Content */}
      <div className="content-container">
        <section id="scholarships" className="content-section">
          <img src="images/schloarship.jpg" alt="Scholarship" className="content-image left" />
          <div className="content-text">
            <h3 className="text-3xl font-semibold">Scholarships</h3>
            <p className="mt-4">Browse scholarship opportunities tailored to your academic excellence.</p>
          </div>
        </section>

        <section id="internships" className="content-section">
          <div className="content-text">
            <h3 className="text-3xl font-semibold">Internships</h3>
            <p className="mt-4">Discover internships that match your skills and career aspirations.</p>
          </div>
          <img src="images/internship.jpg" alt="Internship" className="content-image right" />
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4">
        <p>&copy; 2025 Scholarship & Internship Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
