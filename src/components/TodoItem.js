import React, { useRef, useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // import the styles

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;

  const inputRef = useRef(true);
  const [dueDate, setDueDate] = useState(new Date(item.dueDate)); // state to manage due date
  const [showDatePicker, setShowDatePicker] = useState(false); // state to manage date picker visibility
  const [isEditing, setIsEditing] = useState(false); // state to track editing state

  useEffect(() => {
    // Retrieve due date from local storage when component mounts
    const storedDate = localStorage.getItem(`dueDate_${item.id}`);
    if (storedDate) {
      setDueDate(new Date(storedDate));
    }
  }, [item.id]);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    setIsEditing(true); // Set editing state to true when clicking on edit button
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      // here 13 is key code for enter key
      updateTodo({ id, item: value, dueDate });
      inputRef.current.disabled = true;
      setIsEditing(false); // Set editing state to false after updating
    }
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    // Store selected date in local storage
    localStorage.setItem(`dueDate_${item.id}`, date.toISOString());
  };

  return (
    <li className="card">
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="deadline">
        {isEditing && (
          <button
            className="date-picker-btn"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            📅
          </button>
        )}
        {showDatePicker && (
          <DatePicker
            selected={dueDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy" // Set date format
          />
        )}
        <span>
          {dueDate && !isEditing && (
            // Show formatted date when not editing
            dueDate.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          )}
        </span>
      </div>
      <div className="btns">
        <button onClick={() => changeFocus()}>
          {" "}
          <AiFillEdit />{" "}
        </button>
        {item.completed === false && (
          <button style={{ color: "green" }} onClick={() => completeTodo(item.id)}>
            <IoCheckmarkDoneSharp />
          </button>
        )}
        <button style={{ color: "red" }} onClick={() => removeTodo(item.id)}>
          {" "}
          <IoClose />
        </button>{" "}
      </div>
      {item.completed && <span className="completed">done</span>}
    </li>
  );
};

export default TodoItem;
