// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Lock, User, ShieldCheck } from "lucide-react";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const [role, setRole] = useState("admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password || !role) {
//       alert("Please fill all fields");
//       return;
//     }

//     localStorage.setItem("auth", "true");
//     localStorage.setItem("role", role);
//     localStorage.setItem("userEmail", email);

//     navigate("/admin-dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-950 via-teal-900 to-teal-800 px-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
//         {/* Logo / Title */}
//         <div className="text-center mb-8">
//           <ShieldCheck className="w-12 h-12 text-teal-600 mx-auto mb-3" />
//           <h2 className="text-2xl font-bold text-gray-800">
//             MediTrack Login
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Secure Hospital Management Access
//           </p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleLogin} className="space-y-5">
          
//           {/* Role Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Role
//             </label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             >
//               <option value="admin">Admin</option>
//               <option value="doctor">Doctor</option>
//               <option value="staff">Staff</option>
//               <option value="patient">Patient</option>
//             </select>
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-md font-semibold shadow-md transition transform hover:scale-105"
//           >
//             Login
//           </button>
//         </form>

//         {/* Extra Links */}
//         <div className="text-center mt-6 text-sm">
//           <p className="text-gray-500">
//             Forgot password?{" "}
//             <span className="text-teal-600 cursor-pointer hover:underline">
//               Reset here
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ShieldCheck } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Store token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      alert("Login successful!");

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (res.data.user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else if (res.data.user.role === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-950 via-teal-900 to-teal-800 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <ShieldCheck className="w-12 h-12 text-teal-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            MediTrack Login
          </h2>
          <p className="text-gray-500 text-sm">
            Secure Hospital Management Access
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Role Selection (Optional UI Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Email */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-md font-semibold shadow-md transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6 text-sm">
          <p className="text-gray-500">
            Forgot password?{" "}
            <span className="text-teal-600 cursor-pointer hover:underline">
              Reset here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;