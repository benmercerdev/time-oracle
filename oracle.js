import { useState} from 'react'
import { DateTime } from 'luxon'

const useTimeOracle = () => {
  const prefix = process.env.REACT_APP_URL_PREFIX || ''

  const [showTMHUD, setShowTMHUD] = useState(false)
  const [haltTime, setHaltTime] = useState(false) 

  const nowZone = 'America/Los_Angeles'
  const launchNow = DateTime.local().setZone(nowZone)
  const [Now, setNow] = useState(launchNow)

  const timeOracle = {

    // Now
    nowZone,
    Now,
    setNow,
    
    //Time Machine (TM) 
    haltTime,
    setHaltTime,
    showTMHUD,
    setShowTMHUD,

    timeMachine: {
      toggleHaltTime: () => {
        console.log('activating TM')
        setHaltTime(!haltTime)
      },
      toggleHUD: () => {
        console.log('toggleHUD')
        setHaltTime(!haltTime)
        setShowTMHUD(!showTMHUD)
      },
      plusDay: () => {
        setNow(Now.plus({ day: 1 }))
      },
      minusDay: () => {
        setNow(Now.minus({ day: 1 }))
      },
      plusHour: () => {
        setNow(Now.plus({ hour: 1 }))
      },
      minusHour: () => {
        setNow(Now.minus({ hour: 1 }))
      },
      plusMinute: () => {
        setNow(Now.plus({ minute: 1 }))
      },
      minusMinute: () => {
        setNow(Now.minus({ minute: 1 }))
      },
      setFromISO: ISO => {
        setNow(DateTime.fromISO(ISO))
      }
      
    },
  }
  if (process.env.REACT_APP_TIME_MACHINE_DEBUG === 'true') {
    global.timeoracle = timeOracle
  }
  return timeOracle
}

export { useTimeOracle }
