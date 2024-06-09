import React, { useState, useEffect } from "react";
import { Input, Button, List, Checkbox, message } from "antd";

import useTodosContext from "../hooks/use-todos-context";
const TodoApp = () => {
  const {fetchTodo,createTask,checkedBox,updateTask,removeTodo , todos,recoverTask} = useTodosContext();
  useEffect(() => {
    fetchTodo();
    
  }, [fetchTodo]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTask, seteditingTask] = useState("");
  const filter = todos.filter(todo => todo.isDeleted == false)
  const filterDeleted = todos.filter(todo => todo.isDeleted == true)
  const addTodo = async () => {
    if (!newTodo) {
      message.error("Please enter a Task");
      return;
    }
    createTask(newTodo);
    setNewTodo("");
  };

  const startEditing = (id) => {
    setEditingId(id);
    const find = todos.find((todo) => todo.id === id);
    seteditingTask(find.task);
  };

  // Save the edited todo item with the current timestamp
  const saveEditing = async () => {
    updateTask(editingId,editingTask)
    setEditingId(null);
    seteditingTask("");
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
                    onChange={(e) => seteditingTask(e.target.value)}
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
                  <div>Created at: {todo.createdAt}</div>
                  {todo.editedAt && <div>Last edited at: {todo.editedAt}</div>}
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
  );
};

export default TodoApp;
