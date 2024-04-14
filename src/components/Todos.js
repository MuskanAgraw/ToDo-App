import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import the styles

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const [dueDate, setDueDate] = useState(new Date()); // state to manage due date
  const [showDatePicker, setShowDatePicker] = useState(false); // state to manage date picker visibility

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        dueDate: dueDate.toISOString(), // Include dueDate in the todo object
        completed: false,
      });
      setTodo("");
      setDueDate(new Date()); // Reset dueDate after adding task
      setShowDatePicker(false); // Hide date picker after adding task
    }
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
        placeholder="Add a new task..."
      />
      {showDatePicker && (
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
          autoFocus
          className="transparent-date-picker"
        />
      )}
      <button
        className="date-picker-btn"
        style={{
          background: showDatePicker ? "transparent" : "none",
          width: "40px", // Square shape
          height: "40px", // Square shape
          fontSize: "24px", // Increase icon size
          margin: "5px",
        }}
        onClick={() => setShowDatePicker(!showDatePicker)}
      >
        📅
      </button>
      <button className="add-btn" onClick={() => add()}>
        <GoPlus />
      </button>
      <br />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
