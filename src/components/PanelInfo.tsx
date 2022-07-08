import React from 'react';
import { Vehicle } from '../model/Vehicle';


export const PanelInfo = (props: { vehicle: Vehicle }) => {

    const vehicle = props.vehicle;
    return (
        <>{vehicle &&
            <div className="flex-container">
                <div className="flex-item">
                    <div className="flex-item-name">Vehicle Id:</div>
                    {vehicle.vehicleId}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Make:</div>
                    {vehicle.make}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Model:</div>
                    {vehicle.model}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Registration date:</div>
                    {vehicle.regDateText}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Registration place:</div>
                    {vehicle.registrationPlace}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Fuel type:</div>
                    {vehicle.fuelType}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Engine power:</div>
                    {vehicle.enginePower}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Engine torque:</div>
                    {vehicle.engineTorque}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Color:</div>
                    {vehicle.color}
                </div>
                <div className="flex-item">
                    <div className="flex-item-name">Doors:</div>
                    {vehicle.doors}
                </div>
            </div>
        }
        </>
    );
}