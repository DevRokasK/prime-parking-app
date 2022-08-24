import React from 'react';
import { observer } from 'mobx-react';
import { IIconProps, Panel, PanelType, IconButton } from '@fluentui/react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export interface IHeaderProps {
    isHamburgerOpen: boolean;
    toggleHamburgerOpen: () => void;
    toggleHamburgerClose: () => void;
}

export const Header = observer(({ isHamburgerOpen, toggleHamburgerOpen, toggleHamburgerClose }: IHeaderProps) => {
    const iconHamburger: IIconProps = { iconName: 'CollapseMenu' };

    const toggleHamburgerMenuOpen = () => {
        toggleHamburgerOpen();
    }

    const toggleHamburgerMenuClose = () => {
        toggleHamburgerClose();
    }

    return (
        <div>
            <div className='hamburger-menu'>
                <IconButton title={"hamburgerMenu"} iconProps={iconHamburger} onClick={toggleHamburgerMenuOpen} />
            </div>
            <div className="header-name">
                <Link to="/">Prime Parking</Link>
            </div>
            <div className="header-logo">
                <img src="https://icon-library.com/images/icon-car/icon-car-1.jpg" alt="Car go brrr" className="invert" />
            </div>
            <Panel
                isLightDismiss
                type={PanelType.smallFixedNear}
                isOpen={isHamburgerOpen}
                onDismiss={toggleHamburgerMenuClose}
                headerText={"Navigation"}
                closeButtonAriaLabel="Close">
                <Navigation toggleHamburger={toggleHamburgerClose} />
            </Panel>
        </div>
    )
})