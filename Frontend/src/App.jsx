import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Homepage from "./pages/Homepage";
import PollutantExposureSimulator from "./mycomponents/Homepage/Slider";
import ModelViewer from "./mycomponents/Homepage/Model";
import Navbar from "./mycomponents/Homepage/Navbar";
import SensorLoading from "./mycomponents/Homepage/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Loading for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        {/* Animate the loading screen out when conditions are met */}
        <AnimatePresence>
          {(isLoading ) && (
            <motion.div
              key="loading"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-50"
            >
              <SensorLoading />
            </motion.div>
          )}
        </AnimatePresence>
        {(!isLoading ) && (
          <div className="absolute inset-0 transition-opacity duration-1000 opacity-100 z-10">
            <Navbar />
            {/* Add top padding so content isn’t hidden behind the Navbar */}
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/simulator" element={<PollutantExposureSimulator />} />
                <Route path="/model" element={<ModelViewer />} />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
