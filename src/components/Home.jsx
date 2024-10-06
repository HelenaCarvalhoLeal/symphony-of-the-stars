import React from "react";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="Home">
            <h1>AllFrequency</h1>
            <h3>Close Your Eyes And Listen</h3>
            <div style={{ marginTop: '20px' }}>
                <Link to="/upload">
                    <button>Build Your Own Symphony</button>
                </Link>
                <Link to="/api">
                    <button>Explore the James Webb Telescope</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;