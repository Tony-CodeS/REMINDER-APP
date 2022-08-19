import React, {useEffect, useState} from 'react'
import "./App.css"

function App() {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  })
// const [todos, setTodos] = useState([])
const [todo, setTodo] = useState("")
const [todoEditing, setTodoEditing] = useState(null)
const [Editingtext, setEditingtext] = useState("")

// useEffect(()=>{
//   const temp = localStorage.getItem("todos")
//   const loadedTodos = JSON.parse(temp)

//   if (loadedTodos){
//     setTodos(loadedTodos)
//   }
//  }, [])
// const [todos, setTodos] = useState(() => {
//   const savedTodos = localStorage.getItem("todos");
//   if (savedTodos) {
//     return JSON.parse(savedTodos);
//   } else {
//     return [];
//   }
// });



useEffect(()=>{
 const temp = JSON.stringify(todos)
localStorage.setItem("todos", temp)
}, [todos])






function handleSubmit(e){
e.preventDefault()


const newTodo ={
  id: new Date().getTime(),
  text:todo,
  completed:false
}

setTodos([...todos].concat(newTodo))
setTodo("")
}

function deleteTodo(id) {
  const updatedTodos =[...todos].filter((todo) => todo.id !== id)
  setTodos(updatedTodos)
}


function toggleComplete(id) {
const updatedTodos =[...todos].map((todo) => {
if(todo.id ===id)
{ todo.completed = !todo.completed}
    return todo
  })
  setTodos(updatedTodos)
}

function EditTodo(id){
const updatedTodos = [...todos].map((todo) =>{
  if(todo.id === id)
  { todo.text = Editingtext}
  return todo
})
setTodos(updatedTodos)
setTodoEditing(null)
setEditingtext("")
}

  return (
    <div className='form-container'>
      <h1> TODO_LIST</h1>
      <form onSubmit={handleSubmit}>
      <input type="text" id 
      ="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
      <button type="submit" id='submit-button'> ADD TODO</button>
      </form>

      {todos.map((todo) => <div key={todo.id} id="display-div">
    {todoEditing === todo.id ? ( <input type="text" id="edit" placeholder="Write your todo" onChange={(e) => setEditingtext(e.target.value)}  value={Editingtext}/>) :
     (  <div id='todo-list'>{todo.text} </div>)}
  
      <div>
      <input type="checkbox" onChange={()=> toggleComplete(todo.id)} checked={todo.completed} id="check"/>
      <button onClick={()=> deleteTodo(todo.id)} id="delete-button">Delete</button>
    {todoEditing === todo.id ? ( <button onClick={()=> EditTodo(todo.id)} id="delete-button">  submit Edit</button>):
     (  <button onClick={()=> setTodoEditing(todo.id)}  id="delete-button"> Edit</button>)}
      </div>

        </div>)}
    </div>
  )
}

export default App