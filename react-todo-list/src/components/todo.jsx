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
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleChange(event){
        setNewTask(event.target.value);
    }


    function addTask(){
        if(newTask === ""){
            alert("Please enter a task");
         }else if(newTask === tasks){
             alert("Task already exists");  
        }else{
            setTasks([...tasks, newTask]);
            setNewTask("");
        };
        
    }

    function completeTask(index){
        const newTasks = [...tasks];
        newTasks[index] +=  " - Completed";
        setTasks(newTasks);
    }

    function deleteTask(index){
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    
    return (
        <div className="ToDo">
          <a1> TODO (WIP) </a1> <br />

          <Form>
            <Form.Label className='label'> LIST </Form.Label> <br />
            <Form.Control id="task" type="text" placeholder="Enter task" onChange={handleChange} value={newTask} /> <br />
            {/* <Form.Control id="description" type="text" placeholder="Enter description" onChange={handleChange} value={newTask} /> <br /> */}
            <Button id="button" variant="primary" type="button" onClick={addTask}> Submit </Button>
          </Form>
          
          <ul>
            {tasks.map((task, index) => (
                <li key={index}>
                    <span className="text"> {task}</span>
                    <Button className="complete" variant="success" onClick={() => completeTask(index)}> Complete </Button>
                    <Button className="delete" variant="danger" onClick={() => deleteTask(index)}> Delete </Button>
                </li>
            ))}
          </ul>
        </div>
    )
}

