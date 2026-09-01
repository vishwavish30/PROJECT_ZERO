import { motion } from 'framer-motion'
import './Contact.css'

const channels = [
  {
    number: '01',
    type: 'EMAIL',
    value: 'vishwapremkumar30@gmail.com',
    action: 'MAIL',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=vishwapremkumar30@gmail.com',
  },
  {
    number: '02',
    type: 'GITHUB',
    value: 'github.com/vishwavish30',
    action: 'OPEN',
    href: 'https://github.com/vishwavish30',
  },
  {
    number: '03',
    type: 'LINKEDIN',
    value: 'linkedin.com/in/vishwa30',
    action: 'OPEN',
    href: 'https://www.linkedin.com/in/vishwa30',
  },
]

function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
    >
      {/* ====================================
          ATMOSPHERE
      ==================================== */}

      <div className="contact-section__grid" />

      <div className="contact-section__orb contact-section__orb--one" />

      <div className="contact-section__orb contact-section__orb--two" />


      <div className="contact-section__content">

        {/* ====================================
            HEADER
        ==================================== */}

        <motion.header
          className="contact-section__header"
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
          <div className="contact-section__header-left">

            <span className="contact-section__index">
              06 / 06
            </span>

            <span className="contact-section__label">
              SYSTEM // COMMUNICATION TERMINAL
            </span>

          </div>

          <span className="contact-section__status">
            ● CONNECTION READY
          </span>
        </motion.header>


        {/* ====================================
            MAIN
        ==================================== */}

        <div className="contact-section__main">

          {/* ==================================
              INTRO
          ================================== */}

          <motion.div
            className="contact-section__intro"
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

            <span className="contact-section__eyebrow">
              ESTABLISH CONNECTION
            </span>

            <h2>
              LET'S BUILD
              <br />
              <span>SOMETHING.</span>
            </h2>

            <p>
              I'm currently looking for a permanent
              opportunity where I can contribute,
              continue learning and build meaningful
              software with a strong engineering mindset.
            </p>

            <div className="contact-section__availability">

              <span className="contact-section__availability-dot" />

              <span>
                OPEN TO OPPORTUNITIES
              </span>

            </div>

          </motion.div>


          {/* ==================================
              COMMUNICATION TERMINAL
          ================================== */}

          <motion.div
            className="contact-terminal"
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
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="contact-terminal__top">

              <span>
                COMMUNICATION CHANNELS
              </span>

              <span>
                SECURE
              </span>

            </div>


            <div className="contact-terminal__channels">

              {channels.map((channel) => (

                <motion.a
                    key={channel.number}
                    href={channel.href}
                    target={channel.type === 'EMAIL' ? undefined : '_blank'}
                    rel="noreferrer"
                    className="contact-channel"
                  whileHover={{
                    x: 7,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >

                  <span className="contact-channel__number">
                    {channel.number}
                  </span>

                  <div className="contact-channel__info">

                    <span className="contact-channel__type">
                      {channel.type}
                    </span>

                    <span className="contact-channel__value">
                      {channel.value}
                    </span>

                  </div>

                  <span className="contact-channel__action">
                    {channel.action} ↗
                  </span>

                </motion.a>

              ))}

            </div>


            <div className="contact-terminal__bottom">

              <span>
                CHANNEL STATUS
              </span>

              <span className="contact-terminal__online">
                ● ONLINE
              </span>

            </div>

          </motion.div>

        </div>


        {/* ====================================
            FINAL SYSTEM MESSAGE
        ==================================== */}

        <motion.div
          className="contact-final"
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
        >

          <div className="contact-final__core">

            <span>
              00
            </span>

          </div>

          <div className="contact-final__message">

            <span>
              PROJECT_ZERO
            </span>

            <strong>
              CONNECTION READY
            </strong>

          </div>

          <span className="contact-final__signal">
            ● SYSTEM NOMINAL
          </span>

        </motion.div>


        {/* ====================================
            FOOTER
        ==================================== */}

        <footer className="contact-section__footer">

          <span>
            PROJECT_ZERO // V1.0
          </span>

          <span>
            BUILD // LEARN // SHIP
          </span>

          <span>
            06 / 06
          </span>

        </footer>

      </div>
    </section>
  )
}

export default Contact