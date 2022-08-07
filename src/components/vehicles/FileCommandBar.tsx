import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { MessageBar, MessageBarType, Panel, PanelType, } from '@fluentui/react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { observer } from 'mobx-react';
import { Vehicle } from '../../model/Vehicle';

export interface IFileCommandBarProps {
    vehicle: Vehicle;
}

export const FileCommandBar = observer((vehicle: IFileCommandBarProps) => {
    const Upload = () => {

    }

    const Delete = () => {
        vehicle.vehicle.DeleteFiles();
    }

    const items: ICommandBarItemProps[] = [
        {
            key: 'upload',
            text: 'Upload',
            iconProps: { iconName: 'Upload' },
            split: true,
            ariaLabel: 'Upload',
            onClick: Upload,
        },
        {
            key: 'delete',
            text: 'Delete',
            iconProps: { iconName: 'Delete' },
            ariaLabel: 'Delete',
            disabled: vehicle.vehicle.DocumentStore.selectedFiles.length === 0,
            onClick: Delete,
        },
    ];

    const farItems: ICommandBarItemProps[] = [];
    if (vehicle.vehicle.DocumentStore.selectedFiles.length > 0) {
        let count: string = vehicle.vehicle.DocumentStore.selectedFiles.length.toString();
        farItems.push({
            key: 'count',
            text: 'Selected: ' + count,
            ariaLabel: 'Count',
        })
    }

    if (vehicle.vehicle.running) {
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
            <div>
                <CommandBar
                    items={items} farItems={farItems}
                />
            </div>
            {
                vehicle.vehicle.DocumentStore.hasError &&
                <MessageBar
                    messageBarType={MessageBarType.error}
                    onDismiss={vehicle.vehicle.DocumentStore.clearError}
                >
                    {vehicle.vehicle.DocumentStore.errorMessage}
                </MessageBar>}
        </div>
    );
})
