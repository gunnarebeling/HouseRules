/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getUserDetials } from "../../managers/userProfileManager"
import { Table } from "reactstrap"
import { completeChore } from "../../managers/choresManager"

export const MyChores = ({loggedInUser}) => {
    const [userChores, setUserChores] = useState([])

    useEffect(() => {
        getUserDetials(loggedInUser.id).then(res => {
            const expiredChores = res.chores.filter(c => c.expired === true)
            setUserChores(expiredChores)
        })
    }, [])

    const handleComplete = (e) => {
        const id = parseInt(e.target.dataset.id)
        const userId = loggedInUser.id
        
        completeChore(id,userId ).then(() => {
            getUserDetials(loggedInUser.id).then(res => {
                const expiredChores = res.chores.filter(c => c.expired === true)
                setUserChores(expiredChores)
            })
        })
    }

    return (
            <div className="container">
            <div className="sub-menu bg-light px-1">
                <h3>{loggedInUser.fullName}</h3>
                <h4>expired Chores</h4>
                
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Difficulty</th>
                        <th>Frequency</th>
                        <th>Complete</th>


                    </tr>
                </thead>
                <tbody>
                    {userChores.map(c => {
                        return (
                            <tr key={`appointment-${c.id}`}>
                                <th scope="row" style={c.expired ? { color: 'red' } : {}}>{c.name}</th>
                                <td>{c.difficulty}</td>
                                <td>{c.choreFrequencyDays}</td>
                                <td>
                                    <button data-id={c.id} className="btn btn-warning m-2" onClick={handleComplete} >Complete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
    
        </div>
    )
}