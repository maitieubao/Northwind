import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authorService } from '../../api/services';

const AuthorEdit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await authorService.getById(id);
        const author = res.data;
        if (author) {
          setName(author.name);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('* Please enter name');
      return;
    }
    try {
      await authorService.update(id, { name });
      navigate('/authors/list');
    } catch (e) {
      setError('Failed to update author');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="breadcrumb">Authors / Edit</div>
      
      <div className="page-header">
        <h1 className="page-title">Edit Author</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
             <label className="form-label">Author Name</label>
             <input 
               type="text" 
               className="form-control" 
               value={name} 
               onChange={e => { setName(e.target.value); setError(''); }} 
             />
             {error && <div className="error-text">{error}</div>}
          </div>

          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={() => navigate('/authors/list')}>Cancel</button>
             <button type="submit" className="btn">Update Author</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthorEdit;
