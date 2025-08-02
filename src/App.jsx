import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import ProtectedRoute from './components/protectedrout';
import Quizes from './pages/quizes';
import About from './pages/about';
import Blog from "./pages/blog"
import Contact from './pages/contact';
import Profile from './pages/profile';
import Quiz from "./pages/quiz";
import Leaderboard from './pages/leaderboard';
import Blogpage from './pages/blogpage';
import NotFound from './pages/notfound';
import Dashboard from './pages/dashboard';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={
          <Login />
        } />


        <Route path="/signup" element={<Signup />} />
        <Route path="/quizes" element={<ProtectedRoute><Quizes /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path="contact" element={<Contact />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/blogpage" element={<ProtectedRoute><Blogpage /></ProtectedRoute>} />



        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </Router>
  );
}

export default App;
