import React from 'react';
import {
    MessageBar, MessageBarType, DetailsListLayoutMode, SelectionMode, Selection, IColumn,
    DetailsList, Icon, ICommandBarItemProps, Label, mergeStyleSets, TextField, DatePicker
} from '@fluentui/react';
import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';
import { Vehicle } from '../../model/Vehicle';
import { DocumentBlob } from '../../model/DocumentBlob';
import { observer, Observer } from 'mobx-react';
import { Utils } from '../../model/Utils';
import { FileCommandBar } from './FileCommandBar';
import Dropzone, { DropzoneRef, FileRejection } from "react-dropzone";
import { runInAction } from 'mobx';

export interface ICarPanelProps {
    vehicle: Vehicle;
}

@observer
export class VehiclePanel extends React.Component<ICarPanelProps> {
    private dropzoneRef: DropzoneRef = null;
    private columns: IColumn[] = [];
    private selection: Selection;
    private isSelected: boolean = false;

    private classNames = mergeStyleSets({
        fileIconHeaderIcon: {
            padding: 0,
            fontSize: '16px',
        },
        fileIconCell: {
            textAlign: 'center',
            selectors: {
                '&:before': {
                    content: '.',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    height: '100%',
                    width: '0px',
                    visibility: 'hidden',
                },
            },
        },
        fileIconImg: {
            verticalAlign: 'middle',
            maxHeight: '16px',
            maxWidth: '16px',
        },
        controlWrapper: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        exampleToggle: {
            display: 'inline-block',
            marginBottom: '10px',
            marginRight: '30px',
        },
        selectionDetails: {
            marginBottom: '20px',
        },
    });

    public constructor(props: ICarPanelProps) {
        super(props);

        this.columns = [
            {
                key: 'column1',
                name: 'File Type',
                className: this.classNames.fileIconCell,
                iconClassName: this.classNames.fileIconHeaderIcon,
                iconName: 'Page',
                isIconOnly: true,
                fieldName: 'icon',
                minWidth: 16,
                maxWidth: 16,
                onRender: (item: DocumentBlob) => (
                    <Icon {...getFileTypeIconProps({ extension: item.Icon, size: 16, imageFileType: 'png' })} />
                ),
            },
            {
                key: 'column2',
                name: 'Name',
                fieldName: 'fileName',
                minWidth: 40,
                isResizable: true,
                isCollapsible: true,
                data: 'string',
                isPadded: true,
                onRender: (item: DocumentBlob) => {
                    return <a href={this.refBuild(item.fileName)} download>{item.fileName}</a>
                }
            },
        ];

        this.selection = new Selection({
            onSelectionChanged: this.onSelectionChanged
        });
    }

    public componentDidMount() {
        if (this.props.vehicle.DocumentStore.isNotLoaded) {
            this.props.vehicle.GetDocuments().then();
        }
    }

    public render() {
        const columns = this.columns;
        const vehicle = this.props.vehicle;
        const documents = this.props.vehicle?.DocumentStore?.documents?.slice();

        return (
            <>{vehicle &&
                <div className="flex-container">
                    {vehicle.hasError &&
                        <MessageBar
                            messageBarType={MessageBarType.error}
                            onDismiss={vehicle.clearError}
                        >
                            {vehicle.errorMessage}
                        </MessageBar>}
                    <div className='flex-name'>
                        <h2>Registration Information</h2>
                    </div>
                    <div className="flex-item">
                        <Label >Vehicle Id:</Label>
                        <TextField defaultValue={vehicle.carNumber} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setCarNumber(value)} />
                    </div>
                    <div className='flex-item-gap'></div>
                    <div className='flex-item'></div>
                    <div className="flex-item">
                        <Label >Registration date:</Label>
                        {vehicle.readOnly ?
                            <TextField defaultValue={vehicle.regDateText} disabled /> :
                            <DatePicker value={vehicle.registrationYear} formatDate={Utils.formatDate} disabled={vehicle.readOnly} onSelectDate={(value) => vehicle.setRegistrationYear(value)} />
                        }
                    </div>
                    <div className='flex-item-gap'></div>
                    <div className="flex-item">
                        <Label >Registration place:</Label>
                        <TextField defaultValue={vehicle.registrationPlace} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setRegistrationPlace(value)} />
                    </div>
                    <div className='flex-name'>
                        <h2>Vehicle Characteristics</h2>
                    </div>
                    <div className="flex-item">
                        <Label >Make:</Label>
                        <TextField defaultValue={vehicle.make} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setMake(value)} />
                    </div>
                    <div className='flex-item-gap'></div>
                    <div className="flex-item">
                        <Label >Model:</Label>
                        <TextField defaultValue={vehicle.model} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setModel(value)} />
                    </div>
                    <div className="flex-item">
                        <Label >Engine power:</Label>
                        <TextField defaultValue={vehicle.regEnginePower} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setEnginePower(value)} />
                    </div>
                    <div className='flex-item-gap'></div>
                    <div className="flex-item">
                        <Label >Engine torque:</Label>
                        <TextField defaultValue={vehicle.regEngineTorque} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setEngineTorque(value)} />
                    </div>
                    <div className="flex-item">
                        <Label >Fuel type:</Label>
                        <TextField defaultValue={vehicle.fuelType} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setFuelType(value)} />
                    </div>
                    <div className='flex-item-gap'></div>
                    <div className="flex-item">
                        <Label >Color:</Label>
                        <TextField defaultValue={vehicle.color} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setColor(value)} />
                    </div>
                    <div className="flex-item">
                        <Label >Doors:</Label>
                        <TextField defaultValue={vehicle.regDoors} disabled={vehicle.readOnly} onChange={(e, value) => vehicle.setDoors(value)} />
                    </div>
                    <div className='flex-item-gap'></div>
                    <div className='flex-item'></div>
                    <div className='flex-name' />
                    {vehicle?.readOnly &&
                        <div className="vehicle-documents">
                            <div className='flex-name'>
                                <h2>Vehicle Documents</h2>
                            </div>
                            <Dropzone ref={(node) => { this.dropzoneRef = node; }}
                                noClick={true}
                                onDrop={this.onDrop} >
                                {({ getRootProps, getInputProps, isDragActive, open }) => <Observer>{() =>
                                    <div {...getRootProps()} className='dropzone'>
                                        <input {...getInputProps()} />

                                        <FileCommandBar vehicle={vehicle} items={this.initItems(open)} />
                                        <DetailsList
                                            items={documents}
                                            columns={columns}
                                            selection={this.selection}
                                            selectionMode={SelectionMode.multiple}
                                            layoutMode={DetailsListLayoutMode.justified}
                                            isHeaderVisible={true} />
                                        {isDragActive &&
                                            <div className='dropzone-overlay'>
                                                <div className='dropzone-text'>
                                                    Drop documents here...
                                                </div>
                                            </div>}
                                    </div>
                                }
                                </Observer>
                                }
                            </Dropzone>
                        </div>
                    }
                </div>
            }
            </>
        );
    };

    private onDrop = (accepted: File[], rejected: FileRejection[]) => {
        if (accepted.length > 0) {
            this.props.vehicle.handleDrop(accepted);
        }
    }

    private Delete = () => {
        this.props.vehicle.DeleteFiles();
    }

    private refBuild = (fileName: string) => {
        return this.props.vehicle.Ref(fileName);
    }

    private onSelectionChanged = () => {
        const selectedItems = this.selection.getSelection();
        runInAction(() => {
            this.props.vehicle.DocumentStore.SetSelectedFiles(selectedItems as DocumentBlob[]);
            if (this.props.vehicle.DocumentStore.selectedFiles.length !== 0) {
                this.isSelected = true;
            } else {
                this.isSelected = false;
            }
        })
    }

    private initItems = (open: () => void): ICommandBarItemProps[] => {
        const items: ICommandBarItemProps[] = [
            {
                key: 'upload',
                text: 'Upload',
                iconProps: { iconName: 'Upload' },
                split: true,
                ariaLabel: 'Upload',
                onClick: (ev: any) => {
                    ev.stopPropagation();
                    ev.preventDefault();
                    this.dropzoneOpen(open);
                }
            },
            {
                key: 'delete',
                text: 'Delete',
                iconProps: { iconName: 'Delete' },
                ariaLabel: 'Delete',
                disabled: this.props.vehicle.DocumentStore.selectedFiles.length === 0,
                onClick: this.Delete,
            },
        ];
        return items;
    }

    private dropzoneOpen(open: () => void): boolean {
        open();
        return true;
    }
}