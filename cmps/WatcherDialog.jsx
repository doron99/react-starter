// import {utilService} from '../services/util.service.js'
// import { watcherService} from '../services/watcher.service.js';
const { useState, useEffect } = React

export function WatcherDialog({ state, watcher, onClose }) {
    const [name, setName] = useState('');
    const [movies, setMovies] = useState([{ movie: '' }]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleMovieChange = (index, value) => {
        const newMovies = [...movies];
        newMovies[index].movie = value;
        setMovies(newMovies);
    };

    const addMovie = () => {
        setMovies([...movies, { movie: '' }]);
    };

    const removeMovie = (index) => {
        if (movies.length == 1) return;
        const newMovies = movies.filter((_, i) => i !== index);
        setMovies(newMovies);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User Name:', name);
        console.log('Movies:', movies);
        if ((name || '').length == 0) return;
        const objToReturn = {
            fullname: name,
            movies: movies.map(m => m.movie)
        }
        resetAllFields();
        onClose(objToReturn);
        // Here you can handle the submission, e.g., send data to an API
    };
    const resetAllFields = () => {
        setName('')
        setMovies([{ movie: '' }])
    }
    const onInternalClose = () => {
        resetAllFields();
        onClose();

    }
    
    if (state == 'hidden') return null;
    else if (state == 'add') {
        return (
            <div className="modal-backdrop" >
                <div className="modal" >
                    <button className="buttonX" onClick={() => onInternalClose()}>x</button>
                    <div className="watcher-add-section d-flex" onSubmit={handleSubmit}>
                        <div style={{paddingTop:'30px'}}>
                            <div >
                                <input placeholder='watcher name' type="text" value={name} onChange={handleNameChange} required />
                            </div>
                            <table>
                                <thead>
                                <tr>
                                    <th>Movies</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies.map((movie, index) => (
                                    <tr key={index}>
                                    <td>
                                        <input
                                        type="text"
                                        value={movie.movie}
                                        onChange={(e) => handleMovieChange(index, e.target.value)}
                                        required
                                        />
                                    </td>
                                    <td>
                                        {index === movies.length - 1 && ( // Show "+" button only in the last row
                                        <button type="button" onClick={addMovie}>+</button>
                                        )}
                                        {index < movies.length - 1 &&
                                            <button type="button" onClick={() => removeMovie(index)}>-</button>
                                        }
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button type="button" onClick={handleSubmit}>Add Watcher</button>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    } else {
        return (
        <div className="modal-backdrop">
            <div className='modal watcher-dialog'>
                <button className="buttonX" type='button' onClick={() => onClose()}>x</button>
                <div className="d-flex">
                    <h2>{watcher.fullname}</h2>

                    <ul>
                        {watcher.movies.map(movie => {
                            return <li key={movie}>{movie}</li>
                        })}
                    </ul>
                </div>
               
            </div>
        </div>
        
    )
    }
    
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
