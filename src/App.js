import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// import TodoApp from './components/TodoApp';
import TodoApp from 'todo/TodoIndex';
import CricketApp from './components/CricketApp';
import Layout from './components/Layout';

export default () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          {/* <TodoApp />
            <CricketApp /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<>Dashboard</>} />
              <Route path="/todo/*" element={<TodoApp />} />
              <Route path="cricket" element={<CricketApp />} />
              <Route path="*" element={<>No Match Route path</>} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </React.Fragment>
  );
};
