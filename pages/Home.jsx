const { useState, useEffect } = React
import {AnimalList} from '../cmps/AnimalList.jsx'
import {SeasonClock} from '../cmps/SeasonClock.jsx'
const items = [{type:'Malayan Tiger', count:787},
    {type:'Mountain Gorilla', count:212},
    {type:'Fin Whale', count:28}]
export function Home() {
    return (
        <div>
            <section className="home">
            <h2>Home Sweet Home</h2>
       </section>
       <AnimalList animalInfos={items}/>
        <br/>
        <div style={{ display: 'flex' }}>
            <SeasonClock strDate='2025-01-01'/>
            <SeasonClock strDate='2025-04-01'/>
            <SeasonClock strDate='2025-07-01'/>
            <SeasonClock strDate='2025-10-01'/>
        </div>
        

       </div>
        
    )
}

