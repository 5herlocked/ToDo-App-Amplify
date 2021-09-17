import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Amplify, {API, graphqlOperation} from "aws-amplify";
import {createTodo} from "./graphql/mutations";
import {listTodos} from "./graphql/queries";

import awsExports from './aws-exports';
import ToDoItem from "./components/ToDoItem";

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

    return (
        <div style={styles.container}>
            <h2>Amplify Todos</h2>
            <input
                onChange={event => setInput('name', event.target.value)}
                style={styles.input}
                value={formState.name}
                placeholder="Name"
            />
            <input
                onChange={event => setInput('description', event.target.value)}
                style={styles.input}
                value={formState.description}
                placeholder="Description"
            />
            <Button variant="contained" style={styles.button} onClick={addTodo}>Create Todo</Button>

            {
                todos.map((todo, index) => (
                    <div key={todo.id ? todo.id : index} style={styles.todo}>
                        {ToDoItem(todo.name, todo.description)}
                    </div>
                ))
            }
        </div>
    )
}

const styles = {
    container: {
        width: 400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    todo: {marginBottom: 15},
    input: {border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
    todoName: {fontSize: 20, fontWeight: 'bold'},
    todoDescription: {marginBottom: 0},
    button: {backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px'}
}

export default App;
