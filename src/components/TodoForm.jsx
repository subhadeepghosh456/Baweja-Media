import React from "react";

const TodoForm = ({ todo, setTodo, handleCreateTodo }) => {
  return (
    <form className="todoForm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Add Todo</button>
    </form>
  );
};

export default TodoForm;
