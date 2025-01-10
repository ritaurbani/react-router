import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./components/HomePage";
import PostsPage from "./components/PostsPage";
import AboutPage from "./components/AboutPage"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* //Setti rotta layout con tutte le altre rotte-solo quello che ce nell outlet viene cambiato */}
        <Route element={<AppLayout />}>
          <Route index element={<HomePage/>} /> 
          <Route path="/posts" element={<PostsPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App;