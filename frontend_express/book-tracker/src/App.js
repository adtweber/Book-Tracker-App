import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Home'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="display">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/games" element={<Index />} />
            <Route exact path="/games/new" element={<NewGame />} />
            <Route exact path="/games/:gameId" element={<GameDetails />} />
            <Route exact path="/games/:gameId/edit" element={<EditGameForm />} />
            <Route exact path="/games/:gameId/review" element={<NewReviewForm />} />
            <Route exact path="/games/:gameId/review/:reviewId/edit" element={<EditReview />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  )
};

export default App;
