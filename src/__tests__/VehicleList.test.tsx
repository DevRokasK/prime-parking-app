import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RootStore } from '../stores/RootStore';
import { VehicleList } from '../components/vehicles/VehicleList';
import { Vehicle } from '../model/Vehicle';

describe("Vehicle list", () => {
    test('should render a vehicle list with no selected vehicles', async () => {
        const store = new RootStore();

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const stringElement = screen.queryByText(/Selected: /i);
        expect(stringElement).not.toBeInTheDocument();
    });

    test('should render a vehicle list with 2 selected vehicles', async () => {
        const store = new RootStore();
        const vehicle = new Vehicle({
            carNumber: "abc", id: "sdfha", make: "bmw", model: "x5",
            registrationYear: new Date(2, 2, 2022), registrationPlace: "Palanga", fuelType: "Diesel",
            enginePower: 90, engineTorque: 200, color: "black", doors: 5
        }, store.VehiclesStore);
        store.VehiclesStore.SelectedVehicles.push(vehicle);
        store.VehiclesStore.SelectedVehicles.push(vehicle);
        const selectedText = "Selected: 2";

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const stringElement = screen.queryByText(selectedText);
        expect(stringElement).toBeInTheDocument();
    });

    test('should render a gate button', async () => {
        const store = new RootStore();

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const buttonElement = screen.getByText(/Gate/i);
        expect(buttonElement).toBeInTheDocument();
    });

})
