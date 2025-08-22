
import {utilService} from '../services/util.service.js'
const { useState, useEffect,useRef } = React

export function CountDown({startFrom, toTime, onDone}) {//onDone
    // console.log('toTime', new Date(toTime))
    // console.log('new Date()', new Date())
    // console.log('toTime - new Date().getTime()', `${toTime - new Date().getTime()}`)
    const titleRef = useRef()

    const [toTimeCom, setToTimeCom] = useState(toTime ? (toTime - new Date().getTime()) : null)

    
    useEffect(() => {
        if (!toTime) return;

        const timerId2 = setInterval(() => {
            setToTimeCom(prevToTimeCom => {
                if (prevToTimeCom <= 2000){
                    utilService.animateCSS(titleRef.current)
                    clearInterval(timerId2);
                    return 0;
                }
                return prevToTimeCom - 1000;
            })
        },1000);

        return () => {
            clearInterval(timerId2);
        }
    },[])

    const [time, setTime] = useState(toTime 
        ?  Math.round((Math.round(toTime - new Date().getTime()))/1000) 
        : startFrom);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 0) {
                     return prevTime - 1;
                } else {
                    clearInterval(timerId);
                    onDone('done')
                    return 0;
                }
            })
        }, 1000);
        return () => {
            clearInterval(timerId);
        }
    },[])

    // const formatTime = (date) => {
    //     return new Date(date).toLocaleTimeString(); // Format time as HH:MM:SS
    // }; 
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const renderContent = (isVisible) => {
        if (isVisible) {
            return <span className={time < 7 ? 'red' : ''}>{time}</span>;
        }
        return <div ref={titleRef} className='clock'>
        {formatTime(toTimeCom)}

      </div>;
    };

    return (
        renderContent(!toTime)
    //      <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '5px' }}>
    //   <span className={time < 7 ? 'red' : ''}>{time}</span>
    //   <br/>
    //   <div ref={titleRef} className='clock'>
    //     {formatTime(toTimeCom)}

    //   </div>
    // </div>
      
    )
}