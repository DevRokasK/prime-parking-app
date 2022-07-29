import React from 'react';
import { observer } from 'mobx-react';
import { Route, Routes, Link } from 'react-router-dom';
import './styles/App.css';
import { RootStore } from './stores/RootStore';
import { Navigation } from './components/page-content/Navigation'
import { Home } from './components/page-content/Home'
import { VehicleList } from './components/vehicles/VehicleList';
import { PermitList } from './components/permits/PermitList';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

@observer
export class App extends React.Component {
        private store: RootStore;

        public constructor(props: any) {
                super(props);
                this.store = new RootStore();
                initializeFileTypeIcons();
                initializeIcons();
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
                                                <img src="https://icon-library.com/images/icon-car/icon-car-1.jpg" alt="Car go brrr" className="invert" />
                                        </div>
                                </header>
                                <aside className="navigation">
                                        <Navigation />
                                </aside>
                                <main className="main">
                                        <Routes>
                                                <Route path='/' element={<Home />} />
                                                <Route path='/Vehicles/all' element={<VehicleList store={store.VehiclesStore} gate={store.Gates} />} />
                                                <Route path='/Permits/all' element={<PermitList store={store.PermitStore} permitState={null} />} />
                                                <Route path='/Permits/planned' element={<PermitList store={store.PermitStore} permitState={"planned"} />} />
                                                <Route path='/Permits/inTerritory' element={<PermitList store={store.PermitStore} permitState={"inTerritory"} />} />
                                                <Route path='/Permits/completed' element={<PermitList store={store.PermitStore} permitState={"completed"} />} />
                                                <Route path='/Permits/missed' element={<PermitList store={store.PermitStore} permitState={"missed"} />} />
                                        </Routes>
                                </main>
                        </div>
                </div>

        }
}

export default App;
