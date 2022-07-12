import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import '../../styles/App.css';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
initializeIcons();

export const VehiclePanelFooter = () => {

    return (
        <div>
            <PrimaryButton className='button-style'>
                Edit
            </PrimaryButton>
            <DefaultButton>
                Cancel
            </DefaultButton>
        </div>
    );
}

const overflowButtonProps: IButtonProps = { ariaLabel: 'More commands' };

export const VehiclePanelHeader: React.FunctionComponent = () => {
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