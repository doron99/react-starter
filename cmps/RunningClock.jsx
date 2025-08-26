
import {utilService} from '../services/util.service.js'
const { useState, useEffect } = React

export function RunningClock({}) {
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        });

        return () => {
            clearInterval(timerId);
        }
    },[])

    
    

    return (
         <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '5px' }}>
            {utilService.convertDateToTime(time)}
        </div>
    )
}