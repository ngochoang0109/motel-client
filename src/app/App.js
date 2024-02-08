import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from "../components/user/Layout";
import LayoutAdmin from "../components/admin/Layout";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout></Layout>}>
      </Route>
      <Route path="/admin/*" element={<LayoutAdmin></LayoutAdmin>}>
      </Route>
    </Routes>
  );
}

export default App;
