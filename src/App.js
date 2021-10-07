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
import {debounce} from "lodash/function";

Amplify.configure(awsExports);
var _ = require('lodash');

const App = () => {
    const [todos, setTodos] = useState([]);
    const [menuView, setMenuView] = useState(null);
    const [sortMethod, setSortMethod] = useState(null);
    const [searchVal, setSearchVal] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    // GraphQL interfaces
    async function fetchTodos() {
        try {
            const todoData = await API.graphql(graphqlOperation(listTodos), {authMode: 'AMAZON_COGNITO_USER_POOLS'});
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

            let todo = {...formState};
            todo.queryDescription = todo.description.toLowerCase();
            todo.queryTitle = todo.title.toLowerCase();
            // create an array of all previous todos with the new todo
            // reset to default of empty, empty

            await API.graphql(graphqlOperation(createTodo, {input: todo, authMode: 'AMAZON_COGNITO_USER_POOLS'}));
            await fetchTodos();
        } catch (err) {
            console.log('error creating todo: ', err);
        }
    }

    async function handleUpdate (todo) {
        try {
            const updatedToDo = {
                ...todo
            }

            // UpdateToDo is not allowed to have owner
            delete updatedToDo.owner;

            console.log(updatedToDo);

            await API.graphql(graphqlOperation(updateTodo, {input: updatedToDo, authMode: 'AMAZON_COGNITO_USER_POOLS'}));
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
            console.log(toDel);
            await API.graphql(graphqlOperation(deleteTodo, {input: toDel, authMode: 'AMAZON_COGNITO_USER_POOLS'}));
            await fetchTodos();
        } catch (err) {
            console.log('error deleting toDo: ', err);
        }
    }

    async function handleChange(todo, action) {
        switch (action) {
            case 'del':
                await handleDelete(todo);
                break;
            case 'update':
                await handleUpdate(todo);
                break;
            default:
                // do nothing
                break;
        }
    }

    // Todo List constructor
    const TodoList = () => {
        const methods = {
            title: 'queryTitle',
            description: 'queryDescription',
            createdAt: 'createdAt',
            status: 'status',
            dueDate: 'dueDate',
        };

        const sortProp = methods[sortMethod];

        let internalTodos = [...todos];
        for (let i = 0; i < internalTodos.length; i++) {
            let tempToDo = internalTodos[i];
            if (tempToDo.queryDescription === null || tempToDo.queryTitle === null) {
                tempToDo.queryTitle = tempToDo.title.toLowerCase();
                tempToDo.queryDescription = tempToDo.description.toLowerCase();
            }
            internalTodos[i] = tempToDo;
        }

        if (sortMethod !== '' && sortMethod != null) {
            let secondarySort = '';
            switch (sortProp) {
                case 'title':
                    secondarySort = methods['description'];
                    break;
                case 'description':
                    secondarySort = methods['title'];
                    break;
                case 'dueDate':
                    secondarySort = methods['title'];
                    break;
                case 'status':
                    secondarySort = methods['title'];
                    break;
                case 'createdAt':
                    secondarySort = methods['title'];
                    break;
                default:
                    secondarySort = methods['description'];
                    break;
            }
            internalTodos = _.orderBy(internalTodos, [sortProp, secondarySort], ['asc', 'asc']);
        }
        if (searchVal !== '' && searchVal != null) {
            const searchQuery = searchVal.toLowerCase();
            internalTodos = internalTodos.filter(
                (todo) => todo.queryTitle.includes(searchQuery) || todo.queryDescription.includes(searchQuery)
            );
        }

        return (
            <div className="ToDoList">
                {
                    internalTodos.map((todo, index) => {
                        return (
                            <div key={todo.id ? todo.id : index} className="ToDoCard">
                                <ToDoItem todo={todo} handleUpdate={handleChange}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    // Event handlers/callbacks
    const handleSort = (method) => {
        setMenuView(null);
        setSortMethod(method);
    }

    const handleMenu = (event) => {
        setMenuView(event.currentTarget);
    }

    const handleClose = () => {
        setMenuView(null);
    }

    const handleSearch = debounce((newSearch) => {
        setSearchVal(newSearch);
    }, 200)

    return (
        <div>
            <AmplifyBar loggedIn={true} searchCallback={handleSearch}/>
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
                    </Menu>
                </div>
                <div className={"ToDoList"}>
                    <TodoList/>
                </div>
            </div>
        </div>
    )
}

export default withAuthenticator(App);
