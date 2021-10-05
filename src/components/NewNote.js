import React, {useState} from "react";
import {Collapse, IconButton, Paper, Stack, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {LocalizationProvider} from "@mui/lab";
import "./NewNote.css";

// design borrowed from Google Keep and basic code borrowed from MUI core components examples.
const initState = {
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    createdAt: '',
    updatedAt: '',
}

const NewNote = ({onAdd}) => {
    const [formState, setFormState] = useState(initState);

    const [paperExpand, setPaperExpand] = useState(false);
    const [paperFocus, setPaperFocus] = useState(false);

    function setInput(key, value) {
        setFormState({...formState, [key]: value});
    }

    const clickHandler = (val) => {
        setPaperExpand(val);
    }

    const focusHandler = (focusTo) => {
        setPaperFocus(focusTo);
    }

    const submitHandler = () => {
        onAdd(formState);
        setFormState(initState);
    }

    function verifyLossFocus() {
        if (!formState.title || !formState.description) {
            clickHandler(true);
        } else {
            clickHandler(false);
        }
    }

    return (
        <Paper className={"NewNote"} elevation={paperFocus ? 12 : 6}
               onMouseEnter={() => focusHandler(true)}
               onMouseLeave={() => focusHandler(false)}>
            <Stack padding={0.8}>
                <TextField
                    className={"TitleTextField"}
                    onClick={() => clickHandler(true)}
                    onBlur={verifyLossFocus}
                    placeholder={"Title"}
                    value={formState.title}
                    onChange={event => setInput('title', event.target.value)}/>
                <Collapse in={paperExpand} timeout={"auto"} unmountOnExit>
                    <TextField
                        className={"DescTextField"}
                        placeholder={"Description"}
                        multiline={true}
                        value={formState.description}
                        onChange={event => setInput('description', event.target.value)}/>
                    <div className={"DueDatePicker"}>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                disablePast={true}
                                renderInput={(props) => <TextField {...props} />}
                                label="Due Date"
                                value={formState.dueDate}
                                onChange={(newValue) => {
                                    setInput('dueDate', newValue.toISOString());
                                }}
                            />
                        </LocalizationProvider>
                        <IconButton onClick={submitHandler} sx={{float: "right"}}>
                            <Add/>
                        </IconButton>
                    </div>
                </Collapse>

            </Stack>
        </Paper>
    )
}

export default NewNote;