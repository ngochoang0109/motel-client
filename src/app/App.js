import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from "../components/user/Layout";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Layout></Layout>}>
      </Route>
    </Routes>
  );
}

export default App;
