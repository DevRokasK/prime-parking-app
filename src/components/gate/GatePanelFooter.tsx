import React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { observer } from 'mobx-react';
import { Gate } from '../../stores/Gate';

export interface IGatePanelFooterProps {
    gate: Gate;
}

export const GatePanelFooter = observer(({ gate }: IGatePanelFooterProps) => {
    const gateClose = () => {
        gate.gateClose();
    }

    const PostGate = () => {
        gate.PostGate();
    }

    return (
        <div className='footer-buttons'>
            <PrimaryButton className='button-style' onClick={PostGate}>
                Post
                </PrimaryButton>
            <DefaultButton onClick={gateClose}>
                Cancel
                </DefaultButton>
        </div>
    )
});