// import {utilService} from '../services/util.service.js'
// import { watcherService} from '../services/watcher.service.js';
const { useState, useEffect } = React

export function WatcherDialog({ watcher, onClose }) {
    
    // Component logic here
    if (!watcher) return null;
    return (
    
        <div className='watcher-dialog'>
            <h5>{watcher.fullname}</h5>

            <ul>
                {watcher.movies.map(movie => {
                    return <li key={movie}>{movie}</li>
                })}
            </ul>
            <div>
                <button type='button' onClick={() => onClose()}>close</button>
            </div>
        </div>
    )
}
// export function WatcherDialog({watcher}) {
//     // const[currWatcher, setCurrWatcher] = useState(watcher)

//     // useEffect(() =>{
//     //     setCurrWatcher(watcher)
       
//     //     }, [watcher])

//     if (!watcher) return <>afadfghahafghafghafghafgjafg</>
//     return (
        
//         <div className='watcher-dialog'>
//             <ul>
//                 <li>{watcher.id}</li>
//             </ul>
//         </div>
//     )
// }
{/* style={{background:'blue',width:'200px',height:'200px'}} */}
