import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService, authorService } from '../../api/services';

const BookEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, authorRes] = await Promise.all([
          bookService.getById(id),
          authorService.getAll()
        ]);
        const book = bookRes.data;
        if (book) {
          setTitle(book.title);
          setAuthorId(book.authorId);
        }
        setAuthors(authorRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !authorId) {
      setError('* Please fill all required fields');
      return;
    }
    try {
      await bookService.update(id, { title, authorId: parseInt(authorId) });
      navigate('/books/list');
    } catch (e) {
      setError('Failed to update book');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="breadcrumb">Books / Edit</div>
      
      <div className="page-header">
        <h1 className="page-title">Edit Book</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
             <label className="form-label">Book Title</label>
             <input 
               type="text" 
               className="form-control" 
               value={title} 
               onChange={e => { setTitle(e.target.value); setError(''); }} 
             />
          </div>

          <div className="form-group">
             <label className="form-label">Author</label>
             <select 
               className="form-control" 
               value={authorId} 
               onChange={e => setAuthorId(e.target.value)}
             >
               <option value="">Select Author</option>
               {authors.map(author => (
                 <option key={author.id} value={author.id}>{author.name}</option>
               ))}
             </select>
          </div>

          {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}

          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={() => navigate('/books/list')}>Cancel</button>
             <button type="submit" className="btn">Update Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;
