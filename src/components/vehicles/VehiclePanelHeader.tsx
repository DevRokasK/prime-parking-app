import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

export const VehiclePanelHeader = () => {
    const items: ICommandBarItemProps[] = [
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
            split: true,
            ariaLabel: 'Delete',
        },
        {
            key: 'cancel',
            text: 'Cancel',
            iconProps: { iconName: 'Cancel' },
            ariaLabel: 'Cancel',
        },
    ];

    return (
        <div>
            <CommandBar
                items={items}
                overflowButtonProps={overflowButtonProps}
            />
        </div>

    );
}