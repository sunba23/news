import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import FormPage from './FormPage';
import MainFeed from './MainFeed'
import ArticlePage from './ArticlePage';
import SettingsPage from './SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/form" element={<FormPage />}/>
      <Route path="/MainFeed" element={<MainFeed />}/>
      <Route path="/Article" element={<ArticlePage/>}/>
      <Route path="/Settings" element={<SettingsPage/>}/>
    </Routes>
  )
}

export default App