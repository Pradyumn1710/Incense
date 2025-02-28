import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Loading for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      {/* Spline loads in the background */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Homepage setSplineLoaded={setSplineLoaded} />
      </div>

      {/* Loading Screen (Visible Only When isLoading is true) */}
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl text-gray-200">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
