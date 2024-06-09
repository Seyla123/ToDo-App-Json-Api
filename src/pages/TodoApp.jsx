import React, { useState, useEffect } from "react";
import { Input, Button, List, Checkbox, message } from "antd";
import UserProfile from "../components/UserProfile"; // Import the UserProfile component
import useTodosContext from "../hooks/use-todos-context";



const TodoApp = () => {
  const { fetchTodo, createTask, checkedBox, updateTask, removeTodo, todos, recoverTask } = useTodosContext();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [user, setUser] = useState({ name: "Seav Seyla", avatar: "https://via.placeholder.com/64" });

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const filter = todos.filter(todo => !todo.isDeleted);
  const filterDeleted = todos.filter(todo => todo.isDeleted);

  const addTodo = async () => {
    if (!newTodo) {
      message.error("Please enter a Task");
      return;
    }
    createTask(newTodo);
    setNewTodo("");
    message.success("Task added successfully!");
  };

  const startEditing = (id) => {
    setEditingId(id);
    const find = todos.find((todo) => todo.id === id);
    setEditingTask(find.task);
  };

  const saveEditing = async () => {
    updateTask(editingId, editingTask);
    setEditingId(null);
    setEditingTask("");
    message.success("Task updated successfully!");
  };

  return (
    <div className="w-full h-screen ">
      <div className="max-w-3xl mx-auto mt-10 p-5">
        <UserProfile user={user} />
        <div className="bg-white p-5 rounded shadow">
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
            dataSource={filter}
            renderItem={(todo) => (
              <List.Item
                actions={[
                  editingId === todo.id ? (
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
                      <Button type="link" onClick={() => startEditing(todo.id)}>
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
                  {editingId === todo.id ? (
                    <Input
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      onPressEnter={saveEditing}
                      className="mr-2"
                    />
                  ) : (
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => checkedBox(todo.id)}
                    >
                      <span className={todo.completed ? "line-through" : ""}>
                        {todo.task}
                      </span>
                    </Checkbox>
                  )}
                  <div className="text-sm text-gray-500">
                    <div>Created at: {new Date(todo.createdAt).toLocaleString()}</div>
                    {todo.editedAt && <div>Last edited at: {new Date(todo.editedAt).toLocaleString()}</div>}
                  </div>
                </div>
              </List.Item>
            )}
          />
          <h2 className="text-xl font-bold mt-10">Deleted Todos</h2>
          <List
            bordered
            dataSource={filterDeleted}
            renderItem={(todo) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => recoverTask(todo.id)}>
                    Recover
                  </Button>,
                ]}
              >
                <div className="flex flex-col">
                  <span>{todo.task}</span>
                  <div className="text-sm text-gray-500">
                    <div>Created at: {new Date(todo.createdAt).toLocaleString()}</div>
                    {todo.editedAt && <div>Last edited at: {new Date(todo.editedAt).toLocaleString()}</div>}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
