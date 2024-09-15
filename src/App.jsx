import React, { useEffect, useState } from 'react'
import Home from './Home'
import styles from './App.module.css'
import TodoList from './TodoList';
import cat from './cat-paw.png';

export default function App() {
  const initialState=JSON.parse(localStorage.getItem("todos"))||[];
  const[input,setInput]=useState('');
  const[todos,setTodos]=useState(initialState);
  const [editTodo,setEditTodo]=useState(null);

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <>
    <div className={`container m-auto ${styles.body} ` } >
      <div className="row">
        <div >
          <Home
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          />
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        </div>
      </div>
      <img src={cat} alt="cat-pint" className='col-md-4 position-absolute cat'/>
    </div>
    
    </>
  )
}

