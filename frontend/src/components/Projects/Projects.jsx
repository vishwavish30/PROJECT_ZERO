import { motion } from 'framer-motion'
import './Projects.css'

function Projects() {
  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div className="projects-section__grid" />

      <div className="projects-section__content">

        {/* HEADER */}
        <motion.header
          className="projects-section__header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div>
            <span className="projects-section__index">
              03 / 06
            </span>

            <span className="projects-section__label">
              PROJECT ARCHIVE
            </span>
          </div>

          <span className="projects-section__count">
            01 — SELECTED
          </span>
        </motion.header>


        {/* PROJECT */}
        <motion.article
          className="project-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          {/* VISUAL */}
          <div className="project-card__visual">

            <div className="project-card__scanlines" />

            <div className="project-card__visual-grid" />

            <div className="project-card__terminal">

              <span>PROJECT_ZERO // ARCHIVE_01</span>

              <span>STATUS: OPERATIONAL</span>

            </div>


            <div className="project-card__preview">

              <img
                src="/projects/car-cleaning-dashboard.png"
                alt="Car Cleaning Management System dashboard"
                className="project-card__preview-image"
              />

              <div className="project-card__preview-overlay" />

              <div className="project-card__preview-corner project-card__preview-corner--tl" />
              <div className="project-card__preview-corner project-card__preview-corner--tr" />
              <div className="project-card__preview-corner project-card__preview-corner--bl" />
              <div className="project-card__preview-corner project-card__preview-corner--br" />

            </div>

          </div>


          {/* INFORMATION */}
          <div className="project-card__info">

            <span className="project-card__number">
              PROJECT_01
            </span>

            <span className="project-card__eyebrow">
              FULL-STACK MANAGEMENT SYSTEM
            </span>

            <h2>
              CAR
              <br />
              CLEANING
              <br />
              <span>
                MANAGEMENT
                <br />
                SYSTEM.
              </span>
            </h2>

            <p>
              A full-stack management system built to handle
              customer records, vehicle tracking, cleaning
              status, payment management and daily business
              operations.
            </p>

            <div className="project-card__stack">

              <span>VUE</span>
              <i />
              <span>NODE</span>
              <i />
              <span>EXPRESS</span>
              <i />
              <span>MONGODB</span>

            </div>

            <div className="project-card__actions">

              <a
                href="https://car-cleaning-management-system.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__button project-card__button--primary"
              >
                VIEW PROJECT
                <span>↗</span>
              </a>

              <a
                href="https://github.com/vishwavish30/car-cleaning-management-system"
                target="_blank"
                rel="noreferrer"
                className="project-card__button"
              >
                GITHUB
                <span>↗</span>
              </a>

            </div>

          </div>

        </motion.article>


        {/* ARCHIVE FOOTER */}
        <footer className="projects-section__footer">

          <span>
            ARCHIVE STATUS: 01 PROJECT LOADED
          </span>

          <span>
            MORE MODULES IN DEVELOPMENT
          </span>

          <span>
            03 / 06
          </span>

        </footer>

      </div>
    </section>
  )
}

export default Projects