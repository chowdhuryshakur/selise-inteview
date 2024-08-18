import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.js';
import { ThemeProvider } from './context/ThemeContext.js';
import PageNotFoundScreen from './screens/PageNotFoundScreen.js';
import Dashboard from './screens/Dashboard.js';
import CreateAppointment from './screens/CreateAppointment.js';

function App() {


  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/year/:year/month/:month" element={<Dashboard />} />
          <Route path="/createAppointment" element={<CreateAppointment />} />
          <Route path="*" element={<PageNotFoundScreen />} />
        </Routes>

      </Router>
    </ThemeProvider>
  );
}

export default App;
