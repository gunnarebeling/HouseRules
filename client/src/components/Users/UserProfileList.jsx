import { useEffect, useState } from "react"
import { getAllUsers } from "../../managers/userProfileManager"
import { Table } from "reactstrap"
import { Link } from "react-router-dom"

export const UserProfileList = () => {
    const [UserProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        getAllUsers().then(setUserProfiles)
    })
    return (
        <div className="container">
        <div className="sub-menu bg-light px-1">
            <h4>Users</h4>
            
        </div>
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Details</th>
                    <th>edit/cancel</th>

                </tr>
            </thead>
            <tbody>
                {UserProfiles.map(up => {
                    return (
                        <tr key={`appointment-${up.id}`}>
                            <th scope="row">{up.fullName}</th>
                            <td>{up.email}</td>
                            <td>{up.address}</td>
                            <td>
                                <Link to={`${up.id}`} >details</Link>
                            </td>
                            <td>
                                <Link to={`${up.id}/edit`} >edit/cancel</Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
   
    </div>
    )
}