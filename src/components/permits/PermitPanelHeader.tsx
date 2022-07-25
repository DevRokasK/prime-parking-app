import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { observer } from 'mobx-react';
import { Permit } from '../../model/Permit';

export interface IPermitPanelHeaderProps {
    permit: Permit;
}

export const PermitPanelHeader = observer(({ permit }: IPermitPanelHeaderProps) => {
    const deselect = () => {
        permit.store.DeselectPermit();
    }

    const switchToEdit = () => {
        permit.SwitchToEdit();
    }

    const switchToDisplay = () => {
        permit.SwitchToDisplay();
    }

    const saveEdit = () => {
        permit.SaveEdit().then();
    }

    const deletePermit = () => {
        permit.DeletePermit().then();
    }

    let items: ICommandBarItemProps[] = [];
    let farItems: ICommandBarItemProps[] = [];

    if (permit?.readOnly) {
        items = [
            {
                key: 'edit',
                text: 'Edit',
                iconProps: { iconName: 'Edit' },
                split: true,
                ariaLabel: 'Edit',
                onClick: switchToEdit,
                disabled: !permit.isEditable
            },
            {
                key: 'delete',
                text: 'Delete',
                iconProps: { iconName: 'Delete' },
                split: true,
                ariaLabel: 'Delete',
                onClick: deletePermit,
                disabled: !permit.isEditable
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
            },
        ];
    } else {
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