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
        <SeasonClock/>
       </div>
        
    )
}

