import React, { useState } from "react";
import "./App.css";

function App() {
  interface Todo {
    id:number,
    text:string,
    isEditing:boolean
  }
  const [inputData, setInputData] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  

  const handleSave = () => {
    if (inputData.trim() === "") {
      // Optional: Prevent saving empty todos
      alert("Please enter a valid todo.");
      return;
    }
  
    const newTodo: Todo = { 
      id: Date.now(), 
      text: inputData, 
      isEditing: false 
    };
  
    setTodos([...todos, newTodo]);
    setInputData(""); 
  };

  const handleDelete = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleEdit = (id:number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleEditChange = (e:React.ChangeEvent<HTMLInputElement>, id:number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: e.target.value } : todo
      )
    );
  };

  const handleEditSave = (id:number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    );
  };
  return (
    <div className="App">
      <>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Todo App</h1>

          <div className="mb-6 w-full max-w-md">
            <input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a new todo"
            />
            <button
              type="button"
              onClick={handleSave}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Todo
            </button>
          </div>

          <div className="w-full max-w-md bg-white p-4 rounded-md shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              All Todos
            </h1>
            <ul className="space-y-4">
              {todos.map((todo) => (
                <li key={todo.id} className="flex justify-between items-center">
                  {todo.isEditing ? (
                    <div className="w-full flex space-x-2">
                      <input
                        type="text"
                        value={todo.text}
                        onChange={(e) => handleEditChange(e, todo.id)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleEditSave(todo.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center w-full">
                      <span className="text-gray-700">{todo.text}</span>
                      <div className="space-x-2">
                        <button
                          type="button"
                          onClick={() => toggleEdit(todo.id)}
                          className="text-blue-500 hover:text-blue-700 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(todo.id)}
                          className="text-red-500 hover:text-red-700 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
