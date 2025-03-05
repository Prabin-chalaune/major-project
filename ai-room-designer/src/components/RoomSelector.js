import React, { useState, useEffect } from "react";
import MultipleSelectPlaceholder from "./MultipleSelectPlaceholder";
import jsPDF from "jspdf";

const API_BACKEND = "http://127.0.0.1:8000"

const RoomSelector = ({ setSelectedRoom }) => {
  const [loading, setLoading] = useState(false);
  const [generatedRooms, setGeneratedRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const fetchGeneratedDesigns = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BACKEND}/api/model/`); // Assuming this endpoint returns the first 8 designs
      const data = await response.json();

    setGeneratedRooms(data.map(room => ({
      image: `${API_BACKEND}${room.room_image_url}`
      }
    )));
    }
     catch (error) {
      console.error("Error fetching room designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDesigns = async () => {
    if (selectedRooms.length === 0) {
      alert("Please select at least one room type.");
      return;
    }

    setLoading(true);

    let SelectedRooms=selectedRooms.split(" ")[0].toLowerCase();

    try {
      const response = await fetch(`${API_BACKEND}/api/model/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ room_type : SelectedRooms }),
      });
      const data = await response.json();
      console.log(data)


      if (data.room_image_url) {
        setGeneratedRooms([{ image : `${API_BACKEND}${data.room_image_url}` }]);
        console.log(data.room_image_url)
      }
    } catch (error) {
      console.error("Error generating room designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!enlargedImage) return;
    const doc = new jsPDF();
    doc.text("Room Design Details", 10, 10);
    doc.addImage(enlargedImage, "JPEG", 10, 20, 180, 100);
    doc.text("Furniture: Sofa, Table, Chair", 10, 130);
    doc.text("Dimensions: 12ft x 14ft", 10, 140);
    doc.save("room-design.pdf");
  };

  useEffect(() => {
    fetchGeneratedDesigns(); // This will load the designs when the page loads
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col mx-auto py-8 px-4 sm:px-8 lg:px-28">
      <div className="flex flex-col sm:flex-row justify-around gap-8 w-full bg-white rounded-xl p-6 sm:p-8 lg:p-12 mb-8">
        <div className="text-section flex-1 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
            Create Your Perfect Room with AI
          </h2>
          <p className="text-sm sm:text-lg text-gray-600">
            Use the power of AI to generate beautifully designed rooms. Simply
            choose the room type and let us work our magic.
          </p>
        </div>

        <div className="room-selector flex-1 mt-6 sm:mt-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Select Your Room
          </h3>
          <MultipleSelectPlaceholder
            onRoomSelect={(rooms) => setSelectedRooms(rooms)}
          />
          <button
            onClick={handleGenerateDesigns}
            className="mt-6 sm:mt-8 ml-2 bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Generate Designs
          </button>
        </div>
      </div>

      {/* Room Design Generated Section */}
      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Here's Your AI-Generated Room Designs:
        </h2>

        {loading && (   //Loader when generating
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-gray-500">Generating your dream room designs...</p>
          </div>
        )}


        {!loading && generatedRooms.length > 0 && (  // for displaying generated image
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {generatedRooms.map((room, index) => (
              <div
                key={index}
                className="room-card rounded-lg p-4 flex flex-col items-center cursor-pointer"
                onClick={() => setEnlargedImage(room.image)}
              >
                <img
                  src={room.image}
                  alt={`Generated Room ${index + 1}`}
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        )}

        {enlargedImage && (   //for When click on particular image -Zoom in and download option
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative">
              <button
                className="absolute top-4 right-4 text-white p-2 rounded-sm"
                onClick={() => setEnlargedImage(null)}
              >
                ❌
              </button>
              <img
                src={enlargedImage}
                alt="Enlarged Room"
                className="w-[80vw] h-[80vh] object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={handleDownloadPDF}
                className="absolute bottom-4 left-4 bg-green-500 text-white py-2 px-4 rounded-sm shadow-md hover:bg-green-600"
              >
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSelector;
