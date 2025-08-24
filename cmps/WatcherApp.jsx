import {utilService} from '../services/util.service.js'
import { watcherService} from '../services/watcher.service.js';
import { WatcherDialog} from '../cmps/WatcherDialog.jsx';
import {WatcherAddSection} from '../cmps/WatcherAddSection.jsx'
const { useState, useEffect } = React

export function WatcherApp({}) {
    const[watchers, setWatchers] =useState([])
    const[selectedWatcher, setSelectedWatcher] =useState(null)
    const[isAddSectionVisible, setIsAddSectionVisible] =useState(false)

    const[filterBy, setFilterBy] =useState(watcherService.getDefaultFilter())

    const onDialogClose = (() => {
        setSelectedWatcher(null);
    })
    const loadWatchers = () => {
        watcherService.query()
        .then(cars=> {
            console.log('cars', cars);
            return setWatchers(cars);
        })
        .catch(err => console.log('err', err));
    }
    const onAddSectionClose = ((addedWatcher) => {
        setIsAddSectionVisible(false);
        if (!addedWatcher) return;

        let added = addedWatcher;
        //added.id = utilService.makeId();
        console.log('added',added);
        watcherService.save(added).then(() => {
            loadWatchers();
        });
    });

    useEffect(() =>{
        console.log('do useEffect')
        loadWatchers();
        }, []);
    
    function toggleVisibility() {
        setIsAddSectionVisible(!isAddSectionVisible);
    }
    const deleteWatcher = ((watcherId) => {
        console.log('watcherId', watcherId);
        watcherService.remove(watcherId).then(res => {
            setWatchers(watchers.filter(w => w.id != watcherId))
        });
        //watchers = watchers.filter(w => w.id != watcherId);
    });
    return (
         <div className='main-watcher-container'>
                <div style={{textAlign:'center'}}>
                    <h2>Watcher App</h2>
                    <button type='button' onClick={toggleVisibility}>Add Watcher</button>

                </div>
                <div className='main-watcher-container-child'>
                    {watchers.map((watcher) => (
                        <div key={watcher.id} className='watcher-container'>
                            <div className='watcher-card'>
                                <div className='waterImg'></div>
                                <h3>{watcher.fullname}</h3>
                                <hr className='watcher-hr'></hr>
                                <div className='buttons-container'>
                                    <button type='button' onClick={() => deleteWatcher(watcher.id)}>x</button>
                                    <button type='button' onClick={() => setSelectedWatcher(watcher)}>Select</button>
                                </div>
                            </div>
                        </div>
                ))}
                </div>
         
           
            <WatcherAddSection 
                isAddSectionVisible={isAddSectionVisible} 
                onClose={onAddSectionClose} />
            <WatcherDialog  watcher={selectedWatcher} onClose={onDialogClose} />
            {/* <div className='watcher-dialog'>

            </div> */}
        </div>
    )
}
{/* style={{background:'blue',width:'200px',height:'200px'}} */}
