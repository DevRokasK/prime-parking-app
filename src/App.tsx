import React from 'react';
import { observer } from 'mobx-react';
import { Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';

import { RootStore } from './stores/RootStore';
import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { VehicleList } from './components/vehicles/VehicleList';
import { PermitList } from './components/permits/PermitList';

@observer
export class App extends React.Component {
        private store: RootStore;

        public constructor(props: any) {
                super(props);
                this.store = new RootStore();
        }

        

        public render(): JSX.Element {
                const store = this.store;
                return <div className="App">
                        <div className="grid-container">
                                <header className="header">
                                        <div className="header-name">
                                                <Link to="/">Prime Parking</Link>
                                        </div>
                                        <div className="header-logo">
                                                <img src="https://icon-library.com/images/icon-car/icon-car-1.jpg" alt="Car go brrr" className="invert"/>
                                        </div>
                                </header>
                                <aside className="navigation">
                                        <Navigation />
                                </aside>
                                <main className="main">
                                        <Routes>
                                                <Route path='/' element={<Home/>}/>
                                                <Route path='/Vehicles' element={<VehicleList store={store.VehiclesStore} />}/>
                                                <Route path='/Permits' element={<PermitList store={store.PermitStore} />}/>
                                        </Routes>
                                </main>
                        </div>
                </div>

        }
}

export default App;
