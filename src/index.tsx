// import path from 'path/posix';
import React from 'react';
import { render } from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import App from './App'
import DummyPage from './routes/DummyPage';
import DummerPage from './routes/DummerPage';

render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='dummy' element={<DummyPage />} />
        <Route path='dummer' element={<DummerPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('app'),
)
