import React from 'react';
import { render, screen } from '@testing-library/react';
import { RootStore } from '../stores/RootStore';
import { VehicleList } from '../components/vehicles/VehicleList';

describe("Vehicle list", () => {
    test('should render a vehicle list with no selected vehicles', async () => {
        const store = new RootStore();

        render(
            <VehicleList store={store.VehiclesStore} gate={store.Gates} />
        );

        const stringElement = screen.queryByText(/Selected: /i);
        expect(stringElement).not.toBeInTheDocument();
    });
})
