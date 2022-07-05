import React from 'react';
import { observer } from 'mobx-react';
import './styles/App.css';

import { RootStore } from './stores/RootStore';
import { Navigation } from './components/Navigation'
import { CarList } from './components/cars/CarList';

@observer
export class App extends React.Component {
        private store: RootStore;

        public constructor(props: any) {
                super(props);
                this.store = new RootStore();
        }

        public componentDidMount() {
                this.store.CarStore.Init();
        }

        public render(): JSX.Element {
                const store = this.store;
                return <div className="App">
                        <div className='grid-container'>
                                <header className="header">
                                        <div className="header-name">
                                                Prime Parking
                                        </div>
                                        <div className="header-logo">
                                                <img src="https://icon-library.com/images/icon-car/icon-car-1.jpg" alt="Car go brrr" className="invert"/>
                                        </div>
                                </header>
                                <aside className="navigation">
                                        <Navigation />
                                </aside>
                                <main className="main">
                                        <CarList store={store.CarStore} />
                                </main>
                        </div>
                </div>

        }
}

export default App;
