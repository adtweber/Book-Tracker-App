import React from 'react'
import BookSearch from './components/BookSearch.js'
import Header from './components/Header.js'
import BookList from './components/BookList.js'

function App() {
  return (
    <div className="App">
      <Header />
      <p>Welcome to the book tracker app!</p>
      <BookSearch />
      <BookList />
      {/* Your components will go here */}
    </div>
  );
}

export default App;
