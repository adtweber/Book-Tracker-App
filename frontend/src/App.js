import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookSearch from './components/BookSearch.js'
import Header from './components/Header.js'
import BookList from './components/BookList.js'
import BookDetails from './components/BookDetails.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <p>Welcome to the book tracker app!</p>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
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
