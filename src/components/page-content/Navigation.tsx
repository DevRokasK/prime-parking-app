import React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react';
import { observer } from 'mobx-react';

export interface hamburgerProps {
  toggleHamburger: () => void;
}


export const Navigation = observer(({ toggleHamburger }: hamburgerProps) => {
  const navStyles: Partial<INavStyles> = { root: { width: 229 } };

  const navLinkGroups: INavLinkGroup[] = [
    {
      name: 'Vehicles',
      links: [
        {
          key: 'allVehicles',
          name: 'All',
          url: '#/Vehicles/all',
          onClick: toggleHamburger
        },
      ]
    },
    {
      name: 'Permits',
      links: [
        {
          key: 'allPermits',
          name: 'All',
          url: '#/Permits/all',
          onClick: toggleHamburger
        },
        {
          key: 'plannedPermits',
          name: 'Planned',
          url: '#/Permits/planned',
          onClick: toggleHamburger
        },
        {
          key: 'inTerritoryPermits',
          name: 'In Territory',
          url: '#/Permits/inTerritory',
          onClick: toggleHamburger
        },
        {
          key: 'completedPermits',
          name: 'Completed',
          url: '#/Permits/completed',
          onClick: toggleHamburger
        },
        {
          key: 'missedPermits',
          name: 'Missed',
          url: '#/Permits/missed',
          onClick: toggleHamburger
        },
      ],
    },
  ];

  return (
    <Nav styles={navStyles} ariaLabel="Navigation" groups={navLinkGroups} />
  );
});