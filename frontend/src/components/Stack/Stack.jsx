import { motion } from 'framer-motion'
import './Stack.css'

const stackModules = [
  {
    number: '01',
    category: 'FRONTEND',
    technologies: [
      'REACT',
      'JAVASCRIPT',
      'VUE',
      'HTML',
      'CSS',
    ],
  },
  {
    number: '02',
    category: 'BACKEND',
    technologies: [
      'NODE.JS',
      'EXPRESS.JS',
      'REST API',
    ],
  },
  {
    number: '03',
    category: 'DATABASE',
    technologies: [
      'MONGODB',
      'MONGOOSE',
    ],
  },
  {
    number: '04',
    category: 'SECURITY',
    technologies: [
      'JWT',
      'BCRYPT',
      'AUTHENTICATION',
    ],
  },
  {
    number: '05',
    category: 'TOOLS',
    technologies: [
      'GIT',
      'GITHUB',
      'POSTMAN',
      'VS CODE',
      'JIRA',
    ],
  },
]

function Stack() {
  return (
    <section
      id="stack"
      className="stack-section"
    >
      {/* ATMOSPHERE */}

      <div className="stack-section__grid" />

      <div className="stack-section__orb" />

      <div className="stack-section__content">

        {/* HEADER */}

        <motion.header
          className="stack-section__header"
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
          <div className="stack-section__header-left">

            <span className="stack-section__index">
              04 / 06
            </span>

            <span className="stack-section__label">
              SYSTEM // TECHNOLOGY MATRIX
            </span>

          </div>

          <span className="stack-section__status">
            ● ALL MODULES READY
          </span>
        </motion.header>


        {/* MAIN INTRO */}

        <div className="stack-section__main">

          <motion.div
            className="stack-section__intro"
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

            <span className="stack-section__eyebrow">
              TECHNOLOGY STACK
            </span>

            <h2>
              THE TOOLS
              <br />
              <span>BEHIND THE SYSTEM.</span>
            </h2>

            <p>
              A technology stack built around
              modern frontend interfaces, scalable
              backend systems and practical tools
              for building real-world applications.
            </p>

          </motion.div>


          {/* STACK MATRIX */}

          <motion.div
            className="stack-matrix"
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
              amount: 0.15,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {stackModules.map((module) => (

              <motion.div
                key={module.number}
                className="stack-module"
                whileHover={{
                  x: 8,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                <span className="stack-module__number">
                  {module.number}
                </span>

                <div className="stack-module__info">

                  <span className="stack-module__category">
                    {module.category}
                  </span>

                  <div className="stack-module__technologies">

                    {module.technologies.map(
                      (technology, index) => (
                        <span
                          key={technology}
                        >
                          {technology}

                          {index <
                            module.technologies.length - 1 && (
                            <i />
                          )}
                        </span>
                      )
                    )}

                  </div>

                </div>

                <span className="stack-module__signal">
                  ●
                </span>

              </motion.div>

            ))}

          </motion.div>

        </div>


        {/* FOOTER */}

        <footer className="stack-section__footer">

          <span>
            TECHNOLOGY_MATRIX // V1.0
          </span>

          <span>
            05 MODULES LOADED
          </span>

          <span>
            04 / 06
          </span>

        </footer>

      </div>
    </section>
  )
}

export default Stack