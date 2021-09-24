import React, {useEffect, useState} from "react";
import {deleteTodo, updateTodo} from '../graphql/mutations.js';
import {API, graphqlOperation} from "aws-amplify";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import {Button} from "@mui/material";
import {SortOutlined} from "@mui/icons-material"
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const ToDoList = ({todos, onRemove}) => {
    const [localToDo, setlocalToDo] = useState(todos);
    const [sortMethod, setSortMethod] = useState(null);
    const [menuView, setMenuView] = useState(false);

    useEffect(() => {
        const sortArray = method => {
            if (sortMethod == null || localToDo.length <= 0) {
                return;
            }
            const methods = {
                title: 'title',
                description: 'description',
                status: 'status',
                dueDate: 'dueDate',
            };
            const sortProp = methods[method];
            const sorted = [...localToDo].sort((l, r) => r[sortProp] - l[sortProp]);

            setlocalToDo(sorted);
        }
        sortArray(sortMethod)
    }, [localToDo, sortMethod]);

    async function updateStatus (todo, newStatus) {
        try {
            const updatedToDo = {
                ...todo,
                status: newStatus
            }

            await API.graphql(graphqlOperation(updateTodo, {input: updatedToDo}));
        } catch (e) {
            console.log('error updating status', e);
        }
    }

    async function handleDelete (todo) {
        try {
            const toDel = {
                id: String(todo.id)
            }
            await API.graphql(graphqlOperation(deleteTodo, {input: toDel}));
            onRemove(todo);
        } catch (err) {
            console.log('error deleting toDo: ', err);
        }
    }

    const handleMenu = (event) => {
        setMenuView(event.currentTarget);
    }

    const handleClose = () => {
        setMenuView(null);
    }

    return (
        <div>
            <div>
                <Button variant={"outlined"} onClick={handleMenu} endIcon={<SortOutlined/>}>Sort By</Button>
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
                    <MenuItem onClick={() => setSortMethod('title')}>Title</MenuItem>
                    <MenuItem onClick={() => setSortMethod('description')}>Description</MenuItem>
                    <MenuItem onClick={() => setSortMethod('status')}>Status</MenuItem>
                    <MenuItem onClick={() => setSortMethod('dueDate')}>Due Date</MenuItem>
                </Menu>
            </div>
            <div>
                {
                    localToDo.map((todo, index) => (
                        <div key={todo.id ? todo.id : index} className={"ToDoList"}>
                            <ToDoItem todo={todo} handleDelete={handleDelete} handleStatus={updateStatus}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default ToDoList;