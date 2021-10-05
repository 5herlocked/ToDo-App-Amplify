import React, {useState} from "react";
import Card from '@mui/material/Card';
import {
    Button,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import "./ToDoItem.css";
import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {LocalizationProvider} from "@mui/lab";

const ToDoItem = ({todo, handleUpdate}) => {
    const [menuView, setMenuView] = useState(null);
    const [dueDateHolder, setDueDateHolder] = useState(todo.dueDate ? todo.dueDate : null);

    const handleMenu = (event) => {
        setMenuView(event.currentTarget);
    }

    const handleClose = () => {
        setMenuView(null);
    }

    const handleDelete = (toDelete) => {
        handleUpdate(toDelete, 'del');
    }

    const handleStatusChange = (updated) => {
        const newTodo = {
            ...todo,
            status: updated,
        }
        handleUpdate(newTodo, 'update');
    }

    const handleDueDateChange = (newDate) => {
        const newTodo = {
            ...todo,
            dueDate: newDate,
        }
        handleUpdate(newTodo, 'update');
        setDueDateHolder(newDate);
    }

    return (
        <Card className={"ToDoCard"}>
            <CardHeader
                action={
                    <IconButton onClick={() => handleDelete(todo)}>
                        <Delete/>
                    </IconButton>
                }
                title={todo.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
            </CardContent>
            <CardActions className={"ToDoCardAction"}>
                <Button variant='contained' className={"StatusButton"} onClick={handleMenu}>
                    {todo.status === null || todo.status === '' ? "Pending" : todo.status}
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={menuView}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(menuView)}
                    onClose={handleClose}>
                    <MenuItem onClick={() => handleStatusChange('done')}>Completed</MenuItem>
                    <MenuItem onClick={() => handleStatusChange('pending')}>Pending</MenuItem>
                    <MenuItem onClick={() => handleStatusChange('in_progress')}>In Progress</MenuItem>
                    <MenuItem onClick={() => handleStatusChange('overdue')}>Overdue</MenuItem>
                </Menu>
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                        disablePast={true}
                        renderInput={(props) => <TextField {...props} />}
                        label="Due Date"
                        value={todo.dueDate ? todo.dueDate : dueDateHolder}
                        onChange={(newValue) => {
                            setDueDateHolder(newValue.toISOString());
                        }}
                        onAccept={(newValue) => {
                            const val = newValue.toISOString();
                            handleDueDateChange(val);
                        }}
                    />
                </LocalizationProvider>
            </CardActions>
        </Card>
    )
}

export default ToDoItem;