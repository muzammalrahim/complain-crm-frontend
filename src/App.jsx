import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./pages/auth/PrivateRoute";
import { SignIn, SignUp } from "./pages/auth";
import { useUserContext } from "./context/UserContext";
import SignInAdmin from "./pages/auth/admin/LoginAdmin";
import ComplainPdf from "./widgets/complain/ComplainPdf";
function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          exact
          path="/*"
          // element={<Navigate to={user ? "/dashboard/" : "/login"} />}
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/complain-pdf" element={<ComplainPdf />} />
        <Route
          path="/dashboard/*"
          element={<PrivateRoute element={Dashboard} />}
        />
        <Route path="/admin" element={<SignInAdmin />} />
      </Routes>
    </>
  );
}

export default App;
