import React from 'react';
import { MessageBar, MessageBarType, TagPicker, ITag, IBasePickerSuggestionsProps, Label, Dropdown, IDropdownOption } from '@fluentui/react';
import { observer } from 'mobx-react';
import { VehicleStore } from '../../stores/VehicleStore';
import { Gate } from '../../stores/Gate';

export interface IPanelProps {
    store: VehicleStore;
    gate: Gate;
}

export const GatePanel = observer(({ store, gate }: IPanelProps) => {

    const options: IDropdownOption[] = [
        { key: 'in', text: 'in' },
        { key: 'out', text: 'out' }
    ];

    const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
        suggestionsHeaderText: 'Suggested vehicles',
        noResultsFoundText: 'No vehicles found',
    };

    const filterSelectedTags = (filterText: string, tagList: ITag[]): Promise<ITag[]> => {
        return store.ResolveVehicleTags(filterText);
    };

    return (
        <>{store.Vehicles &&
            <div className="flex-container">
                {gate.hasError &&
                    <MessageBar
                        messageBarType={MessageBarType.error}
                        onDismiss={gate.clearError}
                    >
                        {gate.errorMessage}
                    </MessageBar>}
                {gate.hasSuccess &&
                    <MessageBar
                        messageBarType={MessageBarType.success}
                        onDismiss={gate.clearError}
                    >
                        {gate.successMessage}
                    </MessageBar>}
                <div className='flex-name'>
                    <h2>Gate interaction</h2>
                </div>
                <div className="flex-item">
                    <Label>Vehicle Id:</Label>
                    <TagPicker
                        onResolveSuggestions={filterSelectedTags}
                        itemLimit={1}
                        pickerSuggestionsProps={pickerSuggestionsProps}
                        onChange={(value?: ITag[]) => {
                            if (value.length > 0) {
                                gate.setVehicleId(value[0].name as string);
                            } else {
                                gate.setVehicleId("");
                            }
                        }} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>State:</Label>
                    <Dropdown options={options} onChange={(e, value: IDropdownOption) => gate.setDirection(value.key as string)} />
                </div>
            </div>
        }
        </>
    );
})