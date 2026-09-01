import { motion } from 'framer-motion'
import './Hero.css'
import ZeroCore3D from '../ZeroCore/ZeroCore3D'

function Hero() {
  return (
    <section 
      id="hero"
      className="hero"
    >
      <div className="hero__grid" />

      <div className="hero__orb hero__orb--one" />
      <div className="hero__orb hero__orb--two" />

      <header className="hero__topbar">
        <div className="hero__system">
          <span className="hero__status-dot" />
          SYSTEM ONLINE
        </div>

        <div className="hero__project">
          PROJECT_ZERO
        </div>
      </header>

      <div className="hero__content">

        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="hero__eyebrow">
            FULL-STACK DEVELOPER
          </span>

          <h1>
            VISHWA
            <span>BUILDING DIGITAL WORLDS.</span>
          </h1>

          <p className="hero__description">
            I build full-stack applications where
            engineering, interface and experience
            come together.
          </p>

          <div className="hero__tech">
            <span>REACT</span>
            <i />
            <span>NODE</span>
            <i />
            <span>EXPRESS</span>
            <i />
            <span>MONGODB</span>
          </div>

          <div className="hero__actions">
            <a
              href="#projects"
              className="hero__button hero__button--primary"
            >
              EXPLORE PROJECTS
              <span>↗</span>
            </a>

            <a
              href="#contact"
              className="hero__button hero__button--secondary"
            >
              CONTACT
            </a>

            <a
              href="/Vishwa-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hero__button hero__button--secondary"
            >
              VIEW RESUME
              <span>↗</span>
            </a>

          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="hero__core">
            <ZeroCore3D
              onActivate={() => {
                console.log('ZERO CORE ACTIVATED')
              }}
            />
          </div>

          <div className="hero__telemetry">
            <span>CORE_00</span>
            <span>STABLE</span>
          </div>
        </motion.div>

      </div>

      <div className="hero__footer">
        <span>
          CORE STATUS: ONLINE
        </span>

        <span>
          SCROLL TO EXPLORE
        </span>

        <span>
          01 / 06
        </span>
      </div>
    </section>
  )
}

export default Hero