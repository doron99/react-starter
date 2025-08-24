import {utilService} from '../services/util.service.js'
import { watcherService} from '../services/watcher.service.js';
import { WatcherDialog} from '../cmps/WatcherDialog.jsx';
const { useState, useEffect,useRef } = React

export function WatcherApp({}) {
    const[dialogState, setDialogState] =useState('hidden')

    const[watchers, setWatchers] =useState([])
    const[selectedWatcher, setSelectedWatcher] =useState(null)

    const[filterBy, setFilterBy] =useState(watcherService.getDefaultFilter())
    //when to use useRef:
    //להשתמש למשל ברשימה של ערים? שיש 1000+ רשומות?
    //gives refs - can use functions or change data ans ect..

    const exampleRef = useRef();
    const setSelecterWatcherAndOpenDialog = (watcher) => {
        setSelectedWatcher(watcher);
        setDialogState('watcherSelected');
    }
    const onDialogClose = ((addedWatcher) => {
        setDialogState('hidden');
        setSelectedWatcher(null);

        console.log('addedWatcher', addedWatcher);
        if (!addedWatcher) return;

        let added = addedWatcher;
        //added.id = utilService.makeId();
        console.log('added',added);
        watcherService.save(added).then(() => {
            loadWatchers();
        });

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
    
    function openModalForAddSection() {
        //setIsAddSectionVisible(!isAddSectionVisible);
        setDialogState('add');
    }
    const deleteWatcher = ((watcherId) => {
        console.log('exampleRef.current',exampleRef.current);
        console.log('watcherId', watcherId);
        watcherService.remove(watcherId).then(res => {
            setWatchers(watchers.filter(w => w.id != watcherId))
        });
        //watchers = watchers.filter(w => w.id != watcherId);
    });
    return (
         <div className='main-watcher-container' ref={exampleRef}> 
                <div style={{textAlign:'center'}}>
                    <h2>Watcher App</h2>
                    <button type='button' onClick={openModalForAddSection}>Add Watcher</button>

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
                                    <button type='button' onClick={() => setSelecterWatcherAndOpenDialog(watcher)}>Select</button>
                                </div>
                            </div>
                        </div>
                ))}
                </div>
         
            <WatcherDialog  
                state={dialogState}
                watcher={selectedWatcher} 
                onClose={onDialogClose} />
            {/* <div className='watcher-dialog'>

            </div> */}
        </div>
    )
}
{/* style={{background:'blue',width:'200px',height:'200px'}} */}
