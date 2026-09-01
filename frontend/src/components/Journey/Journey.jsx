import { motion } from 'framer-motion'
import './Journey.css'

const journey = [
  {
    number: '01',
    phase: 'DISCOVERY',
    title: 'THE FIRST STEP',
    period: 'BCom // 2024',
    description:
      'Started exploring frontend development during the third year of my BCom degree, even though technology was not part of my academic path.',
    signal: 'ORIGIN',
  },
  {
    number: '02',
    phase: 'SELF-LEARNING',
    title: 'BUILDING THE FOUNDATION',
    period: 'SELF-DIRECTED',
    description:
      'Turned curiosity into a daily practice. Learned frontend development independently through consistent study, experimentation and hands-on building.',
    signal: 'LEARNING',
  },
  {
    number: '03',
    phase: 'FIELD EXPERIENCE',
    title: 'ERP // FRONTEND INTERN',
    period: 'INTERNSHIP',
    description:
      'Joined an ERP product as a frontend developer and gained practical experience working inside a real development environment. During the internship, independently built an API Insight chatbot frontend using an existing API.',
    signal: 'FIELD',
  },
  {
    number: '04',
    phase: 'EXPANSION',
    title: 'BECOMING FULL-STACK',
    period: 'SELF-DIRECTED',
    description:
      'After the internship, continued learning beyond frontend to understand the complete application flow — backend systems, APIs, databases, authentication and development workflows.',
    signal: 'EVOLUTION',
  },
  {
    number: '05',
    phase: 'REAL-WORLD SYSTEM',
    title: 'CAR CLEANING MANAGEMENT',
    period: 'FULL-STACK PROJECT',
    description:
      'Planned, architected, developed, tested and deployed a complete management system based on a real-world business problem. The entire system was built independently from planning through deployment.',
    signal: 'DEPLOYED',
  },
  {
    number: '06',
    phase: 'CONTINUED BUILDING',
    title: 'EMPLOYEE DIRECTORY',
    period: 'RECENT BUILD',
    description:
      'Continued expanding full-stack experience by building an Employee Directory with practical application structure, authentication flow, dashboards and modern frontend development.',
    signal: 'BUILDING',
  },
  {
    number: '07',
    phase: 'CURRENT MISSION',
    title: 'MCA // PROJECT_ZERO',
    period: 'CURRENT',
    description:
      'Currently pursuing MCA to deepen my technical foundation while building PROJECT_ZERO as a benchmark portfolio and the next evolution of my skills, engineering mindset and creative direction.',
    signal: 'ACTIVE',
  },
]

function Journey() {
  return (
    <section
      id="journey"
      className="journey-section"
    >
      {/* ATMOSPHERE */}

      <div className="journey-section__grid" />

      <div className="journey-section__orb journey-section__orb--one" />

      <div className="journey-section__orb journey-section__orb--two" />


      <div className="journey-section__content">

        {/* ====================================
            HEADER
        ==================================== */}

        <motion.header
          className="journey-section__header"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="journey-section__header-left">

            <span className="journey-section__index">
              05 / 06
            </span>

            <span className="journey-section__label">
              SYSTEM // MISSION LOG
            </span>

          </div>

          <span className="journey-section__status">
            ● MISSION ACTIVE
          </span>
        </motion.header>


        {/* ====================================
            INTRO
        ==================================== */}

        <motion.div
          className="journey-section__intro"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <div>

            <span className="journey-section__eyebrow">
              DEVELOPMENT LOG
            </span>

            <h2>
              FROM
              <br />
              <span>CURIOUS</span>
              <br />
              TO BUILDER.
            </h2>

          </div>

          <p>
            A journey from a commerce background into
            software development — built through
            curiosity, self-learning, real-world
            experience and continuous iteration.
          </p>

        </motion.div>


        {/* ====================================
            TIMELINE
        ==================================== */}

        <div className="journey-timeline">

          <div className="journey-timeline__line" />

          {journey.map((item, index) => (

            <motion.article
              key={item.number}
              className={`journey-node ${
                index % 2 === 0
                  ? 'journey-node--left'
                  : 'journey-node--right'
              }`}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* NODE */}

              <div className="journey-node__marker">

                <span>
                  {item.number}
                </span>

              </div>


              {/* CARD */}

              <div className="journey-node__card">

                <div className="journey-node__top">

                  <span className="journey-node__phase">
                    {item.phase}
                  </span>

                  <span className="journey-node__period">
                    {item.period}
                  </span>

                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

                <div className="journey-node__footer">

                  <span>
                    LOG_{item.number}
                  </span>

                  <span className="journey-node__signal">
                    ● {item.signal}
                  </span>

                </div>

              </div>

            </motion.article>

          ))}

        </div>


        {/* ====================================
            CURRENT STATUS
        ==================================== */}

        <motion.div
          className="journey-current"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
        >

          <div className="journey-current__label">
            CURRENT STATUS
          </div>

          <div className="journey-current__grid">

            <div>
              <span>
                ACADEMIC
              </span>

              <strong>
                MCA // IN PROGRESS
              </strong>
            </div>

            <div>
              <span>
                OBJECTIVE
              </span>

              <strong>
                PERMANENT ROLE // SEEKING
              </strong>
            </div>

            <div>
              <span>
                PROJECT_ZERO
              </span>

              <strong>
                ACTIVE DEVELOPMENT
              </strong>
            </div>

          </div>

        </motion.div>


        {/* ====================================
            FOOTER
        ==================================== */}

        <footer className="journey-section__footer">

          <span>
            MISSION_LOG // V1.0
          </span>

          <span>
            BUILD // LEARN // SHIP
          </span>

          <span>
            05 / 06
          </span>

        </footer>

      </div>
    </section>
  )
}

export default Journey