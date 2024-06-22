import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main'; // importing a component
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js"; // needed for Accordion, Carousel, Modal ...
import "font-awesome/css/font-awesome.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

// React JSX 
root.render(
    <Main/>
);