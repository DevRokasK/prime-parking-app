import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { observer } from 'mobx-react';
import { Permit } from '../../model/Permit';

export interface IPermitPanelFooterProps {
    permit: Permit;
}

export const PermitPanelFooter = observer(({ permit }: IPermitPanelFooterProps) => {
    const switchToDisplay = () => {
        permit.SwitchToDisplay();
    }

    const saveEdit = () => {
        permit.SaveEdit().then();
    }

    if (permit?.readOnly) {
        return (
            <></>
        )
    } else {
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