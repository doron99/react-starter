
import {utilService} from '../services/util.service.js'
const { useState, useEffect,useRef } = React

export function MouseMonitor({}) {
    // const [time, setTime] = useState(new Date());
    const [point, setPoint] = useState({x:0,y:0});
    const [isMouseTrackingActive, setIsMouseTrackingActive] = useState(false);

    const handleMouseEvent = useRef(($event) => {
        setPoint({x: $event.clientX,y: $event.clientY})
    })
    const startTracking = () => {
        window.addEventListener('mousemove',handleMouseEvent.current)
    }
    const pauseTracking = () => {
        window.removeEventListener('mousemove',handleMouseEvent.current)
    }
    const toggleTracker = () => {
        setIsMouseTrackingActive(!isMouseTrackingActive)
        if (isMouseTrackingActive) {
            pauseTracking();
        } else {
            startTracking();
        }
    }

    return (
         <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '5px',
          width: '200px',
          height:'200px',
          background:'#eee' }}>
            <div>
                {point.x} : {point.y}
            </div>
            <div>
                {/* {isMouseTrackingActive ? 'true' : 'false'} */}
                <button onClick={toggleTracker}>{isMouseTrackingActive ? 'pause' : 'resume'}</button>
            </div>
            
        </div>
    )
}