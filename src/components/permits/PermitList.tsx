import React from 'react';
import { observer } from 'mobx-react';
import { DetailsListLayoutMode, SelectionMode, IColumn, ShimmeredDetailsList, Panel, Selection, PanelType } from '@fluentui/react';
import { PermitStore } from '../../stores/PermitStore';
import { PermitCommandBar } from './PermitCommandBar';
import { Permit } from '../../model/Permit';
import { PanelInfo } from './PermitPanelInfo';
import { PermitPanelFooter } from './PermitPanelFooter';
import { PermitPanelHeader } from './PermitPanelHeader';

export interface IPermitListProps {
    store: PermitStore;
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
                name: 'Car ID',
                fieldName: 'carId',
                minWidth: 70,
                maxWidth: 90,
                isRowHeader: true,
                isResizable: true,
                data: 'string',
                isPadded: true
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
                minWidth: 50,
                maxWidth: 70,
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
        this.props.store.Init().then();
    }

    public render() {
        const columns = this.columns;
        const store = this.props.store;
        const items = store.Permits.slice();

        return (
            <div>
                <PermitCommandBar />
                <ShimmeredDetailsList
                    enableShimmer={store.loading}
                    items={items}
                    selection={this.selection}
                    columns={columns}
                    selectionMode={SelectionMode.single}
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                />
                <Panel type={PanelType.medium}
                    isLightDismiss
                    isOpen={store.IsPermitSelected}
                    onDismiss={this.onPanelDismis}
                    closeButtonAriaLabel="Close"
                    onRenderNavigationContent={PermitPanelHeader}
                    onRenderFooterContent={PermitPanelFooter}
                    isFooterAtBottom={true}
                >
                    <PanelInfo permit={store.SelectedPermit}></PanelInfo>
                </Panel>
            </div>
        );
    }

    private onPanelDismis = () => {
        this.props.store.DeselectPermit();
    }

    private onSelectionChanged = () => {
        const selectedItems = this.selection.getSelection();
        if (selectedItems.length > 0) {
            const selectedItem = selectedItems[0];
            this.props.store.SelectPermit(selectedItem as Permit);
        }
    }
}