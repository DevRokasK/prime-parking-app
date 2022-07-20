import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { VehicleStore } from '../../stores/VehicleStore';
import { observer } from 'mobx-react';

export interface IVehicleCommandBarProps {
  store: VehicleStore;
}

export const VehicleCommandBar = observer(({ store }: IVehicleCommandBarProps) => {
  const addVehicle = () => {
    store.AddVehicle();
  }

  const editVehicle = () => {
    store.EditVehicle();
  }

  const deleteVehicle = () => {
    store.DeleteVehicle().then();
  }

  const items: ICommandBarItemProps[] = [{
    key: 'add',
    text: 'Add',
    iconProps: { iconName: 'Add' },
    split: true,
    ariaLabel: 'Add',
    onClick: addVehicle
  },
  {
    key: 'edit',
    text: 'Edit',
    iconProps: { iconName: 'Edit' },
    split: true,
    ariaLabel: 'Edit',
    disabled: store.SelectedVehicles.length !== 1,
    onClick: editVehicle
  },
  {
    key: 'delete',
    text: 'Delete',
    iconProps: { iconName: 'Delete' },
    ariaLabel: 'Delete',
    disabled: store.SelectedVehicles.length === 0,
    onClick: deleteVehicle
  },
  ];

  const farItems: ICommandBarItemProps[] = [];

  if (store.running) {
    farItems.push(
      {
        key: 'running',
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

