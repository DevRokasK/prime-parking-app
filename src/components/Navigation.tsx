import * as React from 'react';
import { Nav, INavStyles, INavLinkGroup } from '@fluentui/react/lib/Nav';

const navStyles: Partial<INavStyles> = { root: { width: 229 } };

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        key: 'Cars',
        name: 'Cars',
        url: '#/Cars',
      },
      {
        key: 'Permits',
        name: 'Permits',
        url: '#/Permits',
      }
    ]
  }
];

export const Navigation: React.FunctionComponent = () => {
  return (
    <Nav styles={navStyles} ariaLabel="Navigation" groups={navLinkGroups} />
  );
};