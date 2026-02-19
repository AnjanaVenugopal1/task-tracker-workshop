import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;


const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/api/auth/register`
,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      alert("Account created successfully!");
      navigate("/");
    } catch (err: any) {
      console.error(err.response);
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">

      
      <div className="absolute w-[700px] h-[700px] bg-amber-400/5 blur-[160px] rounded-full top-[-250px] left-[-250px]" />
      <div className="absolute w-[600px] h-[600px] bg-amber-300/5 blur-[160px] rounded-full bottom-[-250px] right-[-250px]" />

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-24 items-center">


        <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-3xl p-14 shadow-2xl">

          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Create your workspace
          </h2>

          <p className="text-neutral-400 text-sm mb-10 leading-relaxed max-w-sm">
            Start organizing smarter. Productivity begins here.
          </p>

          <div className="space-y-7">

            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Chandler Bing"
                value={form.name}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              onClick={handleRegister}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition duration-300
                ${
                  loading
                    ? "bg-neutral-700 cursor-not-allowed text-neutral-400"
                    : "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black shadow-lg shadow-amber-500/20"
                }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

          <p className="text-sm text-neutral-400 text-center mt-12">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-amber-400 hover:text-amber-300 font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        
        <div className="hidden md:flex justify-center items-center">
          <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-xl">
            <img
              src="/register_gif.gif"
              alt="Register illustration"
              className="rounded-2xl opacity-80 max-h-[460px]"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
