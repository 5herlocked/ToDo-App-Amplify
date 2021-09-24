import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import {Button, CardActions, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {AlarmAdd, Delete} from "@mui/icons-material";
import "./ToDoList.css"

const ToDoItem = ({todo, handleDelete, handleStatus}) => {
    const [menuView, setMenuView] = useState()(false);
    const [localToDo, setlocalToDo] = useState(todo);

    useEffect( () => {
        const setStatus = newStatus => {
            handleStatus(todo, newStatus);
        }
        setStatus(localToDo)
    });

    const handleMenu = (event) => {
        setMenuView(event.currentTarget);
    }

    const handleClose = () => {
        setMenuView(null);
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
            <CardActions>
                <Button onClick={handleMenu}>
                    {todo.status}
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
                    <MenuItem onClick={() => setStatus('completed')}>Completed</MenuItem>
                    <MenuItem onClick={() => setStatus('in-progress')}>In Progress</MenuItem>
                    <MenuItem onClick={() => setStatus('overdue')}>Overdue</MenuItem>
                </Menu>
            </CardActions>
        </Card>
    )
}

export default ToDoItem;