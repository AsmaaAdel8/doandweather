import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.scss'
import list from './bucket-list.png'

export default function Home({input,setInput,todos,setTodos,editTodo,setEditTodo}) {
  const updateTodo=(title,id,completed)=>{
    const newTodo=todos.map(
      (todo)=>todo.id===id?{title,id,completed}:todo)
    setTodos(newTodo);
    setEditTodo("");
  }
 
  useEffect(()=>{
    if(editTodo){
      setInput(editTodo.title)
      
    }else{
      setInput("")
    }
  },[setInput,editTodo])
  var onInpotChange= (event) =>{
    setInput(event.target.value);
  };
  if(input){
    var onFormSubmit= (event)=>{
      event.preventDefault();
        if(!editTodo){
          setTodos([...todos, { id:uuidv4(), title:input ,completed:false}]);
          setInput("");
        }else{
          updateTodo(input,editTodo.id,editTodo.completed)
        };
      };
  }
  
  let screen=Screen.availWidth;
  if(screen <="768px"){
    document.querySelector('.body').style.backgroundColor="#9486AC";
  }
  return (
    <>
    <div className='home' style={{marginTop:"4em"}}>
      <div className="flex justify-center items-center">
        <img src={list} alt="list-img" width={100} height={100}/>
        <h1 className='text-rose-950 font-bold mb-3' >Add your Tasks</h1>
      </div>
      <form onSubmit={onFormSubmit}>
        <input type="text" 
        placeholder='add your task'
        className='task-input form-control mb-3 text-center'
        value={input}
        onChange={onInpotChange}
        />
        <button className={`btn w-50 mb-5 ${styles.button}`} type='submit'>
          {editTodo?"OK":"Add"}
        </button>
      </form>
    </div>
    {/* <Edit editTodo={editTodo} /> */}
    </>
  )
}
