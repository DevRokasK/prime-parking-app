import React from 'react';
import { MessageBar, MessageBarType, CommandBar, ICommandBarItemProps, Spinner, SpinnerSize } from '@fluentui/react';
import { observer } from 'mobx-react';
import { Vehicle } from '../../model/Vehicle';

export interface IFileCommandBarProps {
    vehicle: Vehicle;
    items: ICommandBarItemProps[]
}

export const FileCommandBar = observer(({ vehicle, items }: IFileCommandBarProps) => {

    const farItems: ICommandBarItemProps[] = [];
    if (vehicle.DocumentStore.selectedFiles.length > 0) {
        let count: string = vehicle.DocumentStore.selectedFiles.length.toString();
        farItems.push({
            key: 'count',
            text: 'Selected: ' + count,
            ariaLabel: 'Count',
        })
    }

    if (vehicle.running) {
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
            {
                vehicle.DocumentStore.hasError &&
                <MessageBar
                    messageBarType={MessageBarType.error}
                    onDismiss={vehicle.DocumentStore.clearError}
                >
                    {vehicle.DocumentStore.errorMessage}
                </MessageBar>}
            <div>
                <CommandBar
                    items={items} farItems={farItems}
                />
            </div>
        </div>
    );
})
