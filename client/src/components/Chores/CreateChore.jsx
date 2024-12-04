
import { useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { postChores } from "../../managers/choresManager";
import { useNavigate } from "react-router-dom";


export const CreateChore = () => {
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
            postChores(copy).then(() => {
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
                <h4>Create Chore</h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={updateForm} 
                    invalid={!!errors.name}/>
                    <FormFeedback type='invalid'>{errors.name}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Difficulty</Label>
                    <Input 
                    type="number"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={updateForm} 
                    invalid={!!errors.difficulty}/>
                    <FormFeedback type='invalid'>{errors.difficulty}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>chore Frequency Days</Label>
                    <Input 
                    type="number"
                    name="choreFrequencyDays"
                    value={formData.choreFrequencyDays}
                    onChange={updateForm} 
                    invalid={!!errors.choreFrequencyDays}/>
                    <FormFeedback type='invalid'>{errors.choreFrequencyDays}</FormFeedback>
                </FormGroup>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>

        </div>
       
    )
}