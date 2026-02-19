import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
    setFile(null);
    setEditingId(null);
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!title.trim()) {
      setErrorMessage("Title is required.");
      return false;
    }
    return true;
  };

  const handleCreateTask = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("due_date", dueDate);

      if (file) {
        formData.append("file", file);
      }

      await axios.post(`${API}/api/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTask = async () => {
    if (!editingId) return;
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      await axios.put(
        `${API}/api/tasks/${editingId}`,
        {
          title,
          description,
          status,
          due_date: dueDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    await axios.delete(`${API}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen bg-black text-white px-8 py-12 overflow-hidden">
      {/* Premium Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-amber-400/5 blur-[160px] rounded-full top-[-250px] left-[-250px]" />
      <div className="absolute w-[600px] h-[600px] bg-amber-300/5 blur-[160px] rounded-full bottom-[-250px] right-[-250px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-14">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Design Your Day!
            </h1>
            <p className="text-neutral-400 mt-2 text-sm">
              “Productivity is never an accident.”
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>

        {/* Form Section */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-10 shadow-2xl mb-14 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-8">
            {editingId ? "Refine Your Task" : "Craft a New Task"}
          </h2>

          {errorMessage && (
            <p className="text-red-400 mb-4">{errorMessage}</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <input
              type="text"
              placeholder="Short Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            {!editingId && (
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="bg-neutral-800 border border-neutral-700 text-neutral-300 px-5 py-3 rounded-xl"
              />
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={editingId ? handleUpdateTask : handleCreateTask}
              disabled={submitting}
              className={`px-8 py-3 rounded-xl font-semibold transition duration-300 ${
                submitting
                  ? "bg-neutral-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black shadow-lg shadow-amber-500/20"
              }`}
            >
              {submitting
                ? "Processing..."
                : editingId
                ? "Update Task"
                : "Create Task"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="text-center text-neutral-500 py-12">
            Loading your tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-neutral-600 py-12">
            No tasks yet. Build your first masterpiece..
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-lg space-y-5 hover:border-amber-400/40 transition duration-300"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">
                    {task.title}
                  </h3>

                  <span
                    className={`px-4 py-1 text-xs rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-neutral-400 text-sm">
                  {task.description}
                </p>

                <div className="text-neutral-500 text-xs">
                  Due: {task.due_date?.split("T")[0]}
                </div>

                
                {task.file_url && (
                  <div className="mt-4">
                    {task.file_url.match(/\.(jpeg|jpg|png|gif|avif)$/i) ? (
                      <img
                        src={`${API}${task.file_url}`}
                        alt="Task Attachment"
                        className="w-full h-64 rounded-2xl object-cover border border-neutral-800 shadow-inner"
                      />
                    ) : task.file_url.match(/\.pdf$/i) ? (
                      <iframe
                        src={`${API}${task.file_url}`}
                        className="w-full h-64 rounded-xl border border-neutral-700"
                        title="PDF Preview"
                      />
                    ) : (
                      <a
                        href={`${API}${task.file_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline text-sm"
                      >
                        View File
                      </a>
                    )}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setTitle(task.title);
                      setDescription(task.description);
                      setStatus(task.status);
                      setDueDate(task.due_date?.split("T")[0]);
                    }}
                    className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-5 py-2 rounded-xl bg-red-600/80 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
