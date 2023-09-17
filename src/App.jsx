import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  // setting fetched data into local storage
  const setToLocalStorage = (list) => {
    localStorage.setItem("list", JSON.stringify(list));
    const retrievedData = JSON.parse(localStorage.getItem("list"));
    // console.log(retrievedData);
    setTodos(retrievedData);
  };

  const getTodos = async () => {
    //GET request to fetch all the todo
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await data.json();
    setToLocalStorage(res);
    // setTodos(res);
  };

  useEffect(() => {
    // if there are any item then get from localstoreage or get from API
    if (localStorage.getItem("list") !== null) {
      const retrievedData = JSON.parse(localStorage.getItem("list"));
      console.log(retrievedData);
      setTodos(retrievedData);
      return;
    }
    getTodos();
  }, []);

  const handleCheckboxChange = () => {};

  const handleCheckClick = (id) => {
    // PUT request to update a todo
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: json.completed } : todo
        );
        // setTodos(updatedTodos);
        setToLocalStorage(updatedTodos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = async (id) => {
    //DELETE request
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newList = todos.filter((t) => t.id !== id);

      setToLocalStorage(newList);
      console.log("Deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCreateTodo = async () => {
    // POST request to create a new todo
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todo, completed: false, id: Date.now() }),
    });

    const data = await response.json();
    console.log(data);
    setToLocalStorage([data, ...todos]);
    setTodo("");
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>

        <TodoForm
          todo={todo}
          setTodo={setTodo}
          handleCreateTodo={handleCreateTodo}
        />

        <TodoList
          todos={todos}
          handleCheckboxChange={handleCheckboxChange}
          handleCheckClick={handleCheckClick}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
