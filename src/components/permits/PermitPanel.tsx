import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IButtonProps } from '@fluentui/react/lib/Button';

export const PermitPanelFooter = () => {

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

export const PermitPanelHeader: React.FunctionComponent = () => {
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