
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

    const formatTime = (date) => {
        return date.toLocaleTimeString(); // Format time as HH:MM:SS
    };
    

    return (
         <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '5px' }}>
            {formatTime(time)}
        </div>
    )
}