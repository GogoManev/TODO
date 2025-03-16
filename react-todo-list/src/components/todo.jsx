import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./todo.css";
import { useEffect, useState } from "react";

export default function Todo() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [filter, setFilter] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setFilter(tasks);
    }, [tasks]);

    function handleChange(event){
        setNewTask(event.target.value);
    }

    function handleChangeDescription(event){
        setNewDescription(event.target.value);
    }


    function addTask(){
        if (newTask === "") {
            alert("Please enter a task");
        } else if (tasks.some(task => task.text === newTask)) {
            alert("Task already exists");
        } else {
            setTasks([...tasks, { text: newTask, isComplete: false, description: newDescription }]);
            setNewTask("");
            setNewDescription("");
        }
    }

    function completeTask(index){
        const newTasks = [...tasks];
        newTasks[index].isComplete = !newTasks[index].isComplete;
        setTasks(newTasks);
    }

    function deleteTask(index){
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    function filterTasks(index){
        if(index === 0){
            setFilter(tasks);
        }
        else if(index === 1){
            setFilter(tasks.filter(tasks => !tasks.isComplete));
        }
        else if(index === 2){
            setFilter(tasks.filter(tasks => tasks.isComplete));
        }
    }
    
    return (
        <div className="ToDo">
          <h1>TO DO</h1> <br />

          <Form>
            <Form.Label className='label'> Enter Task </Form.Label> <br />
            <Form.Control className="textbox" id="task" type="text" placeholder="task name..." onChange={handleChange} value={newTask} />
            <Form.Control className="textbox" id="description" type="text" placeholder="description..." 
                onChange={handleChangeDescription} value={newDescription} /> <br />
            <Button className="submit" variant="primary" type="button" onClick={addTask}> ✔️ Submit </Button> <hr />
            <Form.Label className='label'> Tasks </Form.Label> <br /> 
            <a>Sort by:</a> <br />
            <Button className="filter" variant="info" onClick={() => filterTasks(0)}> 📃 All </Button>
            <Button className="filter" variant="info" onClick={() => filterTasks(1)}> ❌ Uncompleted </Button>
            <Button className="filter" variant="info" onClick={() => filterTasks(2)}> ✅ Completed </Button>

            <ul>
                {filter.map((task, index) =>(
                    <li key={index}>
                        <span className="text" style={{ textDecoration: task.isComplete ? "line-through" : "none", 
                            "color": task.isComplete ? "green" : "red" }}>
                            {task.text}
                        </span>
                        <br />
                        <a className="description" style={{ textDecoration: task.isComplete ? "line-through" : "none" }}>
                            {task.description} 
                        </a>
                        <br /> 
                        <div className="actions">
                            <Button className="complete" variant="warning" onClick={() => completeTask(index)}>
                                {task.isComplete ? " ❌ Uncomplete" : " ✅ Complete"}
                            </Button>
                            <Button className="delete" variant="danger" onClick={() => deleteTask(index)}> 🗑️ Delete </Button>
                        </div>
                    </li>
                ))}
            </ul>

          </Form>
        </div>
    )
}

