import { motion } from 'framer-motion'
import './System.css'

const capabilities = [
  {
    number: '01',
    category: 'FRONTEND',
    stack: 'REACT / VUE / JAVASCRIPT',
  },
  {
    number: '02',
    category: 'BACKEND',
    stack: 'NODE / EXPRESS',
  },
  {
    number: '03',
    category: 'DATA',
    stack: 'MONGODB / MONGOOSE',
  },
  {
    number: '04',
    category: 'API',
    stack: 'REST / JWT / AUTH',
  },
  {
    number: '05',
    category: 'TOOLS',
    stack: 'GIT / POSTMAN / JIRA',
  },
]

function System() {
  return (
    <section
      id="system"
      className="system-section"
    >
      {/* ATMOSPHERE */}

      <div className="system-section__grid" />

      <div className="system-section__orb" />

      <div className="system-section__scan" />


      <div className="system-section__content">

        {/* ====================================
            HEADER
        ==================================== */}

        <motion.header
          className="system-section__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="system-section__header-left">

            <span className="system-section__index">
              02 / 06
            </span>

            <span className="system-section__label">
              SYSTEM // IDENTITY PROTOCOL
            </span>

          </div>

          <span className="system-section__status">
            ● CORE OPERATIONAL
          </span>
        </motion.header>


        {/* ====================================
            MAIN STATEMENT
        ==================================== */}

        <div className="system-section__main">

          <motion.div
            className="system-section__statement"
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <span className="system-section__eyebrow">
              CORE DIRECTIVE
            </span>

            <h2>
              BUILDING
              <br />
              <span>DIGITAL WORLDS.</span>
            </h2>

            <p>
              I build full-stack applications where
              engineering, interface and experience
              come together.
            </p>

          </motion.div>


          {/* ====================================
              STATUS MODULE
          ==================================== */}

          <motion.div
            className="system-status"
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="system-status__top">

              <span>
                SYSTEM STATUS
              </span>

              <span className="system-status__online">
                ONLINE
              </span>

            </div>


            <div className="system-status__core">

              <div className="system-status__core-ring">
                <span>00</span>
              </div>

              <div>
                <strong>
                  PROJECT_ZERO
                </strong>

                <span>
                  FULL-STACK CORE
                </span>
              </div>

            </div>


            <div className="system-status__metrics">

              <div>
                <span>FRONTEND</span>
                <strong>ONLINE</strong>
              </div>

              <div>
                <span>BACKEND</span>
                <strong>ONLINE</strong>
              </div>

              <div>
                <span>DATABASE</span>
                <strong>ONLINE</strong>
              </div>

              <div>
                <span>API</span>
                <strong>READY</strong>
              </div>

            </div>

          </motion.div>

        </div>


        {/* ====================================
            CAPABILITIES
        ==================================== */}

        <motion.div
          className="system-capabilities"
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.9,
            delay: 0.2,
          }}
        >

          <div className="system-capabilities__header">

            <span>
              CORE CAPABILITIES
            </span>

            <span>
              05 MODULES
            </span>

          </div>


          <div className="system-capabilities__list">

            {capabilities.map((item) => (
              <motion.div
                key={item.number}
                className="capability"
                whileHover={{
                  x: 8,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <span className="capability__number">
                  {item.number}
                </span>

                <span className="capability__category">
                  {item.category}
                </span>

                <span className="capability__stack">
                  {item.stack}
                </span>

                <span className="capability__signal">
                  ●
                </span>

              </motion.div>
            ))}

          </div>

        </motion.div>


        {/* ====================================
            FOOTER
        ==================================== */}

        <footer className="system-section__footer">

          <span>
            SYSTEM_IDENTITY // V1.0
          </span>

          <span>
            ALL SYSTEMS NOMINAL
          </span>

          <span>
            02 / 06
          </span>

        </footer>

      </div>
    </section>
  )
}

export default System