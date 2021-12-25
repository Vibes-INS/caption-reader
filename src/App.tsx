import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Articles from './pages/articles'
import Editor from './pages/editor'
import Reader from './pages/reader'

const App: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route path="/reader" element={<Reader />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
