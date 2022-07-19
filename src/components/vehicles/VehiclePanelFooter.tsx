import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { observer } from 'mobx-react';
import { Vehicle } from '../../model/Vehicle';

export interface IVehiclePanelFooterProps {
    vehicle: Vehicle;
}

export const VehiclePanelFooter = observer(({ vehicle }: IVehiclePanelFooterProps) => {
    const switchToDisplay = () => {
        vehicle.SwitchToDisplay();
    }

    const saveEdit = () => {
        vehicle.SaveEdit().then();
    }

    if (vehicle?.readOnly) {
        return (
            <></>
        )
    }
    else {
        return (
            <div className='footer-buttons'>
                <PrimaryButton className='button-style' onClick={saveEdit}>
                    Save
                    </PrimaryButton>
                <DefaultButton onClick={switchToDisplay}>
                    Cancel
                    </DefaultButton>
            </div>
        )
    }
});