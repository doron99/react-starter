import {utilService} from '../services/util.service.js'
import { watcherService} from '../services/watcher.service.js';
import { WatcherDialog} from '../cmps/WatcherDialog.jsx';
import {WatcherAddSection} from '../cmps/WatcherAddSection.jsx'
const { useState, useEffect } = React

export function WatcherApp({}) {
    const[watchers, setWatchers] =useState([])
    const[selectedWatcher, setSelectedWatcher] =useState(null)

    const[filterBy, setFilterBy] =useState(watcherService.getDefaultFilter())
    // const[selectedCar, setSelectedCar] =useState(null)
    // const[isEdit, setIsEdit] =useState(false)
    const onDialogClose = (() => {
        setSelectedWatcher(null);
    })
    useEffect(() =>{
        watcherService.query(filterBy)
        .then(cars=> {
            console.log('cars', cars)
            return setWatchers(cars)
        })
        .catch(err=>{
            console.eror('err:', err)
            //showErrorMsg('Cannot load cars')
        }
        )}, [filterBy])
    
    
    return (
         <div className='main-watcher-container'>
            Watcher App
            <br/>
            <button type='button'>Add Watcher</button>
            <br/>
            <div style={{display:'flex'}}>
                {watchers.map((watcher) => (
                    <div key={watcher.id} className='watcher-container'>
                        <div className='watcher-card'>
                            <div className='waterImg'></div>
                            <h3>{watcher.fullname}</h3>
                            <hr className='watcher-hr'></hr>
                            <div className='buttons-container'>
                                <button type='button'>x</button>
                                <button type='button' onClick={() => setSelectedWatcher(watcher)}>Select</button>
                            </div>
                        </div>
                    </div>
              ))}
            </div>
            <WatcherAddSection/>
            <WatcherDialog  watcher={selectedWatcher} onClose={onDialogClose} />
            {/* <div className='watcher-dialog'>

            </div> */}
        </div>
    )
}
{/* style={{background:'blue',width:'200px',height:'200px'}} */}
