import React from "react";
import '../App.css';
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div className="Start">
            <Link to="/intro">
                <button>Start The Adventure</button>
            </Link>
        </div>
    );
}

export default Start;