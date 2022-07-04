import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

export const CommandBarSplitDisabledExample: React.FunctionComponent = () => {
  return (
    <div>
      <CommandBar
        items={_items}
        overflowButtonProps={overflowButtonProps}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

const _items: ICommandBarItemProps[] = [
  {
    key: 'add',
    text: 'Add',
    iconProps: { iconName: 'Add' },
    split: true,
    ariaLabel: 'Add',
  },
  {
    key: 'edit',
    text: 'Edit',
    iconProps: { iconName: 'Edit' },
    split: true,
    ariaLabel: 'Edit',
  },
  {
    key: 'delete',
    text: 'Delete',
    iconProps: { iconName: 'Delete' },
    ariaLabel: 'Delete',
  },
];
 export default CommandBarSplitDisabledExample;