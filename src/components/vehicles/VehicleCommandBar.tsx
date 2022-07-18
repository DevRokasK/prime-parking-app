import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
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

  const deleted = () => {
    alert(store.SelectedVehicles.length + " items have been deleted!");
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
    onClick: deleted
  },
  ];

  return (
    <div className="command-bar">
      <CommandBar
        items={items}
      />
    </div>
  );
});

