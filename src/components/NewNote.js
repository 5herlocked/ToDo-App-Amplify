import React, {useState} from "react";
import {Collapse, IconButton, Paper, Stack, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {LocalizationProvider} from "@mui/lab";

// design borrowed from Google Keep and basic code borrowed from MUI core components examples.
const initState = {name: '', description: '', dueDate: ''}

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
        if (!formState.name || !formState.description) {
            clickHandler(true);
        } else {
            clickHandler(false);
        }
    }

    return (
        <Paper sx={{ width: "600px" }} elevation={paperFocus ? 12 : 6}
               onMouseEnter={() => focusHandler(true)}
               onMouseLeave={() => focusHandler(false)}>
            <Stack padding={0.8}>
                <TextField
                    style={{margin: "auto auto 8px auto"}}
                    onClick={() => clickHandler(true)}
                    fullWidth={true}
                    onBlur={verifyLossFocus}
                    placeholder={"Title"}
                    value={formState.name}
                    onChange={event => setInput('name', event.target.value)}/>
                <Collapse in={paperExpand} timeout={"auto"} unmountOnExit>
                    <TextField
                        sx={{flexGrow: 1, margin: "auto"}}
                        placeholder={"Description"}
                        fullWidth={true}
                        multiline={true}
                        value={formState.description}
                        onChange={event => setInput('description', event.target.value)}/>
                    <div style={{ paddingTop: "8px" }}>
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