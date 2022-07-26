import React from 'react';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { MessageBar, MessageBarType, Panel, PanelType, } from '@fluentui/react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { VehicleStore } from '../../stores/VehicleStore';
import { observer } from 'mobx-react';
import { Gate } from '../../stores/Gate';
import { GatePanel } from '../gate/GatePanel';
import { GatePanelFooter } from '../gate/GatePanelFooter';
import { GatePanelHeader } from '../gate/GatePanelHeader';

export interface IVehicleCommandBarProps {
  store: VehicleStore;
  gate: Gate;
}

export const VehicleCommandBar = observer(({ store, gate }: IVehicleCommandBarProps) => {
  const addVehicle = () => {
    store.AddVehicle();
  }

  const editVehicle = () => {
    store.EditVehicle();
  }

  const deleteVehicle = () => {
    store.DeleteVehicle().then();
  }

  const gateOpen = () => {
    gate.clearError();
    gate.initFromData();
    gate.gateOpen();
  }

  const gateClose = () => {
    gate.gateClose();
  }

  const items: ICommandBarItemProps[] = [{
    key: 'add',
    text: 'Add',
    iconProps: { iconName: 'Add' },
    split: true,
    ariaLabel: 'Add',
    onClick: addVehicle
  },
  {
    key: 'edit',
    text: 'Edit',
    iconProps: { iconName: 'Edit' },
    split: true,
    ariaLabel: 'Edit',
    disabled: store.SelectedVehicles.length !== 1,
    onClick: editVehicle
  },
  {
    key: 'delete',
    text: 'Delete',
    iconProps: { iconName: 'Delete' },
    ariaLabel: 'Delete',
    disabled: store.SelectedVehicles.length === 0,
    onClick: deleteVehicle
  },
  {
    key: 'gate',
    text: 'Gate',
    iconProps: { iconName: 'ReleaseGate' },
    ariaLabel: 'Gate',
    disabled: store.Vehicles.length < 1,
    onClick: gateOpen
  }
  ];

  const farItems: ICommandBarItemProps[] = [];

  if (store.running) {
    farItems.push(
      {
        key: 'running',
        text: '',
        onRender: () => {
          return <Spinner size={SpinnerSize.medium} />
        }
      }
    );
  }

  const onRenderNavigation = () => {
    return (<GatePanelHeader gate={gate} />);
  }

  const onRenderFooter = () => {
    return (<GatePanelFooter gate={gate} />);
  }

  return (
    <div>
      <div className="command-bar">
        <CommandBar
          items={items} farItems={farItems}
        />
      </div>
      {store.hasError &&
        <MessageBar
          messageBarType={MessageBarType.error}
          onDismiss={store.clearError}
        >
          {store.errorMessage}
        </MessageBar>}
      <Panel type={PanelType.medium}
        isLightDismiss
        isOpen={gate.isOpen}
        onDismiss={gateClose}
        onRenderNavigation={onRenderNavigation}
        onRenderFooter={onRenderFooter}
        isFooterAtBottom={true}
      >
        <GatePanel store={store} gate={gate} />
      </Panel>
    </div>
  );
});

