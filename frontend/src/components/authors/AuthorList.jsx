import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorService } from '../../api/services';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await authorService.getAll();
        setAuthors(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleEdit = (id) => {
    navigate(`/authors/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await authorService.delete(id);
        setAuthors(authors.filter(a => a.id !== id));
      } catch (e) {
        console.error(e);
        alert('Failed to delete author. It might be linked to books.');
      }
    }
  };

  return (
    <div>
      <div className="breadcrumb">Authors / Archive</div>
      
      <div className="page-header">
        <h1 className="page-title">Authors Archive</h1>
        <button className="btn" onClick={() => navigate('/authors/create')}>+ Add Author</button>
      </div>

      <div className="card">
        {loading ? <p style={{color: 'var(--text-muted)'}}>Loading authors...</p> : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Books</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((author, index) => (
                  <tr key={author.id}>
                    <td>{index + 1}</td>
                    <td style={{color: 'var(--text-primary)', fontWeight: 500}}>{author.name}</td>
                    <td>{author.books || 0}</td>
                    <td>
                      <button className="action-btn" onClick={() => handleEdit(author.id)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDelete(author.id)}>Delete</button>
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

export default AuthorList;
