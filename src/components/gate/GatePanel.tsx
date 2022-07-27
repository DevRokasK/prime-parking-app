import React from 'react';
import { MessageBar, MessageBarType, ComboBox } from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { observer } from 'mobx-react';
import { VehicleStore } from '../../stores/VehicleStore';
import { Gate } from '../../stores/Gate';

export interface IPanelProps {
    store: VehicleStore;
    gate: Gate;
}

export const GatePanel = observer(({ store, gate }: IPanelProps) => {

    const options: IDropdownOption[] = [
        { key: 'in', text: 'in' },
        { key: 'out', text: 'out' }
    ];

    let optionsVehicles: IDropdownOption[] = [];

    const resolveVehicles = async () => {
        optionsVehicles = await store.ResolveVehicles();
        return optionsVehicles;
    }

    return (
        <>{store.Vehicles &&
            <div className="flex-container">
                {gate.hasError &&
                    <MessageBar
                        messageBarType={MessageBarType.error}
                        onDismiss={gate.clearError}
                    >
                        {gate.errorMessage}
                    </MessageBar>}
                {gate.hasSuccess &&
                    <MessageBar
                        messageBarType={MessageBarType.success}
                        onDismiss={gate.clearError}
                    >
                        {gate.successMessage}
                    </MessageBar>}
                <div className='flex-name'>
                    <h2>Gate interaction</h2>
                </div>
                <div className="flex-item">
                    <Label>Vehicle Id:</Label>
                    <ComboBox onResolveOptions={resolveVehicles} options={optionsVehicles} onChange={(e, value: IDropdownOption) => gate.setVehicleId(value.text as string)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>State:</Label>
                    <Dropdown options={options} onChange={(e, value: IDropdownOption) => gate.setDirection(value.key as string)} />
                </div>
            </div>
        }
        </>
    );
})