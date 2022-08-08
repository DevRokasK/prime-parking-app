import React from 'react';
import { Nav, INavLinkGroup } from '@fluentui/react/lib/Nav';

export const Home = () => {
    const navLinkGroup: INavLinkGroup[] = [
        {
            name: 'Content',
            links: [
                { name: 'Vehicles', url: '#/Vehicles/all', key: 'allVehicles' },
                { name: 'Permits', url: '#/Permits/all', key: 'allPermits' },
            ],
        },
    ];

    const onRenderGroupHeader = (group: INavLinkGroup) => {
        return <h3>{group.name}</h3>
    }

    return (
        <div className='nav-centered'>
            <Nav
                groups={navLinkGroup}
                onRenderGroupHeader={onRenderGroupHeader} />
        </div>
    );
}