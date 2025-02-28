"use client"

import { useState } from "react"
import * as Slider from "@radix-ui/react-slider"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertTriangle, AlertCircle, Skull } from 'lucide-react'

// Define the pollutant data structure
const pollutants = [
  {
    name: "Carbon Monoxide (CO)",
    effects: [
      "Clean air; no effects.",
      "Mild symptoms like a slight headache or dizziness in sensitive individuals; minimal oxygen delivery interference.",
      "Noticeable headache, nausea, dizziness, and reduced mental performance; COHb levels around 10–20%.",
      "Severe symptoms (confusion, impaired judgment, pronounced headache); risk of loss of consciousness; COHb levels approaching 30–40%.",
      "Life-threatening effects such as coma, seizures, and possible death; oxygen transport is critically impaired (COHb above 40–50%).",
    ],
  },
  {
    name: "Fine Particulate Matter (PM₂.₅)",
    effects: [
      "No adverse effects; optimal air quality.",
      "Minor airway irritation (possibly a slight cough or throat discomfort) in very sensitive individuals.",
      "Noticeable respiratory irritation, mild coughing, and some exacerbation of asthma; early signs of airway inflammation.",
      "Marked respiratory distress (worsening of chronic conditions like asthma or COPD) and increased risk for cardiovascular events due to systemic inflammation.",
      "Severe respiratory and cardiovascular issues such as low blood oxygen, risk of heart attack or stroke, and potentially fatal respiratory failure.",
    ],
  },
  {
    name: "Volatile Organic Compounds (VOCs)",
    effects: [
      "Clean indoor air with no effects.",
      "Minimal irritation that might be imperceptible to most; slight eye or throat discomfort in sensitive individuals.",
      "Noticeable eye, nose, and throat irritation; possible mild headaches and dizziness; early signs of potential organ stress if prolonged.",
      "More pronounced symptoms (persistent headache, dizziness, nausea) and increased risk for respiratory irritation and allergic responses; potential chronic effects on organs over time.",
      "Severe irritation and potential systemic toxicity (including neurotoxicity and liver/kidney damage) with long-term exposure increasing cancer risk.",
    ],
  },
  {
    name: "Hydrocarbons",
    effects: [
      "Clean air; no effects.",
      "Minimal irritation; slight discomfort in sensitive individuals.",
      "Noticeable respiratory irritation and headache; potential for long-term effects if exposure is prolonged.",
      "Pronounced symptoms including persistent headache, dizziness, and respiratory distress; increased risk for long-term health issues.",
      "Severe health risks including potential organ damage and increased cancer risk with prolonged exposure.",
    ],
  },
]

// Function to get the appropriate icon based on exposure level
const getExposureIcon = (level) => {
  if (level === 0) return <CheckCircle className="w-8 h-8 text-green-500" />
  if (level === 1) return <AlertTriangle className="w-8 h-8 text-yellow-500" />
  if (level === 2) return <AlertCircle className="w-8 h-8 text-orange-500" />
  if (level === 3) return <AlertCircle className="w-8 h-8 text-red-500" strokeWidth={2.5} />
  return <Skull className="w-8 h-8 text-red-600" />
}

// Function to get the gradient color based on exposure percentage
const getGradientColor = (percentage) => {
  // From green (0%) to yellow (50%) to red (100%)
  if (percentage <= 50) {
    const greenValue = 255
    const redValue = Math.round((percentage / 50) * 255)
    return `rgb(${redValue}, ${greenValue}, 0)`
  } else {
    const greenValue = Math.round(255 - ((percentage - 50) / 50) * 255)
    const redValue = 255
    return `rgb(${redValue}, ${greenValue}, 0)`
  }
}

const PollutantCard = ({ pollutant }) => {
  const [exposure, setExposure] = useState(0)

  // Calculate the effect index based on exposure level
  const effectIndex = Math.min(Math.floor(exposure / 20), 4)

  // Get the highlight color based on exposure percentage
  const highlightColor = getGradientColor(exposure)

  return (
    <div className="bg-[#112240] text-white rounded-lg shadow-lg p-8 m-4 w-full max-w-xl border border-gray-600 h-[450px] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">{pollutant.name}</h2>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 mb-6"
        value={[exposure]}
        onValueChange={(newValue) => setExposure(newValue[0])}
        max={100}
        step={1}
      >
        <Slider.Track className="bg-[#233554] relative grow rounded-full h-2">
          <Slider.Range className="absolute rounded-full h-full" style={{ backgroundColor: highlightColor }} />
        </Slider.Track>
        <Slider.Thumb
          className="block w-6 h-6 bg-white rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label="Exposure level"
        />
      </Slider.Root>
      <div className="mt-4 text-md text-gray-300 flex items-center justify-between">
        <span>Exposure Level: {exposure}%</span>
        <div className="w-12 h-6 rounded" style={{ backgroundColor: highlightColor }}></div>
      </div>
      <AnimatePresence mode="wait">
        {/* Fixed inner container height to maintain overall card size */}
        <motion.div
          key={effectIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-6 bg-[#233554] rounded-md text-gray-200 h-[200px] overflow-auto"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              {getExposureIcon(effectIndex)}
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold mb-3 text-lg text-white">Health Effects:</h3>
              <p className="text-base">{pollutant.effects[effectIndex]}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const PollutantExposureSimulator = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#64ffda]">Pollutant Exposure Simulator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">
        {pollutants.map((pollutant, index) => (
          <PollutantCard key={index} pollutant={pollutant} />
        ))}
      </div>
      <div className="mt-10 text-sm text-gray-400 max-w-3xl text-center p-6 bg-[#112240] rounded-lg border border-gray-600">
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>Mild</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
            <span>Severe</span>
          </div>
          <div className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-600" />
            <span>Critical</span>
          </div>
        </div>
        <p>
          <strong>Disclaimer:</strong> This simulator provides a conceptual model of pollutant exposure effects. The
          exposure "levels" are simplified representations based on synthesized toxicological data. Actual exposure is
          measured in specific units (e.g., ppm or µg/m³) and effects can vary based on individual factors and exposure
          duration.
        </p>
        <p className="mt-2">
          For accurate health information and guidance, please consult official sources such as the WHO or EPA.
        </p>
      </div>
    </div>
  )
}

export default PollutantExposureSimulator
