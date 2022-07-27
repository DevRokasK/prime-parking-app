import React from 'react';
import { MessageBar, MessageBarType, ComboBox, IComboBoxOption } from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react';
import { Permit, PermitState } from '../../model/Permit';
import { observer } from 'mobx-react';
import { Utils } from '../../model/Utils';

export interface IPanelProps {
    permit: Permit;
}

export const PermitPanel = observer(({ permit }: IPanelProps) => {

    let optionsPermit: IDropdownOption[] = [
        { key: 0, text: 'Planned' },
    ];
    let optionsId: IComboBoxOption[] = [];

    const displayDropdown = () => {
        let result = false;
        if (permit.readOnly || permit.id !== '')
            result = true;
        return result;
    }

    const permitState = () => {
        let result = false;
        if (permit.state === PermitState.completed ||
            permit.state === PermitState.missed ||
            permit.readOnly)
            result = true;
        return result;
    }

    if (permit) {
        if (permit?.id !== '') {
            optionsPermit = [
                { key: 0, text: 'Planned' },
                { key: 1, text: 'In Territory' },
                { key: 2, text: 'Completed' },
                { key: 3, text: 'Missed' },
            ];
            optionsId = [
                { key: permit.id, text: permit.carId }
            ];
        }
        else {
            optionsPermit = [
                { key: 0, text: 'Planned' },
            ];
        }
    }

    const resolveVehicles = () => { return permit.store.ResolveVehicles(); }

    return (
        <>{permit &&
            <div className="flex-container">
                {permit.hasError &&
                    <MessageBar
                        messageBarType={MessageBarType.error}
                        onDismiss={permit.clearError}
                    >
                        {permit.errorMessage}
                    </MessageBar>}
                <div className='flex-name'>
                    <h2>Permit Details</h2>
                </div>
                <div className="flex-item">
                    <Label>Vehicle Id:</Label>
                    <ComboBox onResolveOptions={resolveVehicles} options={optionsId} defaultSelectedKey={permit.id} disabled={displayDropdown()} onChange={(e, value: IDropdownOption) => permit.setCarId(value.text as string)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>State:</Label>
                    <Dropdown options={optionsPermit} defaultSelectedKey={permit.state} disabled={permitState()} onChange={(e, value: IDropdownOption) => permit.setState(value.key as number)} />
                </div>
                <div className="flex-item">
                    <Label>Stay From:</Label>
                    <DatePicker value={permit.from} formatDate={Utils.formatDate} disabled={permitState()} onSelectDate={(value) => permit.setFrom(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>Stay Until:</Label>
                    <DatePicker value={permit.to} formatDate={Utils.formatDate} disabled={permitState()} onSelectDate={(value) => permit.setTo(value)} />
                </div>
                < div className="flex-item">
                    <Label>Entered:</Label>
                    <DatePicker value={permit.entered} formatDate={Utils.formatDate} disabled onSelectDate={(value) => permit.setEntered(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>Left:</Label>
                    <DatePicker value={permit.left} formatDate={Utils.formatDate} disabled onSelectDate={(value) => permit.setLeft(value)} />
                </div>
            </div>
        }
        </>
    );
})