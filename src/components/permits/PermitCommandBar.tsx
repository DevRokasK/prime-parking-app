import React from 'react';
import { MessageBar, MessageBarType, CommandBar, ICommandBarItemProps, Spinner, SpinnerSize } from '@fluentui/react';
import { PermitStore } from '../../stores/PermitStore';
import { observer } from 'mobx-react';

export interface IPermitCommandBarProps {
  store: PermitStore;
}

export const PermitCommandBar = observer(({ store }: IPermitCommandBarProps) => {
  const addPermit = () => {
    store.AddPermit();
  }

  const editPermit = () => {
    store.EditPermit();
  }

  const deletePermit = () => {
    store.DeletePermit().then();
  }

  const items: ICommandBarItemProps[] = [{
    key: 'add',
    text: 'Add',
    iconProps: { iconName: 'Add' },
    split: true,
    ariaLabel: 'Add',
    onClick: addPermit
  },
  {
    key: 'edit',
    text: 'Edit',
    iconProps: { iconName: 'Edit' },
    split: true,
    ariaLabel: 'Edit',
    disabled: store.SelectedPermits.length !== 1,
    onClick: editPermit
  },
  {
    key: 'delete',
    text: 'Delete',
    iconProps: { iconName: 'Delete' },
    ariaLabel: 'Delete',
    disabled: store.SelectedPermits.length === 0,
    onClick: deletePermit
  },
  ];

  const farItems: ICommandBarItemProps[] = [];

  if (store.SelectedPermits.length > 0) {
    let count: string = store.SelectedPermits.length.toString();
    farItems.push({
      key: 'edit',
      text: 'Selected: ' + count,
      ariaLabel: 'Count',
    })
  }

  if (store.running) {
    farItems.push(
      {
        key: ' running',
        text: '',
        onRender: () => {
          return <Spinner size={SpinnerSize.medium} />
        }
      }
    );
  }

  return (
    <div>
      <div className="command-bar">
        <CommandBar
          items={items} farItems={farItems}
        />
      </div>
      {store.hasError &&
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={store.clearError}
        >
          {store.errorMessage}
        </MessageBar>}
    </div>
  );
});