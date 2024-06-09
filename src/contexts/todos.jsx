import { createContext,useState,useEffect } from "react";
import {  message } from "antd";
import moment from "moment";
import axios from "axios";
const TodosContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const fetchTodo = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
        console.log("Erorr : ",error.message)
      } 
    };

  const createTask= async (addNewTask) => {
    try {
      const now = new Date();

    await axios.post("http://localhost:3001/todos", {
      task: addNewTask,
      completed: false,
      createdAt: moment(now).format("YYYY-MM-DD HH:mm:ss"),
      editedAt: null,
      isDeleted : false,
    });
    setTodos([
      ...todos,
      {
        task: addNewTask,
        completed: false,
        createdAt: moment(now).format("YYYY-MM-DD HH:mm:ss"),
        editedAt: null,
        isDeleted : false,
      },
    ]);
    message.success("Task added!");
      
    } catch (error) {
      console.log("create task got erorr at ", error);
    }
  }
  const checkedBox = async (id) => {
    try {
      const now = new Date();
      const newTodos = [...todos];
      const find = newTodos.findIndex(todo => todo.id===id)
      newTodos[find].completed = !newTodos[find].completed;
      const completedTime = newTodos[find].completed ?  moment(now).format("YYYY-MM-DD HH:mm:ss") :  null;
      await axios.put(`http://localhost:3001/todos/${id}`,{
        ...newTodos[find],
        completed: newTodos[find].completed,
        completedAt:completedTime,

    })
    newTodos[find].completed
      ? message.success("Task completed!")
      : message.warning("Task not completed yet!");
    setTodos(newTodos);
    } catch (error) {
      console.log("Check box got Erorr : ", error);
    }
  };
  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      message.error("Task removed");
    } catch (error) {
      console.log("Can't Remove Task Erorr : ", error);
    }
  };
  const updateTask = async (id,newTask)=>{
    try {
      const now = new Date();
      const newTodos = [...todos];
      const findIndex = todos.findIndex((todo) => todo.id === id);
      await axios.put(`http://localhost:3001/todos/${id}`,{
      ...newTodos[findIndex],
      task : newTask,
      editedAt : moment(now).format("YYYY-MM-DD HH:mm:ss"),
    })
    newTodos[findIndex].task = newTask;
    newTodos[findIndex].editedAt = moment(now).format("YYYY-MM-DD HH:mm:ss");
    setTodos(newTodos);
    message.success("Task updated!");

    } catch (error) {
      console.log("Update Task got Erorr : ", error);
    }
  }
  const valueToShare = {
    todos,
    fetchTodo,
    createTask,
    updateTask,
    checkedBox,
    removeTodo,
  };
  return <TodosContext.Provider value={valueToShare}>{children}</TodosContext.Provider>;
}
export {Provider}
export default TodosContext;
