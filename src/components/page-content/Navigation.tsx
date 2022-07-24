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
        url: '#/Permits',
      },
    ]
  },
  {
    name: 'Permits',
    links: [
      {
        key: 'plannedPermits',
        name: 'Planned',
        url: '#/Permits',
      },
      {
        key: 'inTerritoryPermits',
        name: 'In Territory',
        url: '#/Permits',
      },
      {
        key: 'completedPermits',
        name: 'Completed',
        url: '#/Permits',
      },
      {
        key: 'missedPermits',
        name: 'Missed',
        url: '#/Permits',
      },
    ],
  },
];

export const Navigation: React.FunctionComponent = () => {
  return (
    <Nav styles={navStyles} ariaLabel="Navigation" groups={navLinkGroups} />
  );
};