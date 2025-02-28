"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {Link} from "react-router-dom"
import { Code, Menu, X, ChevronRight } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Home", to: "#" },
    { name: "Simulator", to: "/Simulator" },
    { name: "Model", to: "/Model" },
    // { name: "Services", to: "/" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a192f]/90 backdrop-blur-md shadow-lg" : "bg-[#0a192f]"
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div className="flex items-center" variants={itemVariants}>
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-[#64ffda]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#64ffda] to-[#38bdf8] bg-clip-text text-transparent">
              BreatheSafe
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div className="ml-10 flex items-center space-x-8" variants={navVariants}>
              {navItems.map((item, index) => (
                <motion.div key={item.name} variants={itemVariants} custom={index}>
                  <Link
                    to={item.to}
                    className="relative group text-gray-300 hover:text-[#64ffda] px-3 py-2 text-sm font-medium tracking-wider"
                  >
                    <span>{item.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#64ffda] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <Link
                  to="#"
                  className="ml-4 px-5 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda10] transition-all duration-300 text-sm font-medium flex items-center"
                >
                  <span>Get Started</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              variants={itemVariants}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-[#64ffda] hover:bg-[#112240] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <X className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#112240] border-t border-[#233554]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-[#64ffda] hover:bg-[#0a192f] transition duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-2"
              >
                <Link
                  to="#"
                  className="block mx-3 px-4 py-2 text-center border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda10] transition-all duration-300 text-sm font-medium"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

