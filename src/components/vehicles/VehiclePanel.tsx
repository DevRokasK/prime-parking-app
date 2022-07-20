import React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { DatePicker } from '@fluentui/react';
import { Vehicle } from '../../model/Vehicle';
import { observer } from 'mobx-react';
import { Utils } from '../../model/Utils';

export const PanelInfo = observer((props: { vehicle: Vehicle }) => {
    
    const vehicle = props.vehicle;

    return (
        <>{vehicle &&
            <div className="flex-container">
                {vehicle.hasError &&
                    <MessageBar
                        messageBarType={MessageBarType.error}
                        onDismiss={vehicle.clearError}
                        >
                        {vehicle.errorMessage}
                    </MessageBar>}
                <div className='flex-name'>
                    <h2>Registration Information</h2>
                </div>
                <div className="flex-item">
                    <Label >Vehicle Id:</Label>
                    <TextField defaultValue={vehicle.carNumber} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setCarNumber(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className='flex-item'></div>
                <div className="flex-item">
                    <Label >Registration date:</Label>
                    {vehicle.readOnly ?
                        <TextField defaultValue={vehicle.regDateText} readOnly /> :
                        <DatePicker value={vehicle.registrationYear} formatDate={Utils.formatDate} disabled={vehicle.readOnly} onSelectDate={(value) => vehicle.setRegistrationYear(value)} />
                    }
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label >Registration place:</Label>
                    <TextField defaultValue={vehicle.registrationPlace} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setRegistrationPlace(value)} />
                </div>
                <div className='flex-name'>
                    <h2>Vehicle Characteristics</h2>
                </div>
                <div className="flex-item">
                    <Label >Make:</Label>
                    <TextField defaultValue={vehicle.make} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setMake(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label >Model:</Label>
                    <TextField defaultValue={vehicle.model} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setModel(value)} />
                </div>
                <div className="flex-item">
                    <Label >Engine power:</Label>
                    <TextField defaultValue={vehicle.regEnginePower} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setEnginePower(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label >Engine torque:</Label>
                    <TextField defaultValue={vehicle.regEngineTorque} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setEngineTorque(value)} />
                </div>
                <div className="flex-item">
                    <Label >Fuel type:</Label>
                    <TextField defaultValue={vehicle.fuelType} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setFuelType(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label >Color:</Label>
                    <TextField defaultValue={vehicle.color} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setColor(value)} />
                </div>
                <div className="flex-item">
                    <Label >Doors:</Label>
                    <TextField defaultValue={vehicle.regDoors} readOnly={vehicle.readOnly} onChange={(e, value) => vehicle.setDoors(value)} />
                </div>
            </div>
        }
        </>
    );
})