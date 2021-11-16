import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Employee from "./pages/Employee/Employee";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/employee" element={<Employee></Employee>}></Route>
        <Route exact path="/admin" element={<Admin></Admin>}></Route>
        <Route exact path="/" element={<Signin></Signin>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
