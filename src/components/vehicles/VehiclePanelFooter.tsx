import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export const VehiclePanelFooter = () => {

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