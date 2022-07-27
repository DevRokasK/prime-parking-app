import React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navStyles: Partial<INavStyles> = { root: { width: 229 } };

const navLinkGroups: INavLinkGroup[] = [
  {
    name: 'Vehicles',
    links: [
      {
        key: 'allVehicles',
        name: 'All',
        url: '#/Vehicles/all',
      },
      {
        key: 'vehicleBlobs',
        name: 'Blobs',
        url: '#/Vehicles/blobs',
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
      },
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