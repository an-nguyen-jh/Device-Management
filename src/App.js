import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin, Employee, Login, NotFound } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/employee" element={<Employee></Employee>}></Route>
        <Route exact path="/admin" element={<Admin></Admin>}></Route>
        <Route exact path="/" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
