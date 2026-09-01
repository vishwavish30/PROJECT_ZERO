import { useEffect, useState } from 'react'
import './HUD.css'

function HUD() {
  const [activeSection, setActiveSection] = useState('01')

  const sections = [
    {
      id: '01',
      label: 'IDENTITY',
      target: 'hero',
    },
    {
      id: '02',
      label: 'SYSTEM',
      target: 'system',
    },
    {
      id: '03',
      label: 'PROJECTS',
      target: 'projects',
    },
    {
      id: '04',
      label: 'STACK',
      target: 'stack',
    },
    {
      id: '05',
      label: 'JOURNEY',
      target: 'journey',
    },
    {
      id: '06',
      label: 'CONTACT',
      target: 'contact',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY + window.innerHeight * 0.35

      let currentSection = '01'

      sections.forEach((section) => {
        const element = document.getElementById(
          section.target
        )

        if (!element) return

        const top = element.offsetTop
        const bottom = top + element.offsetHeight

        if (
          scrollPosition >= top &&
          scrollPosition < bottom
        ) {
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    handleScroll()

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    window.addEventListener(
      'resize',
      handleScroll
    )

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )

      window.removeEventListener(
        'resize',
        handleScroll
      )
    }
  }, [])

  const handleNavigation = (target) => {
    const element = document.getElementById(target)

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="hud">

      <div className="hud__label">
        NAVIGATION
      </div>

      <div className="hud__sections">

        {sections.map((section) => (
          <button
            key={section.id}
            className={`hud__item ${
              activeSection === section.id
                ? 'hud__item--active'
                : ''
            }`}
            onClick={() =>
              handleNavigation(section.target)
            }
          >

            <span className="hud__number">
              {section.id}
            </span>

            <span className="hud__label-text">
              {section.label}
            </span>

          </button>
        ))}

      </div>

      <div className="hud__status">
        <span />
        SYSTEM NAVIGATION
      </div>

    </nav>
  )
}

export default HUD