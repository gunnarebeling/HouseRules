/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Table } from "reactstrap"
import { completeChore, DeleteChore, getAllChores } from "../../managers/choresManager"
import { Link,  } from "react-router-dom"



export const ChoreList = ({loggedInUser}) => {
    const [chores, setChores] = useState([])
    

    useEffect(() => {
        getAllChores().then(setChores)
    } , [])

    const handleDelete = (e) => {
        const id = parseInt(e.target.dataset.id)
        DeleteChore(id).then(() => {
            getAllChores().then(setChores)
        })
    }

    const handleComplete = (e) => {
        const id = parseInt(e.target.dataset.id)
        const userId = loggedInUser.id
        
        completeChore(id,userId ).then(() => {
            getAllChores().then(setChores)
        })
    }

    return (
        <div className="container">
        <div className="sub-menu bg-light px-1">
            <h4>Chores</h4>
            {loggedInUser.roles.includes("Admin") && 
                <Link to={"create"}>create new chore</Link>     
            }
            
        </div>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>Frequency</th>
                    {loggedInUser.roles.includes("Admin") && 
                        <th>Details</th>
                    }
                    <th>Complete</th>
                    {loggedInUser.roles.includes("Admin") && 
                        <th>Delete</th>
                    }


                </tr>
            </thead>
            <tbody>
                {chores.map(c => {
                    return (
                        <tr key={`appointment-${c.id}`}>
                            <th scope="row" style={c.expired ? { color: 'red' } : {}}>{c.name}</th>
                            <td>{c.difficulty}</td>
                            <td>{c.choreFrequencyDays}</td>
                            {loggedInUser.roles.includes("Admin") && 
                                <td>
                                    <Link to={`${c.id}`}>Details</Link>
                                </td>
                            }
                            <td>
                                <button data-id={c.id} className="btn btn-warning m-2" onClick={handleComplete} >Complete</button>
                            </td>
                            {loggedInUser.roles.includes("Admin") && 
                                <td>
                                    <button data-id={c.id} className="btn btn-danger m-2" onClick={handleDelete} >Delete</button>
                                </td>
                            }
            
                        </tr>
                    )
                })}
            </tbody>
        </Table>
   
    </div>
    )
}