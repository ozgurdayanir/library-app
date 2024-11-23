import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Main from './layouts'
import Books from './components/books'
import Categories from './components/categories';
import Publishers from './components/publisher';
import Authors from './components/authors';
import Borrows from './components/borrowing-book';
import Home from './components/home';
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
