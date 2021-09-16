import React from 'react'
import "./css/Loader.css"
import { motion } from 'framer-motion'

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1
   }
  },
  end: {
    transition: {
  staggerChildren: 0.2
}
  }
}

const circleVariants = {
  start: {
   y: "0%"
  },
  end: {
    y: "100%"
  }
}

const circleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeInOut" 
}

export default function Loader() {

  return (
    <motion.div
      className="loading-container"
      variants={containerVariants}
      inital="start"
      animate="end"
    >
      <motion.div className="loading-circle"
        variants={circleVariants}
        transition={circleTransition}> 
      </motion.div>
     
      <motion.div className="loading-circle"
        variants={circleVariants}
        transition={circleTransition}>
      </motion.div>
     
      <motion.div className="loading-circle"
        variants={circleVariants}
        transition={circleTransition}> 
      </motion.div>
      
    </motion.div>
  )
}
