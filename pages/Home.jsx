const { useState, useEffect } = React
import {AnimalList} from '../cmps/AnimalList.jsx'
import {SeasonClock} from '../cmps/SeasonClock.jsx'
import {CountDown} from '../cmps/CountDown.jsx'
import {WatcherApp} from '../cmps/WatcherApp.jsx'

const items = [
    {type:'Malayan Tiger', count:787},
    {type:'Mountain Gorilla', count:212},
    {type:'Fin Whale', count:28}
]
export function Home() {
    const handleChildAction = (dataFromChild) => {
        //setMessage(`Received from child: ${dataFromChild}`);
        console.log('Callback executed with data:', dataFromChild);
      };
    return (
        <div>
            <section className="home">
            <h2>Home Sweet Home</h2>
       </section>
       <WatcherApp/>

       <AnimalList animalInfos={items}/>
        <br/>
        <div style={{ display: 'flex' }}>
            <SeasonClock strDate='2025-01-01'/>
            <CountDown startFrom={10} toTime={Date.now() + 1000*12} onDone={handleChildAction}/>
            {/* <SeasonClock strDate='2025-04-01'/>
            <SeasonClock strDate='2025-07-01'/>
            <SeasonClock strDate='2025-10-01'/> */}
        </div>
        

       </div>
        
    )
}

