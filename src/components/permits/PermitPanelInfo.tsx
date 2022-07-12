import React from 'react';
import { Permit } from '../../model/Permit';


export const PanelInfo = (props: { permit: Permit }) => {

    const permit = props.permit;
    return (
        <>{permit &&
            <div className="flex-container">
                <div className='flex-name'>
                    <h2>Permit Details</h2>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Vehicle Id:</div>
                    <div className='flex-item-content'>{permit.carId}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">State:</div>
                    <div className='flex-item-content'>{permit.regStatus}</div>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Stay From:</div>
                    <div className='flex-item-content'>{permit.regFromText}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Stay Until:</div>
                    <div className='flex-item-content'>{permit.regToText}</div>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Entered:</div>
                    <div className='flex-item-content'>{permit.regEnteredText}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Left:</div>
                    <div className='flex-item-content'>{permit.regLeftText}</div>
                </div>
            </div>
        }
        </>
    );
}