import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Employee, Login } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/employee" element={<Employee></Employee>}></Route>
        <Route exact path="/admin" element={<Admin></Admin>}></Route>
        <Route exact path="/" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
