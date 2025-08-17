
import {utilService} from '../services/util.service.js'
const { useState } = React

export function SeasonClock({page = 'home'}) {
    const [dateString, setDateString] = useState(formatDateToString(new Date()));

    function onComponentClick(ev) {
        console.log('onComponentClick');
        ev.preventDefault()
        //onSetPage(page)
    }    
    // '2025-08-17', 'en-US'
    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    return (
        <div onClick={(ev) => onComponentClick(ev)}>
           

            {/* <h2>{dateString}</h2> */}
            <h2>{utilService.getMonthName(new Date(),'en-US')}</h2>
            {/* 'he-IL' */}
            <div><img src="./../assets/img/winter.png" width="120" height="100" /></div>
            <div><img src="./../assets/img/spring.png" width="120" height="100" /></div>
            <div><img src="./../assets/img/summer.png" width="120" height="100" /></div>
            <div><img src="./../assets/img/autumn.png" width="120" height="100" /></div>

            <h3>{utilService.getDayName(dateString,'en-US')}</h3>
            
            <br/>
            {/* <h2>{utilService.getMonthName(dateString,'en-US')}</h2>
            <div>IMG</div>
            <h4>{utilService.getDayName(dateString)}</h4> */}
        </div>
        // <header className="app-header full main-layout">
        //     <section className="header-container">
        //         <h1>React Starter Proj</h1>
        //         <nav>
        //             <a href="" className={(page === 'home') ? 'active' : ''}
        //                 onClick={(ev) => onPageChange(ev, 'home')}>
        //                 Home
        //             </a> |
        //             <a href="" className={(page === 'about') ? 'active' : ''}
        //                 onClick={(ev) => onPageChange(ev, 'about')}>
        //                 About
        //             </a>
        //         </nav>
        //     </section>
        // </header>
    )
}