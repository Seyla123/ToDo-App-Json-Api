import { createContext } from "react";

const todosContext = createContext(null);

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTask, seteditingTask] = useState("");
  const FetchTodo = async () => {
    const response = await axios.get("http://127.0.0.1:3001/todos");
    setTodos(response.data);
  };
  useEffect(() => {
    FetchTodo();
  }, []);

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

  const toggleTodo = async (id) => {
    const now = new Date();
    const newTodos = [...todos];
    const find = newTodos.findIndex((todo) => todo.id === id);
    newTodos[find].completed = !newTodos[find].completed;
    const completedTime = newTodos[find].completed
      ? moment(now).format("YYYY-MM-DD HH:mm:ss")
      : null;
    await axios.put(`http://localhost:3001/todos/${id}`, {
      ...newTodos[find],
      completed: newTodos[find].completed,
      completedAt: completedTime,
    });
    newTodos[find].completed
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
    const find = todos.find((todo) => todo.id === id);
    seteditingTask(find.task);
  };

  // Save the edited todo item with the current timestamp
  const saveEditing = async () => {
    const now = new Date();
    const newTodos = [...todos];
    const findIndex = todos.findIndex((todo) => todo.id === editingId);
    await axios.put(`http://localhost:3001/todos/${editingId}`, {
      ...newTodos[findIndex],
      task: editingTask,
      editedAt: moment(now).format("YYYY-MM-DD HH:mm:ss"),
    });

    newTodos[findIndex].task = editingTask;
    newTodos[findIndex].editedAt = moment(now).format("YYYY-MM-DD HH:mm:ss");
    setTodos(newTodos);
    setEditingId(null);
    seteditingTask("");
    message.success("Task updated!");
  };

  const valueToShare = {
  };
  return <todosContext.Provider>{children}</todosContext.Provider>;
}

export default Provider;
