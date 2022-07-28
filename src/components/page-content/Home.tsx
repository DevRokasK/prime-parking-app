import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div>
            <ul className='ul'>
                <li>
                    <Link to="/Vehicles/all">Cars</Link>
                </li>
                <li>
                    <Link to="/Permits/all">Permits</Link>
                </li>
            </ul>
        </div>
    );
}