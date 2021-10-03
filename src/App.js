import React, {useEffect, useState} from "react";
import Amplify, {API, graphqlOperation} from "aws-amplify";
import {createTodo, deleteTodo, updateTodo} from "./graphql/mutations";
import {listTodos} from "./graphql/queries";
import awsExports from './aws-exports';
import {withAuthenticator} from "@aws-amplify/ui-react";
import AmplifyBar from "./components/AmplifyBar";
import NewNote from "./components/NewNote";

import "./App.css";
import ToDoItem from "./components/ToDoItem";
import {Button} from "@mui/material";
import {SortOutlined} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

Amplify.configure(awsExports);

const App = () => {
    const [todos, setTodos] = useState([]);
    const [menuView, setMenuView] = useState(null);
    const [sortMethod, setSortMethod] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const sortArray = (method) => {
        setSortMethod(method);
        if (sortMethod == null || todos.length <= 0) {
            return;
        }

        const methods = {
            title: 'title',
            description: 'description',
            createdAt: 'createdAt',
            status: 'status',
            dueDate: 'dueDate',
        };
        const sortProp = methods[method];
        const sorted = [...todos].sort((l, r) => r[sortProp] - l[sortProp]);

        setTodos(sorted);
    }

    async function fetchTodos() {
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos));
            const todos = todoData.data.listTodos.items;
            setTodos(todos);
        } catch (err) {
            console.log('error fetching todos', err)
        }
    }

    async function addTodo(formState) {
        try {
            // basic validation
            if (!formState.title || !formState.description) return

            const todo = {...formState};
            // create an array of all previous todos with the new todo
            setTodos([...todos, todo]);
            // reset to default of empty, empty

            await API.graphql(graphqlOperation(createTodo, {input: todo}));
            await fetchTodos();
        } catch (err) {
            console.log('error creating todo: ', err);
        }
    }

    async function updateStatus (todo, newStatus) {
        try {
            const updatedToDo = {
                ...todo,
                status: newStatus
            }

            await API.graphql(graphqlOperation(updateTodo, {input: updatedToDo}));
            await fetchTodos();
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
            await fetchTodos();
        } catch (err) {
            console.log('error deleting toDo: ', err);
        }
    }

    const handleSort = (method) => {
        setMenuView(null);
        sortArray(method);
    }

    const handleMenu = (event) => {
        setMenuView(event.currentTarget);
    }

    const handleClose = () => {
        setMenuView(null);
    }

    const handleSearch = (searchVal) => {
        if (searchVal == null || searchVal === '') {
            return;
        }
        setTodos([...todos].filter((todo) => todo.title === searchVal));
    }

    return (
        <div>
            <AmplifyBar searchCallback={handleSearch}/>
            <div className="NoteArea">
                <NewNote onAdd={addTodo}/>
                <div>
                    <Button
                        variant={"outlined"}
                        onClick={handleMenu}
                        endIcon={<SortOutlined/>}>
                        {sortMethod == null ? "Sort by" : sortMethod}
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
                        <MenuItem onClick={() => handleSort('title')}>Title</MenuItem>
                        <MenuItem onClick={() => handleSort('description')}>Description</MenuItem>
                        <MenuItem onClick={() => handleSort('status')}>Status</MenuItem>
                        <MenuItem onClick={() => handleSort('dueDate')}>Due Date</MenuItem>
                        <MenuItem onClick={() => handleSort('createdAt')}>Created At</MenuItem>
                    </Menu>
                </div>
                <div className={"ToDoList"}>
                    {
                        todos.map((todo, index) => (
                            <div key={todo.id ? todo.id : index} className={"ToDoCard"}>
                                <ToDoItem todo={todo} handleDelete={handleDelete} handleStatus={updateStatus}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default withAuthenticator(App);
