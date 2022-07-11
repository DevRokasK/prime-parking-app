import React from 'react';
import { Vehicle } from '../../model/Vehicle';


export const PanelInfo = (props: { vehicle: Vehicle }) => {

    const vehicle = props.vehicle;
    return (
        <>{vehicle &&
            <div className="flex-container">
                <div className='flex-name'>
                    <h2>Registration Information</h2>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Vehicle Id:</div>
                    <div className='flex-item-content'>{vehicle.carNumber}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Registration date:</div>
                    <div className='flex-item-content'>{vehicle.regDateText}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Registration place:</div>
                    <div className='flex-item-content'>{vehicle.registrationPlace}</div>
                </div>
                <div className='flex-name'>
                    <h2>Vehicle Characteristics</h2>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Make:</div>
                    <div className='flex-item-content'>{vehicle.make}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Model:</div>
                    <div className='flex-item-content'>{vehicle.model}</div>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Engine power:</div>
                    <div className='flex-item-content'>{vehicle.enginePower}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Engine torque:</div>
                    <div className='flex-item-content'>{vehicle.engineTorque}</div>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Fuel type:</div>
                    <div className='flex-item-content'>{vehicle.fuelType}</div>
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <div className="flex-item-name">Color:</div>
                    <div className='flex-item-content'>{vehicle.color}</div>
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Doors:</div>
                    <div className='flex-item-content'>{vehicle.doors}</div>
                </div>
            </div>
        }
        </>
    );
}