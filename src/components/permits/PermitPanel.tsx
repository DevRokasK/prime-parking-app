import React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react';
import { Permit } from '../../model/Permit';
import { observer } from 'mobx-react';
import { Utils } from '../../model/Utils';

export const PanelInfo = observer((props: { permit: Permit }) => {

    const permit = props.permit;
    const options: IDropdownOption[] = [
        { key: 0, text: 'None' },
        { key: 3, text: 'Planned' },
        { key: 1, text: 'In Territory' },
        { key: 2, text: 'Completed' },
    ];

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
                    <TextField defaultValue={permit.carId} readOnly={permit.readOnly} onChange={(e, value) => permit.setCarId(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>State:</Label>
                    <Dropdown options={options} defaultSelectedKey={permit.state} disabled={permit.readOnly} onChange={(e, value: IDropdownOption) => permit.setState(value.key as number)} />
                </div>
                <div className="flex-item">
                    <Label>Stay From:</Label>
                    <DatePicker value={permit.from} formatDate={Utils.formatDate} disabled={permit.readOnly} onSelectDate={(value) => permit.setFrom(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>Stay Until:</Label>
                    <DatePicker value={permit.to} formatDate={Utils.formatDate} disabled={permit.readOnly} onSelectDate={(value) => permit.setTo(value)} />
                </div>
                <div className="flex-item">
                    <Label>Entered:</Label>
                    <DatePicker value={permit.entered} formatDate={Utils.formatDate} disabled={permit.readOnly} onSelectDate={(value) => permit.setEntered(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>Left:</Label>
                    <DatePicker value={permit.left} formatDate={Utils.formatDate} disabled={permit.readOnly} onSelectDate={(value) => permit.setLeft(value)} />
                </div>
            </div>
        }
        </>
    );
})