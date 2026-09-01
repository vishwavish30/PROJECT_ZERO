import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootSequence from './components/BootSequence/BootSequence'
import Hero from './components/Hero/Hero'
import './App.css'
import HUD from './components/HUD/HUD'
import System from './components/System/System'
import Projects from './components/Projects/Projects'
import Stack from './components/Stack/Stack'
import Journey from './components/Journey/Journey'
import Contact from './components/Contact/Contact'

import SpaceField from './components/SpaceField/SpaceField'


import Gargantua from './components/Gargantua'


function App() {
  const [bootComplete, setBootComplete] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <BootSequence
            key="boot"
            onComplete={() => setBootComplete(true)}
          />
        ) : (
          <main
            key="main"
            className="project-zero"
          >
            <HUD />

            <SpaceField />

            <Hero />

            <System />

            <Projects />

            <Stack />

            <Journey />

            <Contact />
          </main>
        )}
      </AnimatePresence>
    </>
  )
}

export default App