
import {utilService} from '../services/util.service.js'
const { useState, useEffect,useRef } = React

export function CountDown({startFrom, toTime, onDone}) {//onDone

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

   

    const renderContent = (isVisible) => {
        if (isVisible) {
            return <span className={time < 7 ? 'red' : ''}>{time}</span>;
        }
        return <div ref={titleRef} className='clock'>
        {utilService.convertTimestampToTime(toTimeCom)}

      </div>;
    };

    return (
        renderContent(!toTime)
    )
}