import { useState, useEffect } from "react"
import ToDoInput from "./component/todoInput"
import ToDoList from "./component/ToDoList"

function App() {

  const [todos, setTodos] = useState([])

  const [todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({
      todos: newList
    }))
  }

  function handleAddTodos(newTodo){
    const newTodolist = [...todos, newTodo]
    persistData(newTodolist)
    setTodos(newTodolist)
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if (!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos){
      return 
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  return (
    <main>
      <ToDoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <ToDoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
    </main>
  )
}

export default App
