import { useState, useEffect } from "react";

function Main() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [alltodos, setAlltodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("itms"));
    return savedTodos || [];
  });

  const [completedTodos, setCompletedtodos] = useState(() => {
    const savedCompletedTodos = JSON.parse(localStorage.getItem("compl"));
    return savedCompletedTodos || [];
  });

  useEffect(() => {
    localStorage.setItem("itms", JSON.stringify(alltodos));
  }, [alltodos]);

  useEffect(() => {
    localStorage.setItem("compl", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const HandleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const HandleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const HandleAddTodo = () => {
    let obj = {
      title: title,
      desc: desc,
    };

    if (title !== "" && desc !== "") {
      setAlltodos((prevTodos) => [...prevTodos, obj]);
    }
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...alltodos];
    reducedTodo.splice(index, 1);

    setAlltodos(reducedTodo);
  };

  const handleCompleteDeletetodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    setCompletedtodos(reducedTodo);
  };

  const handleCompleteTodo = (index) => {
    let reducedTodo = [...alltodos];
    let completedTodo = reducedTodo.splice(index, 1)[0];

    setAlltodos(reducedTodo);
    setCompletedtodos((prevCompletedTodos) => [
      ...prevCompletedTodos,
      completedTodo,
    ]);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="title" className="text-gray-700 text-lg font-semibold">
          Title:
          <input
            name="title"
            placeholder="Write Your Title Here"
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={title}
            onChange={HandleTitleChange}
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="text-gray-700 text-lg font-semibold"
        >
          Description:
          <input
            name="description"
            placeholder="Write Your Description Here"
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={desc}
            onChange={HandleDescChange}
          />
        </label>
      </div>
      <div className="flex justify-center">
        <button
          onClick={HandleAddTodo}
          className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600 transition duration-200 flex items-center"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Todo
        </button>
      </div>

      <div
        className="task-list-container mt-8 overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        <h2 className="text-xl mb-4 text-gray-700">Todo List</h2>
        {alltodos.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-4 p-2 border border-gray-200 rounded shadow"
          >
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteTodo(index)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <button
              className="ml-2 text-green-500 hover:text-green-700"
              onClick={() => handleCompleteTodo(index)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div
        className="task-list-container mt-8 overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        <h2 className="text-xl mb-4 text-gray-700">Completed List</h2>
        {completedTodos.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-4 p-2 border border-gray-200 rounded shadow"
          >
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleCompleteDeletetodo(index)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
