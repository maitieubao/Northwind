import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService } from '../../api/services';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await bookService.getAll();
        setBooks(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.delete(id);
        setBooks(books.filter(b => b.id !== id));
      } catch (e) {
        console.error(e);
        alert('Failed to delete book.');
      }
    }
  };

  return (
    <div>
      <div className="breadcrumb">Books / Archive</div>
      
      <div className="page-header">
        <h1 className="page-title">Books Archive</h1>
        <button className="btn" onClick={() => navigate('/books/create')}>+ Add Book</button>
      </div>

      <div className="card">
        {loading ? <p style={{color: 'var(--text-muted)'}}>Loading books...</p> : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id}>
                    <td>{index + 1}</td>
                    <td style={{color: 'var(--text-primary)', fontWeight: 500, fontFamily: 'var(--font-editorial)'}}>{book.title}</td>
                    <td>{book.authorName}</td>
                    <td>
                      <button className="action-btn" onClick={() => handleEdit(book.id)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDelete(book.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
