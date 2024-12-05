import { useEffect, useState } from "react"
import { assignUsertoChore, getChoreDetails, unassignUsertoChore, updateChores } from "../../managers/choresManager"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row, Table } from "reactstrap"
import { getAllUsers } from "../../managers/userProfileManager"
import "./choreDetails.css"
import * as Yup from "yup";

export const ChoreDetails = () => {
    const [chore, setChore] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const {choreId} = useParams()
    const [assignees, setAssignees] = useState([])
    const [ errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [formData, setForm] = useState({
        name : "",
        difficulty: 0,
        choreFrequencyDays: 0

    })

    const validationSchema = Yup.object().shape({
        name : Yup.string().required("Name is required"),
        difficulty: Yup.number().integer("Must be an Integer").required("must enter a difficulty").min(1, "must be between 1-5").max(5, "must be between 1-5"),
        choreFrequencyDays: Yup.number().integer("Must be an Integer").required("must enter a frequency").min(1, "must be more than 0")
        
    })
    

    useEffect(() => {
        getChoreDetails(choreId).then(setChore)
        getAllUsers().then(setAllUsers)
    }, [choreId])

    useEffect(() => {
        setForm({...formData,
            name: chore.name,
            difficulty: chore.difficulty,
            choreFrequencyDays: chore.choreFrequencyDays
        })
    }, [chore])

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
    const updateForm = (e) => {
        const {name, value} = e.target
        const copy = {...formData,
            [name]: value
        }
        setForm(copy)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await validationSchema.validate(formData, ({abortEarly: false}))
            setErrors({})
            const copy = {
                name: formData.name,
                difficulty: parseInt(formData.difficulty),
                choreFrequencyDays: parseInt(formData.choreFrequencyDays)
            }
            updateChores(copy, choreId).then(() => {
                navigate("/chores")
            })
              
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc, err) => {
                acc[err.path] = err.message
                return acc
            }, {})

            setErrors(formattedErrors)
        }
    }
    

    return (
        <div className="container ">
        <div>
            <h4>update chore</h4>
        </div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Name</Label>
                <Input 
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={updateForm} 
                invalid={!!errors.name}/>
                <FormFeedback type='invalid'>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Difficulty</Label>
                <Input 
                type="number"
                name="difficulty"
                value={formData.difficulty || 0}
                onChange={updateForm} 
                invalid={!!errors.difficulty}/>
                <FormFeedback type='invalid'>{errors.difficulty}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>chore Frequency Days</Label>
                <Input 
                type="number"
                name="choreFrequencyDays"
                value={formData.choreFrequencyDays || 0}
                onChange={updateForm}
                list="defaultNumbers" 
                invalid={!!errors.choreFrequencyDays}/>
                <span className="validity"></span>

                <datalist id="defaultNumbers">
                    <option value="1"/>
                    <option value="3"/>
                    <option value="7"/>
                    <option value="10"/>
                    <option value="14"/>
                </datalist>
                <FormFeedback type='invalid'>{errors.choreFrequencyDays}</FormFeedback>
            </FormGroup>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>

        <h5>Assignees</h5>
        
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
    </div>
    )
}