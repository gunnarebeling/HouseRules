/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Table } from "reactstrap"
import { DeleteChore, getAllChores } from "../../managers/choresManager"
import { Link } from "react-router-dom"



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
                    <th>Chore Frequency Days</th>
                    {loggedInUser.roles.includes("Admin") && 
                        <th>Details</th>
                    }
                    {loggedInUser.roles.includes("Admin") && 
                        <th>Delete</th>
                    }


                </tr>
            </thead>
            <tbody>
                {chores.map(c => {
                    return (
                        <tr key={`appointment-${c.id}`}>
                            <th scope="row">{c.name}</th>
                            <td>{c.difficulty}</td>
                            <td>{c.choreFrequencyDays}</td>
                            {loggedInUser.roles.includes("Admin") && 
                                <td>
                                    <Link to={`${c.id}`}>Details</Link>
                                </td>
                            }
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