import React, { useState } from 'react'
import styles from "./App.module.css" 

export default function TodoList({todos,setTodos,setEditTodo}) {
    const [className,setClassName]=useState(false)
    const handleDelete=({id})=>{
        setTodos(todos.filter((todo)=>todo.id !== id))
    }
    const handleComplete=(todo)=>{
        setClassName(!className);
        setTodos(todos.map
            ((item)=>{
                if(item.id ===todo.id){ 
                    return {...item,completed: !item.completed }
                 }
            return item;
        }))
    };
    const handleEdit=({id})=>{
        const findTodo=todos.find((todo)=>todo.id === id);
        setEditTodo(findTodo);
    }
  return (
    <div>
        <div className={styles.list}>
        {todos.map((todo,index) => (
            <li className='list-it mb-2' key={index}>   
                <input type='text' value={todo.title}
                 onChange={(event)=> event.preventDefault()} 
                 style={{textDecoration:todo.completed ? "line-through" : "none",}}
                className={`${styles.inpotTask} ${todo.completed} ? "complete" : "" `}    
                /> 
                <button className={`task-button mx-2 ${styles.button} `} 
                    onClick={()=>handleComplete(todo)}>
                    <i className='fa fa-check-circle'></i>
                </button> 
                <button className={`task-button button-edite ${styles.button}`} onClick={()=>handleEdit(todo)}>
                    <i className='fa fa-edit'></i>
                </button> 
                <button className={`task-button button-delete mx-2 ${styles.button}`}onClick={()=>handleDelete(todo)}>
                    <i className='fa fa-trash'></i>
                </button> 
            </li>
        ))}
        </div>
    </div>
  )
}
