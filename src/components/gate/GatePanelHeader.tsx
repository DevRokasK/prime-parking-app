import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';
import { observer } from 'mobx-react';
import { Gate } from '../../stores/Gate';

export interface IGatePanelHeaderProps {
    gate: Gate;
}

export const GatePanelHeader = observer(({ gate }: IGatePanelHeaderProps) => {
    const gateClose = () => {
        gate.gateClose();
    }

    const PostGate = () => {
        gate.PostGate();
    }

    const items: ICommandBarItemProps[] = [
        {
            key: 'Post',
            text: 'Post',
            iconProps: { iconName: 'ReleaseGate' },
            split: true,
            ariaLabel: 'Post',
            onClick: PostGate
        },
        {
            key: 'cancel',
            text: 'Cancel',
            iconProps: { iconName: 'Cancel' },
            ariaLabel: 'Cancel',
            onClick: gateClose
        },
    ];
    const farItems: ICommandBarItemProps[] = [
        {
            key: 'cancel',
            text: '',
            iconProps: { iconName: 'Cancel' },
            split: true,
            ariaLabel: 'Cancel',
            onClick: gateClose
        },
    ];

    return (
        <div>
            <CommandBar
                items={items} farItems={farItems}
            />
        </div>

    );
});