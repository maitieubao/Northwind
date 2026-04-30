import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthorList from './components/authors/AuthorList';
import AuthorCreate from './components/authors/AuthorCreate';
import BookList from './components/books/BookList';
import BookCreate from './components/books/BookCreate';
import ReviewList from './components/reviews/ReviewList';
import ReviewCreate from './components/reviews/ReviewCreate';

import AuthorEdit from './components/authors/AuthorEdit';
import BookEdit from './components/books/BookEdit';
import ReviewEdit from './components/reviews/ReviewEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/authors/list" replace />} />
          <Route path="authors/list" element={<AuthorList />} />
          <Route path="authors/create" element={<AuthorCreate />} />
          <Route path="authors/edit/:id" element={<AuthorEdit />} />
          <Route path="books/list" element={<BookList />} />
          <Route path="books/create" element={<BookCreate />} />
          <Route path="books/edit/:id" element={<BookEdit />} />
          <Route path="reviews/list" element={<ReviewList />} />
          <Route path="reviews/create" element={<ReviewCreate />} />
          <Route path="reviews/edit/:id" element={<ReviewEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
