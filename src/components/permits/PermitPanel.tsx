import React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { TagPicker, ITag, IBasePickerSuggestionsProps } from '@fluentui/react/lib/Pickers';
import { Label } from '@fluentui/react/lib/Label';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react';
import { Permit, PermitState } from '../../model/Permit';
import { observer } from 'mobx-react';
import { Utils } from '../../model/Utils';

export interface IPanelProps {
    permit: Permit;
}

export const PermitPanel = observer(({ permit }: IPanelProps) => {

    let optionsPermit: IDropdownOption[] = [
        { key: 0, text: 'Planned' },
    ];

    const displayDropdown = () => {
        let result = false;
        if (permit.readOnly || permit.id !== '')
            result = true;
        return result;
    }

    const permitState = () => {
        let result = false;
        if (permit.state === PermitState.completed ||
            permit.state === PermitState.missed ||
            permit.readOnly)
            result = true;
        return result;
    }

    if (permit && permit?.id !== '') {
        optionsPermit = [
            { key: 0, text: 'Planned' },
            { key: 1, text: 'In Territory' },
            { key: 2, text: 'Completed' },
            { key: 3, text: 'Missed' },
        ];
    }

    const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
        suggestionsHeaderText: 'Suggested vehicles',
        noResultsFoundText: 'No vehicles found',
    };

    const filterSelectedTags = (filterText: string, tagList: ITag[]): Promise<ITag[]> => {
        return permit.store.ResolveVehicles(filterText);
    };

    const defaultValue = () => {
        if (permit?.id) {
            const value: ITag[] = [{ key: permit?.carId, name: permit?.carNumber }];
            return value;
        } else {
            return;
        }
    };

    return (
        <>{permit &&
            <div className="flex-container">
                {permit.hasError &&
                    <MessageBar
                        messageBarType={MessageBarType.error}
                        onDismiss={permit.clearError}
                    >
                        {permit.errorMessage}
                    </MessageBar>}
                <div className='flex-name'>
                    <h2>Permit Details</h2>
                </div>
                <div className="flex-item">
                    <Label>Vehicle Id:</Label>
                    <TagPicker
                        onResolveSuggestions={filterSelectedTags}
                        itemLimit={1}
                        defaultSelectedItems={defaultValue()}
                        disabled={displayDropdown()}
                        pickerSuggestionsProps={pickerSuggestionsProps}
                        onChange={(value?: ITag[]) => {
                            if (value.length > 0) {
                                permit.setCarId(value[0].key as string); permit.setCarNumber(value[0].name as string)
                            } else {
                                permit.setCarId(""); permit.setCarNumber("");
                            }
                        }} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>State:</Label>
                    <Dropdown options={optionsPermit} defaultSelectedKey={permit.state} disabled onChange={(e, value: IDropdownOption) => permit.setState(value.key as number)} />
                </div>
                <div className="flex-item">
                    <Label>Stay From:</Label>
                    <DatePicker value={permit.from} formatDate={Utils.formatDate} disabled={permitState()} onSelectDate={(value) => permit.setFrom(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>Stay Until:</Label>
                    <DatePicker value={permit.to} formatDate={Utils.formatDate} disabled={permitState()} onSelectDate={(value) => permit.setTo(value)} />
                </div>
                < div className="flex-item">
                    <Label>Entered:</Label>
                    <DatePicker value={permit.entered} formatDate={Utils.formatDate} disabled onSelectDate={(value) => permit.setEntered(value)} />
                </div>
                <div className='flex-item-gap'></div>
                <div className="flex-item">
                    <Label>Left:</Label>
                    <DatePicker value={permit.left} formatDate={Utils.formatDate} disabled onSelectDate={(value) => permit.setLeft(value)} />
                </div>
            </div>
        }
        </>
    );
})