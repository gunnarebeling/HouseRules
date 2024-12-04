import { useEffect, useState } from "react"
import { getChoreDetails } from "../../managers/choresManager"
import { useParams } from "react-router-dom"
import { Table } from "reactstrap"

export const ChoreDetails = () => {
    const [chore, setChore] = useState({})
    const {choreId} = useParams()

    useEffect(() => {
        getChoreDetails(choreId).then(setChore)
    }, [])

    return (
        <div className="container">
            <div className="d-flex">
                <h4 className="m-2">{chore.name}</h4>
                
            </div>
            <Table>
                <tbody>
                    <tr>
                        <th>Difficulty</th>
                        <td>{chore.difficulty}</td>
                    </tr>
                    <tr>
                        <th>Chore Frequency</th>
                        <td>{chore.choreFrequencyDays}</td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <h5>Assignees</h5>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>

                    </tr>
                </thead>
                <tbody>
                    {chore.userProfiles?.map(up => {
                        return (
                            <tr key={`appointment-${up.id}`}>
                                <th scope="row">{up.fullName}</th>
                                <td>{up.email}</td>
                                <td>{up.address}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                <h5>Chore Completion</h5>
            </div>
            <Table>
            <thead>
                <tr>
                    <th>completed on</th>
                </tr>
            </thead>
                <tbody>

                    {chore.choreCompletions?.map(c => {
                        return (
                            <tr key={c.id} className="">
                                <td>{c.completedOn.split("T")[0]}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )
}