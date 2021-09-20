import React from "react";
import Card from '@mui/material/Card';
import {CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {AlarmAdd, Delete} from "@mui/icons-material";

const ToDoItem = ({todo, handleDelete}) => {
    return (
        <Card sx={{ flexGrow: 1, width: 600, justifySelf: "center", margin: "32px auto 16px auto" }}>
            <CardHeader
                action={
                    <IconButton onClick={() => handleDelete(todo.id)}>
                        <Delete/>
                    </IconButton>
                }
                title={todo.name}
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