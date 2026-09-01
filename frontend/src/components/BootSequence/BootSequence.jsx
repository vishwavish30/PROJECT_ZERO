import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ZeroCore3D from '../ZeroCore/ZeroCore3D'
import './BootSequence.css'
import SpaceField from '../SpaceField/SpaceField'

const bootSteps = [
  'CORE',
  'NETWORK',
  'INTERFACE',
  'IDENTITY',
]

function BootSequence({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0)
  const [showAccess, setShowAccess] = useState(false)

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((current) => {
        if (current < bootSteps.length - 1) {
          return current + 1
        }

        clearInterval(stepTimer)
        return current
      })
    }, 500)

    return () => clearInterval(stepTimer)
  }, [])

  useEffect(() => {
    if (activeStep !== bootSteps.length - 1) return

    const accessTimer = setTimeout(() => {
      setShowAccess(true)
    }, 700)

    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2400)

    return () => {
      clearTimeout(accessTimer)
      clearTimeout(completeTimer)
    }
  }, [activeStep, onComplete])

  return (
    <motion.div
      className="boot-sequence"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)',
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
    >

      <SpaceField />
      
      <div className="boot-sequence__background" />

      <div className="boot-sequence__content">
        <motion.div
          className="boot-sequence__label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PROJECT_ZERO
        </motion.div>

        <motion.div
          className="boot-sequence__core"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ZeroCore3D />
        </motion.div>

        <div className="boot-sequence__diagnostics">
          {bootSteps.map((step, index) => (
            <motion.div
              key={step}
              className={`diagnostic ${
                index <= activeStep ? 'diagnostic--active' : ''
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: index <= activeStep ? 1 : 0.25,
                x: 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="diagnostic__indicator">
                {index <= activeStep ? '✓' : '—'}
              </span>

              <span>{step}</span>

              <span className="diagnostic__status">
                {index <= activeStep ? 'ONLINE' : 'WAIT'}
              </span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showAccess && (
            <motion.div
              className="boot-sequence__access"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span>ACCESS GRANTED</span>

              <strong>VISHWA</strong>

              <small>FULL-STACK DEVELOPER</small>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default BootSequence