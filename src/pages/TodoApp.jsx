import React, { useState, useEffect } from "react";
import { Input, Button, List, Checkbox, message } from "antd";
import moment from "moment";
import axios from "axios";

const TodoApp = () => {
  const FetchTodo = async () => {
    const response = await axios.get("http://127.0.0.1:3001/todos");
    setTodos(response.data);
  };
  useEffect(() => {
    FetchTodo();
  }, []);

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTask, seteditingTask] = useState("");

  const addTodo = async () => {
    if (!newTodo) {
      message.error("Please enter a Task");
      return;
    }
    const now = new Date();

    await axios.post("http://localhost:3001/todos", {
      task: newTodo,
      completed: false,
      createdAt: moment(now).format("YYYY-MM-DD HH:mm:ss"),
      editedAt: null,
    });
    setTodos([
      ...todos,
      {
        task: newTodo,
        completed: false,
        createdAt: moment(now).format("YYYY-MM-DD HH:mm:ss"),
        editedAt: null,
      },
    ]);
    setNewTodo("");
    message.success("Task added!");
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    newTodos[id].completed = !newTodos[id].completed;
    newTodos[id].completed
      ? message.success("Task completed!")
      : message.warning("Task not completed yet!");
    setTodos(newTodos);
  };

  const removeTodo = async (id) => {
    await axios.delete(`http://localhost:3001/todos/${id}`);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    message.error("Task removed");
  };
  const startEditing = (id) => {
    setEditingId(id);
    seteditingTask(todos[id].task);
  };

  // Save the edited todo item with the current timestamp
  const saveEditing = () => {
    const now = new Date();
    const newTodos = [...todos];
    newTodos[editingId].task = editingTask;
    newTodos[editingId].editedAt = moment(now).format("YYYY-MM-DD HH:mm:ss");
    setTodos(newTodos);
    setEditingId(null);
    seteditingTask("");
    message.success("Task updated!");
  };
  return (
    <div className=" w-full h-screen">
      <div className="max-w-3xl mx-auto mt-10 p-5 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-5">Todo App</h1>
        <div className="flex items-center mb-5">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onPressEnter={addTodo}
            placeholder="Add a new Task"
            className="mr-2"
          />
          <Button type="primary" onClick={addTodo}>
            Add
          </Button>
        </div>
        <List
          bordered
          dataSource={todos}
          renderItem={(todo, id) => (
            <List.Item
              actions={[
                editingId === id ? (
                  <>
                    <Button type="link" onClick={saveEditing}>
                      Save
                    </Button>
                    <Button type="link" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="link" onClick={() => startEditing(id)}>
                      Edit
                    </Button>
                    <Button type="link" onClick={() => removeTodo(todo.id)}>
                      Remove
                    </Button>
                  </>
                ),
              ]}
            >
              <div className="flex flex-col">
                {editingId === id ? (
                  <Input
                    value={editingTask}
                    onChange={(e) => seteditingTask(e.target.value)}
                    onPressEnter={saveEditing}
                    className="mr-2"
                  />
                ) : (
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggleTodo(id)}
                  >
                    <span className={todo.completed ? "line-through" : ""}>
                      {todo.task}
                    </span>
                  </Checkbox>
                )}
                <div className="text-sm text-gray-500">
                  <div>Created at: {todo.createdAt}</div>
                  {todo.editedAt && <div>Last edited at: {todo.editedAt}</div>}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TodoApp;
