import React from "react";

const TodoList = ({
  todos,
  handleCheckClick,
  handleDelete,
  handleCheckboxChange,
}) => {
  return (
    <ul className="allTodos">
      {todos?.map((t) => (
        <li className="singleTodo" key={t.id}>
          <span className="todoText" key={t.id}>
            {t.title}
          </span>
          <input
            type="checkbox"
            className="checkBox"
            checked={t.completed}
            onChange={() => handleCheckboxChange()}
            onClick={() => handleCheckClick(t.id)}
          />
          <button onClick={() => handleDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
