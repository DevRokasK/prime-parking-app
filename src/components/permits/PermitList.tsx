import React from 'react';
import { observer } from 'mobx-react';
import { DetailsListLayoutMode, SelectionMode, IColumn, DetailsList, Panel, Selection, PanelType, Link } from '@fluentui/react';
import { PermitStore } from '../../stores/PermitStore';
import { PermitCommandBar } from './PermitCommandBar';
import { Permit } from '../../model/Permit';
import { PermitPanel } from './PermitPanel';
import { PermitPanelFooter } from './PermitPanelFooter';
import { PermitPanelHeader } from './PermitPanelHeader';

export interface IPermitListProps {
    store: PermitStore;
    permitState: string;
}

@observer
export class PermitList extends React.Component<IPermitListProps> {
    private columns: IColumn[];
    private selection: Selection;

    public constructor(props: IPermitListProps) {
        super(props);

        this.columns = [
            {
                key: 'column1',
                name: 'Vehicle Id',
                fieldName: 'carId',
                minWidth: 70,
                maxWidth: 90,
                isRowHeader: true,
                isResizable: true,
                data: 'string',
                isPadded: true,
                onRender: (item: Permit) => {
                    return <Link onClick={() => { this.selectPermit(item) }}>{item.carId}</Link>
                }
            },
            {
                key: 'column2',
                name: 'Stay from',
                fieldName: 'regFromText',
                minWidth: 100,
                maxWidth: 120,
                isResizable: true,
                data: 'string',
                isPadded: true
            },
            {
                key: 'column3',
                name: 'Stay until',
                fieldName: 'regToText',
                minWidth: 100,
                maxWidth: 120,
                isResizable: true,
                isCollapsible: true,
                data: 'string',
                isPadded: true
            },
            {
                key: 'column4',
                name: 'Entered',
                fieldName: 'regEnteredText',
                minWidth: 100,
                maxWidth: 120,
                isResizable: true,
                isCollapsible: true,
                data: 'string'
            },
            {
                key: 'column5',
                name: 'Left',
                fieldName: 'regLeftText',
                minWidth: 100,
                maxWidth: 120,
                isResizable: true,
                isCollapsible: true,
                data: 'string'

            },
            {
                key: 'column6',
                name: 'State',
                fieldName: 'regStatus',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: 'string'
            },
        ];

        this.selection = new Selection({
            onSelectionChanged: this.onSelectionChanged
        });
    }

    public componentDidMount() {
        this.props.store.Init(this.props.permitState).then();
    }

    public componentDidUpdate(prevProps: IPermitListProps) {
        if (prevProps.permitState !== this.props.permitState) {
            this.props.store.Init(this.props.permitState).then();
        }
    }

    public render() {
        const columns = this.columns;
        const store = this.props.store;
        const items = store.Permits.slice();

        return (
            <div>
                <PermitCommandBar store={store} />
                <DetailsList
                    items={items}
                    onRenderMissingItem={this.onRenderMissingItem}
                    selection={this.selection}
                    columns={columns}
                    selectionMode={SelectionMode.multiple}
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                />
                <Panel type={PanelType.medium}
                    isLightDismiss
                    isOpen={store.IsPermitSelected}
                    onDismiss={this.onPanelDismis}
                    onRenderNavigation={this.onRenderNavigation}
                    onRenderFooter={this.onRenderFooter}
                    isFooterAtBottom={true}
                >
                    <PermitPanel permit={store.CurrentPermit}></PermitPanel>
                </Panel>
            </div>
        );
    }

    private renderedMissingIndex = 0;
    private onRenderMissingItem = (index: number): React.ReactNode => {
        if (index !== this.renderedMissingIndex) {
            setTimeout(() => { this.props.store.Init(this.props.permitState); }, 0);
        }
        this.renderedMissingIndex = index;
        return null;
    }

    private onRenderNavigation = () => {
        return (<PermitPanelHeader permit={this.props.store.CurrentPermit} />);
    }

    private onRenderFooter = () => {
        return (<PermitPanelFooter permit={this.props.store.CurrentPermit} />);
    }

    private onPanelDismis = () => {
        this.props.store.DeselectPermit();
    }

    private onSelectionChanged = () => {
        const selectedItems = this.selection.getSelection();
        this.props.store.SetSelectedPermits(selectedItems as Permit[]);
    }

    private selectPermit = (permit: Permit) => {
        this.props.store.SetCurrentPermit(permit);
    }
}