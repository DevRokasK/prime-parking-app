import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { VehicleStore } from '../../stores/VehicleStore';
import { observer } from 'mobx-react';

export interface IVehiclePanelFooterProps {
    store: VehicleStore;
}

export const VehiclePanelFooter = observer(({ store }: IVehiclePanelFooterProps) => {
    const switchToDisplay = () => {
        store.SwitchToDisplay();
    }

    const saveEdit = () => {
        store.SaveEdit();
    }

    if (store?.CurrentVehicle?.readOnly) {
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