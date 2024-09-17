import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookSearch from './components/BookSearch.js'
import Header from './components/Header.js'
import BookList from './components/BookList.js'
import BookDetails from './components/BookDetails.js'
import AddBookForm from './components/AddBookForm.js'
import LogIn from './components/LogIn.js'
import SignUp from './components/SignUp.js'
import CurrentUserProvider from './components/CurrentUser'

function App() {
  return (
    <CurrentUserProvider> 
      <Router>
        <div className="App">
          <Header />
          <p>Welcome to the book tracker app!</p>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<BookSearch />} />
            <Route path="/addbook" element={<AddBookForm />} />
            <Route path="/booklist" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </Router>
    </CurrentUserProvider>
  );
}

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Book Tracker</h2>
    </div>
  )
}

export default App;
