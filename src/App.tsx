import React from 'react';
import './styles/App.css';

import NavFabricDemoAppExample from './components/nav'
import CommandBarBasicExample from './components/commandBar'

import Lorem from './components/lorem';

export const App = () => {
        return (
                <div className="App">
                        <div className='grid-container'>
                                <header className="header">header</header>
                                <aside className="navigation"><NavFabricDemoAppExample /></aside>
                                <main className="main">
                                        <div className="command-bar">
                                                <CommandBarBasicExample />
                                        </div>
                                        <div className="main-content">
                                                <Lorem /><Lorem /><Lorem /><Lorem />
                                        </div>
                                </main>
                        </div>
                </div>
        );
}

export default App;
