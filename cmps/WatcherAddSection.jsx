// import {utilService} from '../services/util.service.js'
// import { watcherService} from '../services/watcher.service.js';
const { useState, useEffect } = React

export function WatcherAddSection({  }) {//isOpen, onClose
   const [name, setName] = useState('');
  const [roles, setRoles] = useState([{ role: '' }]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleChange = (index, value) => {
    const newRoles = [...roles];
    newRoles[index].role = value;
    setRoles(newRoles);
  };

  const addRole = () => {
    setRoles([...roles, { role: '' }]);
  };

  const removeRole = (index) => {
    if (roles.length == 1) return;
    const newRoles = roles.filter((_, i) => i !== index);
    setRoles(newRoles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Name:', name);
    console.log('Roles:', roles);
    // Here you can handle the submission, e.g., send data to an API
  };

  return (
    <div className="watcher-add-section" onSubmit={handleSubmit}>
      <div>
        <label>
          User Name:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Movies</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={role.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  required
                />
              </td>
              <td>
                {index === roles.length - 1 && ( // Show "+" button only in the last row
                  <button type="button" onClick={addRole}>
                    +
                  </button>
                )}
                {index < roles.length - 1 &&
                    <button type="button" onClick={() => removeRole(index)}>
                    -
                    </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Add User</button>
    </div>
  );
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
