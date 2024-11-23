import React from 'react';
import './Main.style.css'

function Main({
    pagetitle,
    content
}) {

    return (
        <>
            <div className="container">
                <div className="top-nav">
                    <h1 id="page-title">{pagetitle}</h1>
                </div>
                <div className="main-content">{content}</div>
            </div>
        </>
    )
}

export default Main