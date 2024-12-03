import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserDetials } from "../../managers/userProfileManager"
import { Table } from "reactstrap"

export const UserProfileDetails = () => {
    const [User , setUser] = useState({})
    const {userId} = useParams()

    useEffect(() => {
        getUserDetials(userId).then(setUser)
    } , [userId])

    return (
        <div className="container">
            <div className="d-flex">
                <h4 className="m-2">{User.fullName}</h4>
                
            </div>
            <Table>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <td>{User.email}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{User.address}</td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <h5>Chores</h5>
            </div>
            <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Difficulty</th>
                    <th>ChoreFrequency</th>
                </tr>
            </thead>
                <tbody>

                    {User.chores?.map(c => {
                        return (
                            <tr key={c.id} className="">
                                <th className="d-inline-block">{c.name}</th>
                                <td>{c.difficulty}</td>
                                <td>{c.choreFrequencyDays}</td>
                
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
                    <th>chore</th>
                    <th>completed on</th>
                </tr>
            </thead>
                <tbody>

                    {User.choreCompletions?.map(c => {
                        return (
                            <tr key={c.id} className="">
                                <th className="d-inline-block">{c.chore?.name}</th>
                                <td>{c.completedOn.split("T")[0]}</td>
                                <td>{c.choreFrequencyDays}</td>
                
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )
}