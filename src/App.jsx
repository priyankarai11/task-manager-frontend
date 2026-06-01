import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const getTasks = async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    setTasks(res.data);
  };

  const createTasks = async () => {
    await axios.post("http://localhost:3000/tasks", {
      title: text,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("add text first");
    }

    if (editId) {
      await updateTask();
    } else {
      await createTasks();
    }

    getTasks();
    setText("");
  };

  const deleteTask = async (id) => {
    if (!id) {
      alert("select any task to delete");
    }
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    getTasks();
  };

  const editTask = (val) => {
    setText(val.title);
    setEditId(val._id);
  };

  const updateTask = async () => {
    if (!editId) {
      alert("select any task to update");
    }
    await axios.put(`http://localhost:3000/tasks/${editId}`, {
      title: text,
    });
    setEditId(null);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        {editId ? <button>Update task</button> : <button>Create Task</button>}
      </form>
      {tasks?.map((ele) => {
        return (
          <div key={ele._id}>
            <p>{ele.title}</p>
            <button onClick={() => deleteTask(ele._id)}>delete </button>
            <button onClick={() => editTask(ele)}>Edit</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
