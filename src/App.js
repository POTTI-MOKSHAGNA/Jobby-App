import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Home from './components/Home'
import JobDetails from './components/JobDetails'
import AllJobsSection from './components/AllJobsSection'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobsSection} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
