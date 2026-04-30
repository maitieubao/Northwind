import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookService, authorService } from '../../api/services';

const BookCreate = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    authorService.getAll().then(res => setAuthors(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = '* Please enter title';
    if (!authorId) newErrors.authorId = '* Please select author';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await bookService.create({ title, authorId: parseInt(authorId) });
      navigate('/books/list');
    } catch (e) {
      setErrors({ form: 'Failed to create book' });
    }
  };

  return (
    <div>
      <div className="breadcrumb">Books / Create</div>
      
      <div className="page-header">
        <h1 className="page-title">Add New Book</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
             <label className="form-label">Book Title</label>
             <input 
               type="text" 
               className="form-control" 
               placeholder="e.g. The Great Gatsby"
               value={title} 
               onChange={e => { setTitle(e.target.value); setErrors(prev => ({...prev, title: null})); }} 
             />
             {errors.title && <div className="error-text">{errors.title}</div>}
          </div>

          <div className="form-group">
             <label className="form-label">Author</label>
             <select 
               className="form-control" 
               value={authorId} 
               onChange={e => { setAuthorId(e.target.value); setErrors(prev => ({...prev, authorId: null})); }}
             >
               <option value="" disabled>Select an author...</option>
               {authors.map(a => (
                 <option key={a.id} value={a.id}>{a.name}</option>
               ))}
             </select>
             {errors.authorId && <div className="error-text">{errors.authorId}</div>}
          </div>

          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={() => navigate('/books/list')}>Cancel</button>
             <button type="submit" className="btn">Save Book</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookCreate;
