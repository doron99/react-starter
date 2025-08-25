
import {utilService} from '../services/util.service.js'
const { useState } = React

import {RunningClock} from './RunningClock.jsx'
export function SeasonClock({strDate = '2025-01-01'}) {
    console.log('strDate',strDate)
    const [dateString, setDateString] = useState(strDate || formatDateToString(new Date()));
    const [isDark, setIsDark] = useState(false)
    const currMonth = String(new Date(dateString).getMonth() + 1);

    let currSeason = currMonth <= 3 ? 'winter' 
    : (currMonth <= 6 ? 'spring' 
        : (currMonth <= 9 ? 'summer' 
            : 'autumn'))

    function onComponentClick(ev) {
        console.log('onComponentClick');
        ev.preventDefault()
        setIsDark(!isDark);
        //onSetPage(page)
    }    
    // '2025-08-17', 'en-US'
    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
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