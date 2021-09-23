import React from "react";
import Card from '@mui/material/Card';
import {CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {AlarmAdd, Delete} from "@mui/icons-material";
import "./ToDoList.css"

const ToDoItem = ({todo, handleDelete}) => {
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
                <AlarmAdd/>
            </CardActions>
        </Card>
    )
}

export default ToDoItem;