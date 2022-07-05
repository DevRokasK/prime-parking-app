import * as React from 'react';
import { observer } from 'mobx-react';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from '@fluentui/react';
import { CarStore } from '../../stores/CarStore';
import { CarCommandBar } from './CarCommandBar';

export interface ICarListProps {
    store: CarStore;
}
@observer
export class CarList extends React.Component<ICarListProps> {
    private columns: IColumn[];

    public constructor(props: ICarListProps) {
        super(props);

        this.columns = [
            {
                key: 'column1',
                name: 'Car ID',
                fieldName: 'carId',
                minWidth: 70,
                maxWidth: 90,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                sortAscendingAriaLabel: 'Sorted A to Z',
                sortDescendingAriaLabel: 'Sorted Z to A',
                data: 'string',
                isPadded: true
            },
            {
                key: 'column2',
                name: 'Make',
                fieldName: 'make',
                minWidth: 40,
                maxWidth: 60,
                isResizable: true,
                data: 'string',
                isPadded: true
            },
            {
                key: 'column3',
                name: 'Model',
                fieldName: 'model',
                minWidth: 40,
                maxWidth: 60,
                isResizable: true,
                isCollapsible: true,
                data: 'string',
                isPadded: true
            },
            {
                key: 'column4',
                name: 'Registration date',
                fieldName: 'regDateText',
                minWidth: 100,
                maxWidth: 120,
                isResizable: true,
                isCollapsible: true,
                data: 'string'
            },
            {
                key: 'column5',
                name: 'Registration place',
                fieldName: 'registrationPlace',
                minWidth: 100,
                maxWidth: 120,
                isResizable: true,
                isCollapsible: true,
                data: 'number'

            },
            {
                key: 'column6',
                name: 'Fuel type',
                fieldName: 'fuelType',
                minWidth: 50,
                maxWidth: 70,
                isResizable: true,
                isCollapsible: true,
                data: 'string'
            },
            {
                key: 'column7',
                name: 'Engine power',
                fieldName: 'enginePower',
                minWidth: 80,
                maxWidth: 100,
                isResizable: true,
                isCollapsible: true,
                data: 'number'
            },
            {
                key: 'column8',
                name: 'Engine torque',
                fieldName: 'engineTorque',
                minWidth: 80,
                maxWidth: 100,
                isResizable: true,
                isCollapsible: true,
                data: 'number'
            },
            {
                key: 'column9',
                name: 'Color',
                fieldName: 'color',
                minWidth: 40,
                maxWidth: 60,
                isResizable: true,
                isCollapsible: true,
                data: 'string'
            },
            {
                key: 'column10',
                name: 'Doors',
                fieldName: 'doors',
                minWidth: 40,
                maxWidth: 60,
                isResizable: true,
                isCollapsible: true,
                data: 'number'
            },
        ];

    }

    public render() {
        const columns = this.columns;
        const items = this.props.store.Cars.slice();
        return (
            <div>
                <CarCommandBar/>
                <DetailsList
                    items={items}
                    columns={columns}
                    selectionMode={SelectionMode.single}
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                />
            </div>
        );
    }
}
