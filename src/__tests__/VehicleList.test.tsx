import React from 'react';
import { render, screen, fireEvent, findByText } from '@testing-library/react';
import { RootStore } from '../stores/RootStore';
import { VehicleList } from '../components/vehicles/VehicleList';
import { Vehicle } from '../model/Vehicle';
import { VehicleStore } from '../stores/VehicleStore';

const NewVehicle = (store: VehicleStore) => {
    return new Vehicle({
        carNumber: "abc", id: "sdfha", make: "bmw", model: "x5",
        registrationYear: new Date("2022-02-02"), registrationPlace: "Palanga", fuelType: "Diesel",
        enginePower: 90, engineTorque: 200, color: "black", doors: 5
    }, store);
}

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
        const vehicle = NewVehicle(store.VehiclesStore);
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

        // testing if a panel opens when the button is pressed
        // fireEvent.click(buttonElement);
        // const textElement = getByText(/Gate interaction/i);
        // expect(textElement).toBeInTheDocument();
    });

    test('should render a vehicle panel, visual element test', async () => {
        const store = new RootStore();
        store.VehiclesStore.AddVehicle();

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const regHeaderElement = screen.getByText(/Registration Information/i);
        const vehCharHeaderElement = screen.getByText(/Vehicle Characteristics/i);
        const vehicleId = screen.getByText(/Vehicle Id:/i);
        const regDate = screen.getByText(/Registration date:/i);
        const regPlace = screen.getByText(/Registration place:/i);
        const make = screen.getByText(/Make:/i);
        const model = screen.getByText(/Model:/i);
        const engineP = screen.getByText(/Engine power:/i);
        const engineT = screen.getByText(/Engine torque:/i);
        const fuelType = screen.getByText(/Fuel type:/i);
        const color = screen.getByText(/Color:/i);
        const doors = screen.getByText(/Doors:/i);

        expect(regHeaderElement).toBeInTheDocument();
        expect(vehCharHeaderElement).toBeInTheDocument();
        expect(vehicleId).toBeInTheDocument();
        expect(regDate).toBeInTheDocument();
        expect(regPlace).toBeInTheDocument();
        expect(make).toBeInTheDocument();
        expect(model).toBeInTheDocument();
        expect(engineP).toBeInTheDocument();
        expect(engineT).toBeInTheDocument();
        expect(fuelType).toBeInTheDocument();
        expect(color).toBeInTheDocument();
        expect(doors).toBeInTheDocument();
    });
    
    test('should render a vehicle panel, text field test', async () => {
        const store = new RootStore();
        store.VehiclesStore.AddVehicle();

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const vehicleId = screen.getByPlaceholderText('plate number');
        fireEvent.change(vehicleId, {target: {value: "AAA 999"}});
        expect(vehicleId.value).toBe("AAA 999");

        const regPlace = screen.getByPlaceholderText('location');
        fireEvent.change(regPlace, {target: {value: "Vilnius"}});
        expect(regPlace.value).toBe("Vilnius");

        const make = screen.getByPlaceholderText('make');
        fireEvent.change(make, {target: {value: "Ford"}});
        expect(make.value).toBe("Ford");

        const model = screen.getByPlaceholderText('model');
        fireEvent.change(model, {target: {value: "Focus"}});
        expect(model.value).toBe("Focus");

        const engineP = screen.getByPlaceholderText('engine power');
        fireEvent.change(engineP, {target: {value: "90"}});
        expect(engineP.value).toBe("90");

        const engineT = screen.getByPlaceholderText('engine torque');
        fireEvent.change(engineT, {target: {value: "250"}});
        expect(engineT.value).toBe("250");

        const fuelType = screen.getByPlaceholderText('fuel type');
        fireEvent.change(fuelType, {target: {value: "Petrol"}});
        expect(fuelType.value).toBe("Petrol");

        const color = screen.getByPlaceholderText('color');
        fireEvent.change(color, {target: {value: "Blue"}});
        expect(color.value).toBe("Blue");

        const doors = screen.getByPlaceholderText('door count');
        fireEvent.change(doors, {target: {value: "5"}});
        expect(doors.value).toBe("5");
    });

    test('should render a vehicle panel, data test', async () => {
        const store = new RootStore();
        const vehicle = NewVehicle(store.VehiclesStore);
        store.VehiclesStore.Vehicles.push(vehicle);
        store.VehiclesStore.SetCurrentVehicle(vehicle);

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const vehicleId = await screen.findByDisplayValue(/abc/i);
        const regDate = await screen.findByDisplayValue(/2022-02-02/i);
        const regPlace = await screen.findByDisplayValue(/Palanga/i);
        const make = await screen.findByDisplayValue(/bmw/i);
        const model = await screen.findByDisplayValue("x5");
        const engineP = await screen.findByDisplayValue(/90/i);
        const engineT = await screen.findByDisplayValue(/200/i);
        const fuelType = await screen.findByDisplayValue(/Diesel/i);
        const color = await screen.findByDisplayValue(/black/i);
        const doors = await screen.findByDisplayValue("5");

        expect(vehicleId).toBeInTheDocument();
        expect(regDate).toBeInTheDocument();
        expect(regPlace).toBeInTheDocument();
        expect(make).toBeInTheDocument();
        expect(model).toBeInTheDocument();
        expect(engineP).toBeInTheDocument();
        expect(engineT).toBeInTheDocument();
        expect(fuelType).toBeInTheDocument();
        expect(color).toBeInTheDocument();
        expect(doors).toBeInTheDocument();
    });

})
