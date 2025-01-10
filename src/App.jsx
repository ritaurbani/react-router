import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/posts/PostsPage";
import AboutPage from "./pages/AboutPage"
import PostCreatePage from "./pages/posts/PostCreatePage";
import ShowPostDetails from "./pages/posts/ShowPostDetails";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* //Setti rotta layout con tutte le altre rotte-solo quello che ce nell outlet viene cambiato */}
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts">
            <Route index element={<PostsPage />} />
            <Route path="create" element={<PostCreatePage />} />
            <Route path=":id" element={<ShowPostDetails/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App;