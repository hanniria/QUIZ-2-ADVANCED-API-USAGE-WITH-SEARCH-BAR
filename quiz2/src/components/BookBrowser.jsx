import React, { useState, useEffect, useRef } from 'react';
import './BookBrowser.css';

const terms = ['fiction', 'history', 'science', 'romance', 'fantasy', 'adventure'];
const random = terms[Math.floor(Math.random() * terms.length)];

function BookBrowser() {
  const [query, setQuery] = useState(random);
  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const perPage = 12;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${query}&page=1`);
        const data = await res.json();
        setBooks(data.docs || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadBooks();
  }, [query]);

  const shownBooks = books.slice((page - 1) * perPage, page * perPage);

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onUploadClick = () => {
    if (!file) {
      fileRef.current.click();
    } else {
      console.log('Uploading:', file);
    }
  };

  return (
    <div className="container">
      <h1 className="header">DLL LIBRARY: E-BOOKS</h1>

      <div className="toolbar">
        <input
          type="text"
          className="input"
          placeholder="Search for books..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn search"
          onClick={() => {
            setQuery(input || random);
            setPage(1);
          }}
        >
          Search
        </button>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={onFileChange}
        />
        <button className="btn upload" onClick={onUploadClick}>
          {file ? 'Upload File' : 'Upload'}
        </button>
      </div>

      <div className="grid">
        {shownBooks.map((book, i) => (
          <div key={i} className="card">
            <img
              src={book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : 'https://via.placeholder.com/150x200?text=No+Cover'}
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>{book.author_name?.join(', ') || 'Unknown Author'}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={(page * perPage) >= books.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BookBrowser;
