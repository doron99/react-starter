import { watcherService} from '../services/watcher.service.js';
import { WatcherDialog} from '../cmps/WatcherDialog.jsx';
const { useState, useEffect,useRef } = React

export function WatcherApp({}) {
    const[dialogState, setDialogState] =useState('hidden')

    const[watchers, setWatchers] = useState([])
    const[selectedWatcher, setSelectedWatcher] = useState(null)
    const[filterBy, setFilterBy] = useState(watcherService.getDefaultFilter())

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
        console.log('added',added);
        watcherService.save(added).then(() => {
            loadWatchers();
        });

    })
    const loadWatchers = () => {
        watcherService.query()
        .then(watcher=> {
            console.log('watcher', watcher);
            return setWatchers(watcher);
        })
        .catch(err => console.log('err', err));
    }

    useEffect(() =>{
        loadWatchers();
        }, []);
    
    function openModalForAddSection() {
        setDialogState('add');
    }
    const deleteWatcher = ((watcherId) => {
        watcherService.remove(watcherId).then(res => {
            setWatchers(watchers.filter(w => w.id != watcherId))
        });
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
        </div>
    )
}
