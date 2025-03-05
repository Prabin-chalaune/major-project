import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SideImage from "../assets/SideImage.png"

const Homepage = () => {
    const navigate = useNavigate()
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800"><RoomPreferencesIcon style={{ fontSize: 40, color: 'blue' }}/> Interio Designer</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-600 hover:text-gray-800">Features</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Transform Your Room with AI</h2>
          <p className="text-lg mb-6">
            Instantly design any kind of room with AI-powered interior design.
          </p>
            <button onClick={() => navigate("/lable-selection")} className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-gray-100">
                Getting Started
            </button>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our AI Interior Designer?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">Fast Results</h4>
              <p className="text-gray-600">Get your room designs in seconds using our powerful AI model.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">Customizable</h4>
              <p className="text-gray-600">Tailor designs to your preferences and style.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h4 className="text-xl font-semibold mb-4">Affordable</h4>
              <p className="text-gray-600">Design your room at a fraction of the cost.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-12 rounded-bl-md rounded-br-md">
            <div className="max-w-6xl mx-auto px-0 flex flex-col md:flex-row justify-between items-center gap-24">
                <div className="flex-1 mr-2 text-center md:text-left">
                    <h3 className="text-4xl font-extrabold mb-4 leading-tight">
                        Ready to Decorate Your Room at Lower Cost?
                    </h3>
                    <p className="text-lg font-semibold mb-6 text-teal-100">
                        Explore stunning room designs tailored to your preferences and budget.
                        Transform your space effortlessly!
                    </p>
                </div>

                <div className="flex-1 ml-2">
                <img
                    src={SideImage}
                    alt="Room Decoration"
                    className="w-full max-w-md h-auto rounded-xl transition-transform duration-300 "
                />
                </div>

            </div>
        </section>



    </div>
  );
};

export default Homepage;

