import { useEffect, useState } from "react"
import { assignUsertoChore, getChoreDetails, unassignUsertoChore } from "../../managers/choresManager"
import { useParams } from "react-router-dom"
import { Col, Input, Label, Row, Table } from "reactstrap"
import { getAllUsers } from "../../managers/userProfileManager"
import "./choreDetails.css"

export const ChoreDetails = () => {
    const [chore, setChore] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const {choreId} = useParams()
    const [assignees, setAssignees] = useState([])

    useEffect(() => {
        getChoreDetails(choreId).then(setChore)
        getAllUsers().then(setAllUsers)
    }, [choreId])

    useEffect(() => {
        const assigneesList = allUsers.reduce((list, user) => {
            let userObj = {id: user.id, fullName: user.fullName, checked: false}
            if ( chore.userProfiles?.some(up => up.id == user.id)) {
                userObj.checked = true
            }
            list.push(userObj)
            return list
        }, [])
        setAssignees(assigneesList)
    }, [allUsers, chore])

    const handleChange = async (e) => {
        const id  = parseInt(e.target.id)
        let copy = [...assignees]
        const assignee = copy.find(a => a.id == id)
        assignee.checked = !assignee.checked
        if (assignee.checked === true) {
            await assignUsertoChore(choreId, assignee.id)
        }else{
           await unassignUsertoChore(choreId, assignee.id)
        }
        setAssignees(copy)

    }

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
                    </tr>
                </thead>
                <tbody>
                    {assignees?.map(up => {
                        return (
                            <tr key={`appointment-${up.id}`}>
                                <th>
                                    <Row >
                                        <Col className="fit-content">
                                            <Label>{up.fullName}</Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                type="checkbox"
                                                name="assignees"
                                                id={up.id}
                                                checked={up.checked}
                                                onChange={handleChange}/>
                                        </Col>
                                        <Col></Col>

                                    </Row>
                                </th>
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