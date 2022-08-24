import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/page-content/Header';
import { HashRouter } from 'react-router-dom';
import { RootStore } from '../stores/RootStore';

interface IHeaderProps {
    isHamburgerOpen: boolean;
    toggleHamburgerOpen: () => void;
    toggleHamburgerClose: () => void;
}

const MockHeader = ({ isHamburgerOpen, toggleHamburgerOpen, toggleHamburgerClose }: IHeaderProps) => (
    <HashRouter>
        <Header isHamburgerOpen={isHamburgerOpen} toggleHamburgerOpen={toggleHamburgerOpen} toggleHamburgerClose={toggleHamburgerClose} />
    </HashRouter>
)

describe("Header", () => {
    test('should render a link with text "Prime Parking"', async () => {
        const store = new RootStore();

        render(
            <MockHeader
                isHamburgerOpen={store.isHamburgerOpen}
                toggleHamburgerOpen={store.ToggleHamburgerOpen}
                toggleHamburgerClose={store.ToggleHamburgerClose}
            />
        );

        const linkElement = screen.getByRole("link", { name: "Prime Parking" });
        expect(linkElement).toBeInTheDocument();
    });

    test('should render a hamburger menu button', async () => {
        const store = new RootStore();

        render(
            <MockHeader
                isHamburgerOpen={store.isHamburgerOpen}
                toggleHamburgerOpen={store.ToggleHamburgerOpen}
                toggleHamburgerClose={store.ToggleHamburgerClose}
            />
        );

        const buttonElement = screen.getByRole("button", { name: "hamburgerMenu" });
        expect(buttonElement).toBeVisible();
    });
})

// test('should render a header', async () => {
//     const store = new RootStore();

//     render(
//         <MockHeader
//             isHamburgerOpen={store.isHamburgerOpen}
//             toggleHamburgerOpen={store.ToggleHamburgerOpen}
//             toggleHamburgerClose={store.ToggleHamburgerClose}
//         />
//     );

//     const linkElement = screen.getByRole("link", { name: "Prime Parking" });
//     const buttonElement = screen.getByRole("button", { name: "hamburgerMenu" });

//     expect(linkElement).toBeInTheDocument();
//     expect(buttonElement).toBeVisible();
// });
