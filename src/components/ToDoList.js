import React, {useEffect, useState} from "react";
import {deleteTodo} from '../graphql/mutations.js';
import {API, graphqlOperation} from "aws-amplify";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import {Button} from "@mui/material";
import {SortOutlined} from "@mui/icons-material"

const ToDoList = ({todos, onRemove}) => {
    const [localToDo, setlocalToDo] = useState(todos);
    const [sortMethod, setSortMethod] = useState('title');

    useEffect(() => {
        const sortArray = method => {
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

    return (
        <div>
            <Button variant={"outlined"} endIcon={<SortOutlined/>} onChange={}/>
            <div>
                {
                    localToDo.map((todo, index) => (
                        <div key={todo.id ? todo.id : index} className={"ToDoList"}>
                            <ToDoItem todo={todo} handleDelete={handleDelete}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default ToDoList;