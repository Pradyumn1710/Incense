const SensorLoading = () => {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
        <svg className="w-64 h-32" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
          {/* Input lines (left side) */}
          <g className="input-lines">
            {[0, 1, 2].map((i) => (
              <line
                key={`input-${i}`}
                x1="0"
                y1={20 + i * 40}
                x2="80"
                y2={20 + i * 40}
                stroke="#4A5568"
                strokeWidth="2"
                strokeDasharray="4 4"
              >
                <animate attributeName="x2" values="0; 80" dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </line>
            ))}
          </g>
  
          {/* Sensor circle */}
          <circle cx="120" cy="60" r="20" fill="#4299E1" />
  
          {/* Output graph lines (right side) */}
          <g className="output-graph">
            {[0, 1, 2].map((i) => (
              <polyline
                key={`output-${i}`}
                points={`160,${20 + i * 40} 200,${20 + i * 40} 220,${10 + i * 40} 240,${30 + i * 40}`}
                fill="none"
                stroke="#48BB78"
                strokeWidth="2"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,240;240,240"
                  dur="2s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </polyline>
            ))}
          </g>
        </svg>
        <p className="mt-4 text-lg text-gray-600 animate-pulse">
          Please wait, while it breathes...
        </p>
      </div>
    )
  }
  
  export default SensorLoading
  