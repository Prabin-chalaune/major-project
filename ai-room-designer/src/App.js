import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RoomSelector from "./components/RoomSelector";
//import RoomDesign from "./components/Designedroom";
import Homepage from "./components/Homepage";

function App() {
  const [selectedRoom, setSelectedRoom] = useState("");

  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white py-4 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            AI Interior Room Designer
          </h1>
        </header>
        <main className="flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/lable-selection" element={<RoomSelector setSelectedRoom={setSelectedRoom} />} />
            {/* <Route path="/design" element={<RoomDesign selectedRoom={selectedRoom} />} /> */}
          </Routes>
        </main>
        <footer className="bg-gray-50 text-gray-400 py-8">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2025 AI Interior Designer. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;


