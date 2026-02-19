import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden">

      {/* Subtle Premium Glow */}
      <div className="absolute w-[700px] h-[700px] bg-amber-400/5 blur-[160px] rounded-full top-[-250px] left-[-250px]" />
      <div className="absolute w-[600px] h-[600px] bg-amber-300/5 blur-[160px] rounded-full bottom-[-250px] right-[-250px]" />

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-24 items-center">

        {/* Left - Login Card */}
        <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-3xl p-14 shadow-2xl">

          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Let's get things done..
          </h2>

          <p className="text-neutral-400 text-sm mb-12 leading-relaxed max-w-sm">
            Stay organized. Stay focused. Stay ahead.
          </p>

          <div className="space-y-7">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@gmail.com"
                className="w-full px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-200 hover:border-neutral-600"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-5 py-3 rounded-xl bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-200 hover:border-neutral-600"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-semibold transition duration-300 shadow-md shadow-amber-500/20"
            >
              Sign In
            </button>
          </div>

          <p className="text-sm text-neutral-400 text-center mt-12">
            No account?{" "}
            <Link
              to="/register"
              className="text-amber-400 hover:text-amber-300 font-medium transition"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Right - Visual */}
        <div className="hidden md:flex justify-center items-center">
          <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-xl">
            <img
              src="/gif_login.gif"
              alt="Task management illustration"
              className="rounded-2xl opacity-80 max-h-[460px]"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
