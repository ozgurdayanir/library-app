import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Home() {
    return (
        <>
            <div className="container">
                <div className="home-header">
                    <h1>
                        📚 Welcome to Library App!
                    </h1>
                    <p>
                        Manage your books with ease. Add, edit, and keep track of your favorite titles.
                    </p>
                    <Link className="cta-btn" to="/books">View Book List</Link>
                </div>
                <div className="home-features">
                    <h2>Why Use This App?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>📖 Organize Your Library</h3>
                            <p>Keep all your books in one place and access them anytime.</p>
                        </div>
                        <div className="feature-card">
                            <h3>🖊️ Easy Book Management</h3>
                            <p>Add, edit, or remove books with a user-friendly interface.</p>
                        </div>
                        <div className="feature-card">
                            <h3>📊 Track Stock</h3>
                            <p>Monitor how many copies of each book are available in your library.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
