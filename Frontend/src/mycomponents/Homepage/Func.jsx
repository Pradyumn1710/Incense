"use client"

import { useRef, useEffect, useState } from "react"
import { Chart, registerables } from "chart.js"
import annotationPlugin from "chartjs-plugin-annotation"
import { AlertTriangle, CheckCircle, Thermometer, Wind, Droplet, Activity } from "lucide-react"

Chart.register(...registerables, annotationPlugin)

const AirQualityDashboard = () => {
  const chartRefs = {
    pm25: useRef(null),
    voc: useRef(null),
    co: useRef(null),
    temp: useRef(null),
  }

  const chartInstances = useRef({
    pm25: null,
    voc: null,
    co: null,
    temp: null,
  })

  const [currentValues, setCurrentValues] = useState({
    pm25: 30,
    voc: 80,
    co: 0.8,
    temp: 22,
  })

  const maxDataPoints = 10
  const counter = maxDataPoints
  const initialLabels = Array.from({ length: maxDataPoints }, (_, i) => `${i * 5}s`)

  // Metric configurations
  const metrics = {
    pm25: {
      name: "PM2.5",
      label: "Particulate Matter",
      min: 10,
      max: 50,
      unit: "µg/m³",
      optimumRange: [10, 35],
      icon: <Droplet className="h-5 w-5" />,
      chartType: "line",
      chartOptions: {
        tension: 0.2,
        fill: false,
        borderColor: "rgba(56, 189, 248, 1)",
        backgroundColor: "rgba(56, 189, 248, 0.4)",
        borderWidth: 2,
      },
    },
    voc: {
      name: "VOC",
      label: "Volatile Organic Compounds",
      min: 50,
      max: 150,
      unit: "ppb",
      optimumRange: [50, 100],
      icon: <Wind className="h-5 w-5" />,
      chartType: "bar",
      chartOptions: {
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.6)",
        borderWidth: 1,
      },
    },
    co: {
      name: "CO",
      label: "Carbon Monoxide",
      min: 0.5,
      max: 2,
      unit: "ppm",
      optimumRange: [0.5, 1],
      icon: <Activity className="h-5 w-5" />,
      chartType: "line",
      chartOptions: {
        stepped: true,
        borderColor: "rgba(251, 146, 60, 1)",
        backgroundColor: "rgba(251, 146, 60, 0.4)",
        borderWidth: 2,
      },
    },
    temp: {
      name: "Temperature",
      label: "Room Temperature",
      min: 20,
      max: 28,
      unit: "°C",
      optimumRange: [20, 24],
      icon: <Thermometer className="h-5 w-5" />,
      chartType: "line",
      chartOptions: {
        tension: 0.2,
        fill: true,
        borderColor: "rgba(244, 63, 94, 1)",
        backgroundColor: "rgba(244, 63, 94, 0.2)",
        borderWidth: 2,
      },
    },
  }

  // Return a random value between min & max (2 decimals)
  const getRandom = (min, max) => {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

  // Generate initial dataset array
  const createInitialData = (min, max) => {
    return Array.from({ length: maxDataPoints }, () => getRandom(min, max))
  }

  // Annotations config for optimum/harmful regions
  const getAnnotationsConfig = (optimumRange, fullRange) => ({
    optimum: {
      type: "box",
      yMin: optimumRange[0],
      yMax: optimumRange[1],
      xMin: "", // dynamically set later
      xMax: "",
      backgroundColor: "rgba(34, 197, 94, 0.2)", // green
      borderWidth: 0,
    },
    harmful: {
      type: "box",
      yMin: optimumRange[1],
      yMax: fullRange[1],
      xMin: "",
      xMax: "",
      backgroundColor: "rgba(239, 68, 68, 0.2)", // red
      borderWidth: 0,
    },
  })

  // Create a chart with dark mode styling
  const createChart = (ctx, metricKey) => {
    const metric = metrics[metricKey]

    return new Chart(ctx, {
      type: metric.chartType,
      data: {
        labels: [...initialLabels],
        datasets: [
          {
            label: `${metric.name} (${metric.unit})`,
            data: createInitialData(metric.min, metric.max),
            ...metric.chartOptions,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            offset: false,
            ticks: { color: "rgba(255,255,255,0.7)" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            suggestedMin: metric.min - (metric.max - metric.min) * 0.1,
            suggestedMax: metric.max + (metric.max - metric.min) * 0.1,
            title: {
              display: true,
              text: metric.unit,
              color: "rgba(255,255,255,0.9)",
              font: {
                weight: "bold",
              },
            },
            ticks: { color: "rgba(255,255,255,0.7)" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255,255,255,0.9)",
              font: {
                weight: "bold",
              },
            },
          },
          annotation: {
            annotations: getAnnotationsConfig(metric.optimumRange, [metric.min, metric.max]),
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            titleColor: "rgba(255, 255, 255, 0.9)",
            bodyColor: "rgba(255, 255, 255, 0.9)",
            borderColor: "rgba(148, 163, 184, 0.2)",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            displayColors: false,
          },
        },
        animation: { duration: 500 },
      },
    })
  }

  useEffect(() => {
    // Create each chart
    Object.entries(chartRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const ctx = ref.current.getContext("2d")
        if (ctx) {
          chartInstances.current[key] = createChart(ctx, key)
        }
      }
    })

    // Helper to update annotation's xMin/xMax
    const updateAnnotations = (chartInstance) => {
      const labels = chartInstance.data.labels
      if (chartInstance.options?.plugins?.annotation && chartInstance.options.plugins.annotation.annotations) {
        const annotations = chartInstance.options.plugins.annotation.annotations
        annotations.optimum.xMin = labels[0]
        annotations.optimum.xMax = labels[labels.length - 1]
        annotations.harmful.xMin = labels[0]
        annotations.harmful.xMax = labels[labels.length - 1]
      }
    }

    // Update data every 3s
    let counterVal = counter // local reference
    const intervalId = setInterval(() => {
      const newLabel = `${counterVal * 5}s`
      counterVal++

      const newValues = {
        pm25: getRandom(metrics.pm25.min, metrics.pm25.max),
        voc: getRandom(metrics.voc.min, metrics.voc.max),
        co: getRandom(metrics.co.min, metrics.co.max),
        temp: getRandom(metrics.temp.min, metrics.temp.max),
      }

      setCurrentValues(newValues)

      Object.entries(chartInstances.current).forEach(([key, chartInstance]) => {
        if (chartInstance) {
          const metricKey = key
          const metric = metrics[metricKey]

          chartInstance.data.labels.push(newLabel)
          chartInstance.data.labels.shift()
          chartInstance.data.datasets[0].data.push(newValues[metricKey])
          chartInstance.data.datasets[0].data.shift()
          updateAnnotations(chartInstance)
          chartInstance.update()
        }
      })
    }, 3000)

    return () => {
      clearInterval(intervalId)
      Object.values(chartInstances.current).forEach((instance) => {
        if (instance) instance.destroy()
      })
    }
  }, []) // Removed unnecessary dependencies

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Real-time Air Quality Dashboard
          </h1>
          <p className="text-slate-300 text-center max-w-3xl mx-auto">
            Monitor your indoor air quality metrics in real-time. This dashboard displays key environmental parameters
            and provides alerts when values exceed recommended thresholds.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(metrics).map(([key, metric]) => (
            <div key={key} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-700">{metric.icon}</div>
                  <div>
                    <h2 className="font-bold text-lg">{metric.label}</h2>
                    <p className="text-slate-400 text-sm">
                      {metric.name} ({metric.unit})
                    </p>
                  </div>
                </div>
                <div className="text-xl font-mono font-bold">{currentValues[key]}</div>
              </div>
              <div className="p-4 h-[280px]">
                <canvas ref={chartRefs[key]} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 mb-8">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
              Real-time Alerts
            </h2>
            <p className="text-slate-400">
              Alerts are generated based on the current values from the monitoring sensors
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(metrics).map(([key, metric]) => {
              const value = currentValues[key]
              const isNormal = value >= metric.optimumRange[0] && value <= metric.optimumRange[1]

              return (
                <div
                  key={key}
                  className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${
                    isNormal
                      ? "bg-green-900/20 border border-green-700/30"
                      : "bg-red-900/20 border border-red-700/30 animate-pulse"
                  }`}
                >
                  <div className={`p-2 rounded-full ${isNormal ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {isNormal ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{metric.name}</h3>
                      <div
                        className={`text-sm px-2 py-0.5 rounded-full font-mono ${
                          isNormal ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {value} {metric.unit}
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${isNormal ? "text-green-300" : "text-red-300"}`}>
                      {isNormal
                        ? `${metric.name} levels are within the optimal range.`
                        : `${metric.name} levels are ${value > metric.optimumRange[1] ? "too high" : "too low"}. ${
                            key === "pm25"
                              ? "Consider using an air purifier."
                              : key === "voc"
                                ? "Improve ventilation in the room."
                                : key === "co"
                                  ? "Check for potential CO sources and ensure proper ventilation."
                                  : "Adjust your thermostat accordingly."
                          }`}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-xl font-bold">Recommended Actions</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {Object.values(currentValues).some((value, index) => {
                const metricKey = Object.keys(metrics)[index]
                const metric = metrics[metricKey]
                return value < metric.optimumRange[0] || value > metric.optimumRange[1]
              }) ? (
                <>
                  {currentValues.pm25 > metrics.pm25.optimumRange[1] && (
                    <li className="flex items-start gap-2">
                      <div className="text-amber-400 mt-1">•</div>
                      <p>Run your air purifier at a higher setting to reduce particulate matter</p>
                    </li>
                  )}
                  {currentValues.voc > metrics.voc.optimumRange[1] && (
                    <li className="flex items-start gap-2">
                      <div className="text-amber-400 mt-1">•</div>
                      <p>Open windows to increase air circulation and reduce VOC concentration</p>
                    </li>
                  )}
                  {currentValues.co > metrics.co.optimumRange[1] && (
                    <li className="flex items-start gap-2">
                      <div className="text-red-500 mt-1">•</div>
                      <p className="font-bold">Check gas appliances and ensure proper ventilation immediately</p>
                    </li>
                  )}
                  {(currentValues.temp < metrics.temp.optimumRange[0] ||
                    currentValues.temp > metrics.temp.optimumRange[1]) && (
                    <li className="flex items-start gap-2">
                      <div className="text-amber-400 mt-1">•</div>
                      <p>Adjust your thermostat to maintain optimal temperature between 20-24°C</p>
                    </li>
                  )}
                </>
              ) : (
                <li className="flex items-start gap-2">
                  <div className="text-green-500 mt-1">•</div>
                  <p>All parameters are within optimal ranges. No action needed at this time.</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirQualityDashboard

