import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorService } from '../../api/services';

const AuthorCreate = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('* Please enter name');
      return;
    }
    try {
      await authorService.create({ name });
      navigate('/authors/list');
    } catch (e) {
      setError('Failed to create author');
    }
  };

  return (
    <div>
      <div className="breadcrumb">Authors / Create</div>
      
      <div className="page-header">
        <h1 className="page-title">Add New Author</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
             <label className="form-label">Author Name</label>
             <input 
               type="text" 
               className="form-control" 
               placeholder="e.g. F. Scott Fitzgerald"
               value={name} 
               onChange={e => { setName(e.target.value); setError(''); }} 
             />
             {error && <div className="error-text">{error}</div>}
          </div>

          <div className="form-group">
             <label className="form-label">Brief Biography (Optional)</label>
             <textarea 
               className="form-control" 
               placeholder="Enter a brief biography of the author..."
             />
          </div>

          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={() => navigate('/authors/list')}>Cancel</button>
             <button type="submit" className="btn">Save Author</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorCreate;
