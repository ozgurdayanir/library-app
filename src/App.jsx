import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Main from './layouts'
import Books from './pages/books'
import Categories from './pages/categories'
import Publishers from './pages/publisher';
import Authors from './pages/authors';
import Borrows from './pages/borrowing-book';
import Home from './pages/home';
import Header from './components/header';


function App() {

  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route
            path="/books"
            element={
              <Main
                pagetitle="Books"
                content={<Books />}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <Main
                pagetitle="Categories"
                content={<Categories />}
              />
            }
          />
          <Route
            path="/publishers"
            element={
              <Main
                pagetitle="Publishers"
                content={<Publishers />}
              />
            }
          />
          <Route
            path="/authors"
            element={
                <Main 
                  pagetitle="Authors"
                  content={<Authors />}
                />
            }
          />
          <Route
            path="/book-borrowing"
            element={
              <Main
                pagetitle="Borrows"
                content={<Borrows />}
              />
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
