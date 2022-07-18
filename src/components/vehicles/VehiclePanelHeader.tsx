import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { VehicleStore } from '../../stores/VehicleStore';
import { observer } from 'mobx-react';

export interface IVehiclePanelHeaderProps {
    store: VehicleStore;
}

export const VehiclePanelHeader = observer(({ store }: IVehiclePanelHeaderProps) => {
    const deselect = () => {
        store.DeselectVehicle();
    }

    const switchToEdit = () => {
        store.SwitchToEdit();
    }

    const switchToDisplay = () => {
        store.SwitchToDisplay();
    }

    const saveEdit = () => {
        store.SaveEdit();
    }

    let items: ICommandBarItemProps[] = [];
    let farItems: ICommandBarItemProps[] = [];

    if (store?.CurrentVehicle?.readOnly) {
        items = [
            {
                key: 'edit',
                text: 'Edit',
                iconProps: { iconName: 'Edit' },
                split: true,
                ariaLabel: 'Edit',
                onClick: switchToEdit
            },
            {
                key: 'delete',
                text: 'Delete',
                iconProps: { iconName: 'Delete' },
                split: true,
                ariaLabel: 'Delete',
            },
        ];
        farItems = [
            {
                key: 'cancel',
                text: '',
                iconProps: { iconName: 'Cancel' },
                split: true,
                ariaLabel: 'Cancel',
                onClick: deselect
            }
        ]

    }
    else {
        items = [
            {
                key: 'save',
                text: 'Save',
                iconProps: { iconName: 'Save' },
                split: true,
                ariaLabel: 'Save',
                onClick: saveEdit
            },
            {
                key: 'cancel',
                text: 'Cancel',
                iconProps: { iconName: 'Cancel' },
                ariaLabel: 'Cancel',
                onClick: switchToDisplay
            },
        ];
    }

    return (
        <div>
            <CommandBar
                items={items} farItems={farItems}
            />
        </div>

    );
});