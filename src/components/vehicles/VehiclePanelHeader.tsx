import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { observer } from 'mobx-react';
import { Vehicle } from '../../model/Vehicle';

export interface IVehiclePanelHeaderProps {
    vehicle: Vehicle;
}

export const VehiclePanelHeader = observer(({ vehicle }: IVehiclePanelHeaderProps) => {
    const deselect = () => {
        vehicle.store.DeselectVehicle();
    }

    const switchToEdit = () => {
        vehicle.SwitchToEdit();
    }

    const switchToDisplay = () => {
        vehicle.SwitchToDisplay();
    }

    const saveEdit = () => {
        vehicle.SaveEdit().then();
    }

    const deleteVehicle = () => {
        vehicle.DeleteVehicle().then();
    }

    let items: ICommandBarItemProps[] = [];
    let farItems: ICommandBarItemProps[] = [];

    if (vehicle?.readOnly) {
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
                onClick: deleteVehicle
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