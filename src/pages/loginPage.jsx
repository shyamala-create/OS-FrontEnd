import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "role":
      return { ...state, role: action.payload };
    case "reset":
      return { name: "", email: "", password: "", role: "student" };
    default:
      return state;
  }
};

function Login() {
  const [inputValues, dispatch] = useReducer(reducer, {
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // toggle mode
  const navigate = useNavigate();

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        {
          email: inputValues.email,
          password: inputValues.password,
        },
        { withCredentials: true }
      );

      if (!res.data || !res.data.user) {
        setMessage("Login failed. Please try again.");
        return;
      }

      setMessage("Login Successful ✅");
      dispatch({ type: "reset" });
      navigate("/dashboard"); // redirect to dashboard
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  // 🔹 Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3002/api/auth/register", {
        name: inputValues.name,
        email: inputValues.email,
        password: inputValues.password,
        role: inputValues.role, // include role
      });

      setMessage(
        res.data.message || "User Registered Successfully ✅ Please login."
      );
      dispatch({ type: "reset" });
      setIsRegistering(false); // switch back to login
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Try again.";
      setMessage(errorMessage);
    }
  };

  const handleClick = () => {
    navigate("/forget-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {isRegistering ? "Register" : "Login"}
        </h1>

        {message && <p className="text-center text-red-500 mb-2">{message}</p>}

        <form
          className="space-y-4"
          onSubmit={isRegistering ? handleRegister : handleLogin}
        >
          {/* Name field (only register) */}
          {isRegistering && (
            <input
              type="text"
              placeholder="Enter name..."
              value={inputValues.name}
              onChange={(e) =>
                dispatch({ type: "name", payload: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          <input
            type="email"
            placeholder="Enter email..."
            value={inputValues.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password with eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password..."
              value={inputValues.password}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Role select (only register) */}
          {isRegistering && (
            <select
              value={inputValues.role}
              onChange={(e) =>
                dispatch({ type: "role", payload: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="proctor">Proctor</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {/* Switch login/register */}
        <p className="text-center mt-4 text-sm">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>

        {/* Forgot password only on login */}
        {!isRegistering && (
          <button
            onClick={handleClick}
            className="mt-4 text-blue-500 text-sm hover:underline block mx-auto"
          >
            Forgot password?
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;
