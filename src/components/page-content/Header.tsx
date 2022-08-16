import React from 'react';
import { observer } from 'mobx-react';
import { IIconProps, Panel, PanelType } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export interface IHeaderProps {
    isHamburgerOpen: boolean;
}

export const Header = observer(({ isHamburgerOpen }: IHeaderProps) => {
    const iconHamburger: IIconProps = { iconName: 'CollapseMenu' };

    const openHamburgerMenu = () => {
        isHamburgerOpen = true;
    }

    const closeHamburgerMenu = () => {
        isHamburgerOpen = false;
    }

    return (
        <div>
            <div className='hamburger-menu'>
                <IconButton styles={{ root: { selectors: { ':hover .ms-Button-icon': { backgroundColor: "#EDEBE9" } } } }} iconProps={iconHamburger} onClick={openHamburgerMenu} />
            </div>
            <div className="header-name">
                <Link to="/">Prime Parking</Link>
            </div>
            <div className="header-logo">
                <img src="https://icon-library.com/images/icon-car/icon-car-1.jpg" alt="Car go brrr" className="invert" />
            </div>
            <Panel
                type={PanelType.smallFixedNear}
                isOpen={isHamburgerOpen}
                onDismiss={closeHamburgerMenu}
                headerText={"Navigation"}
                closeButtonAriaLabel="Close">
                <Navigation />
            </Panel>
        </div>
    )
})