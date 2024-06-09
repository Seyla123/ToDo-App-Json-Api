import { createContext,useState,useCallback } from "react";
import {  message } from "antd";
import moment from "moment";
import axios from "axios";
const TodosContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const fetchTodo = useCallback(async () => {
      try {
        const response = await fetch('http://localhost:3001/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data);

      } catch (error) {
        console.log("Erorr : ",error.message)
      } 
    },[])

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
    await fetchTodo();
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
      const updateCheck = {
        ...newTodos[find],
        completed: newTodos[find].completed,
        completedAt:completedTime,
        }
      await axios.put(`http://localhost:3001/todos/${id}`,updateCheck)
      newTodos[find].completed ? message.success("Task completed!") : message.warning("Task not completed yet!");
      await fetchTodo();

    } catch (error) {
      console.log("Check box got Erorr : ", error);
    }
  };
  const removeTodo = async (id) => {
    try {
        const find = todos.find((todo) => todo.id == id);
        await axios.put(`http://localhost:3001/todos/${id}`,{
            ...find,
            isDeleted: true,
        });
        await fetchTodo();
        message.error("Task removed");
    } catch (error) {
      console.log("Can't Remove Task Erorr : ", error.message);
    }
  }
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
    await fetchTodo();
    message.success("Task updated!");

    } catch (error) {
      console.log("Update Task got Erorr : ", error);
    }
  }
  const recoverTask =async (id)=>{
    try {
        const find = todos.find((todo) => todo.id == id);
        await axios.put(`http://localhost:3001/todos/${id}`,{
            ...find,
            isDeleted: false,
        });
        await fetchTodo();
        message.info("Task Recovered");
    } catch (error) {
      console.log("Can't Recover Task Erorr : ", error.message);
    }
  }
  const valueToShare = {
    todos,
    fetchTodo,
    createTask,
    updateTask,
    checkedBox,
    removeTodo,
    recoverTask,
  };
  return <TodosContext.Provider value={valueToShare}>{children}</TodosContext.Provider>;
}
export {Provider}
export default TodosContext;
