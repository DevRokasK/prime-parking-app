import React from 'react';
import { render, screen } from '@testing-library/react';
import { Navigation } from '../components/page-content/Navigation';
import { HashRouter } from 'react-router-dom';
import { RootStore } from '../stores/RootStore';

interface hamburgerProps {
    toggleHamburger: () => void;
}

const MockNavigation = ({ toggleHamburger }: hamburgerProps) => {
    return (
        <HashRouter>
            <Navigation toggleHamburger={toggleHamburger} />
        </HashRouter>
    )
}

describe("Navigation", () => {
    test('should render Vehicle tab in navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const vehicleGroupElement = screen.getByText(/Vehicles/i);
        expect(vehicleGroupElement).toBeInTheDocument();
    });

    test('should render Permit tab in navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const permitGroupElement = screen.getByText(/Permits/i);
        expect(permitGroupElement).toBeInTheDocument();
    });

    test('should render 2 "All" links in navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const allLinkElements = screen.getAllByText(/All/i);
        expect(allLinkElements.length).toBe(2);
    });

    test('should render "Planned" link in Permit tab of navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const plannedLinkElement = screen.getByRole("link", { name: "Planned" });
        expect(plannedLinkElement).toBeInTheDocument();
    });

    test('should render "In Territory" link in Permit tab of navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const inTerritoryLinkElement = screen.getByRole("link", { name: "In Territory" });
        expect(inTerritoryLinkElement).toBeInTheDocument();
    });

    test('should render "Missed" link in Permit tab of navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const completedLinkElement = screen.getByRole("link", { name: "Completed" });
        expect(completedLinkElement).toBeInTheDocument();
    });

    test('should render "Completed" link in Permit tab of navigation', async () => {
        const store = new RootStore();

        render(
            <MockNavigation
                toggleHamburger={store.ToggleHamburgerClose}
            />
        );

        const missedLinkElement = screen.getByRole("link", { name: "Missed" });
        expect(missedLinkElement).toBeInTheDocument();
    });
})

// test('should render navigation', async () => {
//     const store = new RootStore();
//     render(
//         <MockNavigation
//             toggleHamburger={store.ToggleHamburgerClose}
//         />
//     );

//     const vehicleGroupElement = screen.getByText(/Vehicles/i);
//     const permitGroupElement = screen.getByText(/Permits/i);
//     const allLinkElements = screen.getAllByText(/All/i);
//     const plannedLinkElement = screen.getByRole("link", { name: "Planned" });
//     const inTerritoryLinkElement = screen.getByRole("link", { name: "In Territory" });
//     const completedLinkElement = screen.getByRole("link", { name: "Completed" });
//     const missedLinkElement = screen.getByRole("link", { name: "Missed" });

//     expect(vehicleGroupElement).toBeInTheDocument();
//     expect(permitGroupElement).toBeInTheDocument();
//     expect(allLinkElements.length).toBe(2);
//     expect(plannedLinkElement).toBeInTheDocument();
//     expect(inTerritoryLinkElement).toBeInTheDocument();
//     expect(completedLinkElement).toBeInTheDocument();
//     expect(missedLinkElement).toBeInTheDocument();
// });


