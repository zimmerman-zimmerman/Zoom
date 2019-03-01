/* base */
import React from 'react';
import { connect } from 'react-redux';

/* actions */
import * as actions from 'services/actions/general';

/* components */
import Stepper from 'components/Stepper/Stepper';

/* utils */
import {
  checkEmptyFields,
  addInEmptyFieldRows
} from 'modules/datamapper/DataMapperModule.util';
import find from 'lodash/find';
import { ToastsStore } from 'react-toasts';

/* styles */
import {
  ModuleContainer,
  ModuleHeader,
  ModuleFooter,
  ModuleContent
} from './DataMapperModule.styles';
import { SimpleErrorText } from 'components/sort/Misc';

/* fragments */
import ManMappingStep from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep';
import MetaDataMediator from 'mediators/DataMapperMediators/MetaDataMediator/MetaDataMediator';
import UploadMediator from 'mediators/DataMapperMediators/UploadMediator/UploadMediator';
import OverviewStep from 'modules/datamapper/fragments/OverviewStep/OverviewStep';
import CorrectErrorsMediator from 'mediators/DataMapperMediators/CorrectErrorsMediator/CorrectErrorsMediator';
import WrapUpMediator from 'mediators/DataMapperMediators/WrapUpMediator/WrapUpMediator';

class DataMapperModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      environment: null,
      // these are the required fields that the users
      // needs to have in their data model and map it
      // if they don't select or dont have these fields
      // the manual mapping will have to be adjusted
      // for the to be able to populate/fill them
      mapReqFields: ['indicator', 'date', 'value', 'geolocation'],

      manMapEmptyValue: false,
      manMapEmptyFields: false,
      mapStepDisabled: false,
      metaDataEmptyFields: [],
      stepsDisabled: false
    };

    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.saveEnvironment = this.saveEnvironment.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this);
  }

  // basically checks if next button should be disabled
  // depending on the current step
  nextDisabled() {
    if (this.state.step === 1) {
      // we check if the title is empty
      return (
        !this.props.stepData.metaData ||
        !this.props.stepData.metaData.title ||
        this.props.stepData.metaData.title.length === 0 ||
        !this.props.stepData.metaData.desc ||
        this.props.stepData.metaData.desc.length === 0 ||
        !this.props.stepData.metaData.dataSource.value ||
        this.props.stepData.metaData.dataSource.value.length === 0
      );
    }

    if (this.state.step === 2)
      return (
        !this.props.stepData.manMapData ||
        this.props.stepData.manMapData.length === 0
      );

    if (this.state.step === 4)
      // So here we check if the fourth steps data has been saved
      // and if it contains anything because what we actually save here
      // are the error that we retrieve for this step
      // and the user should be able to progress only if they've fixed
      // all the found errors
      return (
        !this.props.stepsDisabled &&
        (!this.props.stepData[3] || this.props.stepData[3].length > 0)
      );

    return false;
  }

  nextStep() {
    // so here we'l incapsulate the user restrictions
    // for progressing forward though we really need
    // TODO: retweek the whole datamapper data saving
    // in a DataMapperMediator, cause now its scattered
    // all over the place
    this.setState((prevState, props) => {
      const { stepData } = props;
      if (prevState.step === 1) {
        // and this bool will be used to save the general state if some
        // fields are undefined
        const metaDataEmptyFields = [];

        // we check if the title is empty
        if (!stepData.metaData.title || stepData.metaData.title.length === 0)
          metaDataEmptyFields.push('title');

        // we check if the description is empty
        if (!stepData.metaData.desc || stepData.metaData.desc.length === 0)
          metaDataEmptyFields.push('desc');

        // we check if the datasource is empty
        if (
          !stepData.metaData.dataSource.value ||
          stepData.metaData.dataSource.value.length === 0
        )
          metaDataEmptyFields.push('dataSource');

        if (metaDataEmptyFields.length > 0) {
          ToastsStore.error(
            <SimpleErrorText> Please fill the required fields </SimpleErrorText>
          );
          props.dispatch(actions.saveStepDataRequest(stepData));
          return { metaDataEmptyFields };
        } else {
          return { metaDataEmptyFields, step: prevState.step + 1 };
        }
      } else if (prevState.step === 2) {
        if (!stepData.uploadData) {
          ToastsStore.error(
            <SimpleErrorText> Please upload a file </SimpleErrorText>
          );
        } else if (!stepData.manMapData || stepData.manMapData.length === 0) {
          ToastsStore.error(
            <SimpleErrorText> File Uploading please wait... </SimpleErrorText>
          );
        } else {
          return { step: prevState.step + 1 };
        }
      } else if (prevState.step === 4) {
        // So here we check if the fourth steps data has been saved
        // and if it contains anything because what we actually save here
        // are the error that we retrieve for this step
        // and the user should be able to progress only if they've fixed
        // all the found errors
        if (
          !prevState.stepsDisabled &&
          (!stepData[3] || stepData[3].length > 0)
        ) {
          ToastsStore.error(
            <SimpleErrorText>
              {' '}
              Please fix the errors before proceeding{' '}
            </SimpleErrorText>
          );
          props.dispatch(actions.saveStepDataRequest(stepData));
        }
      }
      // restriction for the manual mapping step
      else if (prevState.step === 5) {
        const { manMapData } = stepData;

        const emptyFields = checkEmptyFields(
          manMapData,
          prevState.mapReqFields
        );

        if (
          emptyFields.length > 0 ||
          find(manMapData, item => {
            return (
              item.emptyFieldRow && (!item.label || item.label.length === 0)
            );
          })
        ) {
          // so here we check if one of the empty manual mapping
          // values is actually 'value' === a number for data
          // we will not let the user populate it but just give them
          // a message about it, cause their data needs to have a column like this
          const emptyValue = emptyFields.indexOf('value') !== -1;
          const manMapEmptyFields = emptyValue ? emptyFields.length > 1 : true;

          stepData[5] = addInEmptyFieldRows(emptyFields, manMapData);

          props.dispatch(actions.saveStepDataRequest(stepData));

          return { manMapEmptyValue: emptyValue, manMapEmptyFields };
        }
      } else {
        return {
          step: prevState.step + 1,
          manMapEmptyFields: false,
          manMapEmptyValue: false
        };
      }
    });
  }

  prevStep() {
    this.setState(prevState => {
      return { step: prevState.step - 1 };
    });
  }

  saveEnvironment(environment) {
    this.setState({ environment });
  }

  renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <MetaDataMediator
            dropDownData={this.props.dropDownData}
            metaDataEmptyFields={this.state.metaDataEmptyFields}
          />
        );
      case 2:
        return this.props.stepData.metaData && <UploadMediator />;
      case 3:
        return this.props.stepData.overviewData && <OverviewStep />;
      case 4:
        return (
          this.state.stepData.uploadData && (
            <CorrectErrorsMediator
              stepsDisabled={this.state.stepsDisabled}
              fileId={this.state.stepData.uploadData.fileId}
              fileCorrection={this.props.fileCorrection}
              saveStepData={this.saveStepData}
            />
          )
        );
      case 5:
        return (
          this.state.stepData.manMapData && (
            <ManMappingStep
              saveStepData={this.saveStepData}
              modelOptions={this.state.stepData.uploadData.modelOptions}
              // so the data from the upload step is the initial data
              // for the manual mapping
              data={
                this.state.stepData[4]
                  ? this.state.stepData[4]
                  : this.state.stepData.uploadData.manMapData
              }
              emptyValue={this.state.manMapEmptyValue}
              manMapEmptyFields={this.state.manMapEmptyFields}
              mapReqFields={this.state.mapReqFields}
            />
          )
        );
      case 6:
        return (
          this.state.stepData.metaData &&
          this.state.stepData.uploadData && (
            <WrapUpMediator
              environment={this.state.environment}
              metaData={this.state.stepData.metaData}
              fileId={this.state.stepData.uploadData.fileId}
              file={this.state.stepData.uploadData.file}
              fileUrl={this.state.stepData.uploadData.url}
              mappingJson={this.state.stepData.uploadData.mappingJson}
              mappingData={this.state.stepData[4]}
              disableSteps={() => this.setState({ stepsDisabled: true })}
              disableMapStep={value =>
                this.setState({ mapStepDisabled: value })
              }
              mapStepDisabled={this.state.mapStepDisabled}
              wrapUpData={this.state.stepData[5]}
              saveStepData={this.saveStepData}
            />
          )
        );
      default:
        return <div> No Such Step </div>;
    }
  }

  render() {
    let moduleDisabled = false;

    if (this.state.step === 5 && this.state.mapStepDisabled) {
      moduleDisabled = true;
    } else if (
      this.state.stepsDisabled &&
      this.state.step !== 6 &&
      this.state.step !== 5
    ) {
      moduleDisabled = true;
    }

    return (
      <ModuleContainer>
        <ModuleHeader>
          <Stepper
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            nextDisabled={this.nextDisabled()}
          />
        </ModuleHeader>

        <ModuleContent
          style={
            moduleDisabled ? { pointerEvents: 'none', opacity: '0.4' } : {}
          }
        >
          {this.renderStep()}
        </ModuleContent>

        <ModuleFooter>
          <Stepper
            onlyButtons
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            nextDisabled={this.nextDisabled()}
          />
        </ModuleFooter>
      </ModuleContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    stepData: state.stepData.stepzData
  };
};

export default connect(mapStateToProps)(DataMapperModule);
