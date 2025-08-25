const { useState, useEffect } = React
import {AnimalList} from '../cmps/AnimalList.jsx'
import {SeasonClock} from '../cmps/SeasonClock.jsx'
import {CountDown} from '../cmps/CountDown.jsx'
import {WatcherApp} from '../cmps/WatcherApp.jsx'
import { MouseMonitor } from '../cmps/MouseMonitor.jsx'

const items = [
    {type:'Malayan Tiger', count:787},
    {type:'Mountain Gorilla', count:212},
    {type:'Fin Whale', count:28}
]
export function Home() {
    //const [componentState,setComponentState] = useState('');
    const [activeComponent, setActiveComponent] = useState('');

    const handleChildAction = (dataFromChild) => {
    //setMessage(`Received from child: ${dataFromChild}`);
    console.log('Callback executed with data:', dataFromChild);
    };
    useEffect(() => {
        setActiveComponent('MouseMonitor')
        return () => {

        }
    },[])
    const renderComponent = () => {
    switch (activeComponent) {
      case 'MouseMonitor':
        return <MouseMonitor />;
      case 'WatcherApp':
        return <WatcherApp />;
      case 'AnimalList':
        return <AnimalList  animalInfos={items}/>;
      case 'SeasonClock':
        return <SeasonClock />;
      case 'CountDown':
        return <CountDown 
            startFrom={10} 
            toTime={Date.now() + 1000*12} 
            onDone={handleChildAction}/>;

      default:
        return null;
    }
  };

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setActiveComponent('MouseMonitor')}>MouseMonitor</button>
                <button onClick={() => setActiveComponent('WatcherApp')}>WatcherApp</button>
                <button onClick={() => setActiveComponent('AnimalList')}>AnimalList</button>
                <button onClick={() => setActiveComponent('SeasonClock')}>SeasonClock</button>
                <button onClick={() => setActiveComponent('CountDown')}>CountDown</button>
            </div>
            <div>
                {renderComponent()}
            </div>
        
        
    </div>
        
    )
}
 