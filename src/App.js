import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Amplify, {API, graphqlOperation} from "aws-amplify";
import {createTodo} from "./graphql/mutations";
import {listTodos} from "./graphql/queries";

import styles from './App.css';

import awsExports from './aws-exports';
import {withAuthenticator} from "@aws-amplify/ui-react";
import ToDoList from "./components/ToDoList";
import {TextField} from "@mui/material";
import AmplifyBar from "./components/AmplifyBar";

Amplify.configure(awsExports);

const initState = {name: '', description: ''}

const App = () => {
    const [formState, setFormState] = useState(initState);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, [])

    function setInput(key, value) {
        setFormState({...formState, [key]: value});
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

    async function addTodo() {
        try {
            // basic validation
            if (!formState.name || !formState.description) return

            const todo = {...formState};
            // create an array of all previous todos with the new todo
            setTodos([...todos, todo]);
            // reset to default of empty, empty
            setFormState(initState);

            await API.graphql(graphqlOperation(createTodo, {input: todo}));
        } catch (err) {
            console.log('error creating todo: ', err);
        }
    }

    function handleDelete(id) {
        // Saves network traffic by locally removing the item after
        // a network request has been sent
        const newTodos = todos.filter((item) => item.id !== id);

        setTodos(newTodos);
    }

    return (
        <div style={styles.App}>
            <AmplifyBar/>
            <div>
                <TextField
                    onChange={event => setInput('name', event.target.value)}
                    style={styles.input}
                    value={formState.name}
                    placeholder="Name"
                />
                <TextField
                    onChange={event => setInput('description', event.target.value)}
                    style={styles.input}
                    value={formState.description}
                    placeholder="Description"
                />
            </div>
            <Button variant="contained" style={styles.button} onClick={addTodo}>Create Todo</Button>
            <div style={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
            }}>
                <ToDoList todos={todos} onRemove={handleDelete}/>
            </div>
        </div>
    )
}

export default withAuthenticator(App);
