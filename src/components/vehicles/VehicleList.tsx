import React from 'react';
import { observer } from 'mobx-react';
import { DetailsListLayoutMode, SelectionMode, IColumn, ShimmeredDetailsList, Panel, Selection, PanelType, Link } from '@fluentui/react';
import { VehicleStore } from '../../stores/VehicleStore';
import { VehicleCommandBar } from './VehicleCommandBar';
import { Vehicle } from '../../model/Vehicle';
import { VehiclePanel } from './VehiclePanel';
import { VehiclePanelFooter } from './VehiclePanelFooter';
import { VehiclePanelHeader } from './VehiclePanelHeader';
import { Gate } from '../../stores/Gate';

export interface ICarListProps {
    store: VehicleStore;
    gate: Gate;
}

@observer
export class VehicleList extends React.Component<ICarListProps> {
    private columns: IColumn[];
    private selection: Selection;

    public constructor(props: ICarListProps) {
        super(props);

        this.columns = [
            {
                key: 'column1',
                name: 'Vehicle Id',
                fieldName: 'carNumber',
                minWidth: 70,
                maxWidth: 90,
                isRowHeader: true,
                isResizable: true,
                data: 'string',
                isPadded: true,
                onRender: (item: Vehicle) => {
                    return <Link onClick={() => { this.selectVehicle(item) }}>{item.carNumber}</Link>
                }
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

        this.selection = new Selection({
            onSelectionChanged: this.onSelectionChanged
        });
    }

    public componentDidMount() {
        this.props.store.Init().then();
    }

    public render() {
        const columns = this.columns;
        const store = this.props.store;
        const gate = this.props.gate;
        const items = store.Vehicles.slice();

        return (
            <div>
                <VehicleCommandBar store={store} gate={gate} />
                <ShimmeredDetailsList
                    enableShimmer={store.loading}
                    items={items}
                    selection={this.selection}
                    columns={columns}
                    selectionMode={SelectionMode.multiple}
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                />
                <Panel type={PanelType.medium}
                    isLightDismiss
                    isOpen={store.isVehicleSelected}
                    onDismiss={this.onPanelDismis}
                    onRenderNavigation={this.onRenderNavigation}
                    onRenderFooter={this.onRenderFooter}
                    isFooterAtBottom={true}
                >
                    <VehiclePanel vehicle={store.CurrentVehicle} ></VehiclePanel>
                </Panel>
            </div>
        );
    }

    private onRenderNavigation = () => {
        return (<VehiclePanelHeader vehicle={this.props.store.CurrentVehicle} />);
    }

    private onRenderFooter = () => {
        return (<VehiclePanelFooter vehicle={this.props.store.CurrentVehicle} />);
    }

    private onPanelDismis = () => {
        this.props.store.DeselectVehicle();
    }

    private onSelectionChanged = () => {
        const selectedItems = this.selection.getSelection();
        this.props.store.SetSelectedVehicles(selectedItems as Vehicle[]);
    }

    private selectVehicle = (vehicle: Vehicle) => {
        this.props.store.SetCurrentVehicle(vehicle);
    }
}
