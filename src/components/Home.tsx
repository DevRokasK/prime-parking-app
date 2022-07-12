import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/Vehicles">Cars</Link>
                </li>
                <li>
                    <Link to="/Permits">Permits</Link>
                </li>
            </ul>
        </div>
    );
}