
import {utilService} from '../services/util.service.js'
const { useState } = React

import {RunningClock} from './RunningClock.jsx'
export function SeasonClock({strDate}) {
    console.log('strDate',strDate) //ניתן להזריק תאריך גם מבחוץ
    const [dateString, setDateString] = useState(strDate || utilService.convertDateToString(new Date()));
    const [isDark, setIsDark] = useState(false)

    let currSeason = getCurrSeasonByDateString(dateString);

    function onComponentClick(ev) {
        console.log('onComponentClick');
        ev.preventDefault()
        setIsDark(!isDark);
    }    
   
    const imgSrc = `./../assets/img/${currSeason}.png`

    return (
        <div className={`season-clock-card ${isDark ? 'dark' : ''}`} onClick={(ev) => onComponentClick(ev)}>
            
            <h2>{utilService.getMonthName(new Date(dateString),'en-US')} ({currSeason})</h2>
            <img src={imgSrc} width="120" height="100" />
            <h3>{utilService.getDayName(dateString,'en-US')}</h3>
            <RunningClock />
        </div>
      
    )
}
const getCurrSeasonByDateString = (dateString) => {
    const currMonth = String(new Date(dateString).getMonth() + 1);
    return currMonth <= 3 ? 'winter' 
            : (currMonth <= 6 ? 'spring' 
                : (currMonth <= 9 ? 'summer' 
                    : 'autumn'))
}
