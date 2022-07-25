import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navStyles: Partial<INavStyles> = { root: { width: 229 } };

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        key: 'Vehicles',
        name: 'Vehicles',
        url: '#/Vehicles',
      },
      {
        key: 'Permits',
        name: 'Permits',
        url: '#/Permits/all',
      },
    ]
  },
  {
    name: 'Permits',
    links: [
      {
        key: 'plannedPermits',
        name: 'Planned',
        url: '#/Permits/planned',
      },
      {
        key: 'inTerritoryPermits',
        name: 'In Territory',
        url: '#/Permits/inTerritory',
      },
      {
        key: 'completedPermits',
        name: 'Completed',
        url: '#/Permits/completed',
      },
      {
        key: 'missedPermits',
        name: 'Missed',
        url: '#/Permits/missed',
      },
    ],
  },
];

export const Navigation: React.FunctionComponent = () => {
  return (
    <Nav styles={navStyles} ariaLabel="Navigation" groups={navLinkGroups} />
  );
};