import { put, call, takeLatest } from 'redux-saga/effects';
import * as actions from 'services/actions/index';
import * as mutationActions from 'services/actions/mutation';
import * as api from 'services/index';
import * as oipaActions from 'services/actions/oipa';
import * as generalActions from 'services/actions/general';

export function* uploadRequest(action) {
  try {
    const response = yield call(api.uploadRequest, action.values);
    yield put(actions.uploadSuccess(response));
  } catch (error) {
    yield put(actions.uploadFailed(error));
  }
}

export function* validateRequest(action) {
  try {
    const response = yield call(api.validateRequest, action.values);
    yield put(actions.validateSuccess(response));
  } catch (error) {
    yield put(actions.validateFailed(error));
  }
}

export function* getColumnsRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.getColumnsSuccess(response));
  } catch (error) {
    yield put(actions.getColumnsFailed(error));
  }
}

export function* getFileErrorsRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.getFileErrorsSuccess(response));
  } catch (error) {
    yield put(actions.getFileErrorsFailed(error));
  }
}

export function* errorCorrectionSaveRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.errorCorrectionSaveSuccess(response));
  } catch (error) {
    yield put(actions.errorCorrectionSaveFailed(error));
  }
}

export function* errorCorrectionDeleteRowRequest(action) {
  try {
    const response = yield call(api.errorCorrectionRequest, action.values);
    yield put(actions.errorCorrectionDeleteRowSuccess(response));
  } catch (error) {
    yield put(actions.errorCorrectionDeleteRowFailed(error));
  }
}

export function* manualMapDataRequest(action) {
  try {
    const response = yield call(api.manualMapDataRequest, action.values);
    yield put(actions.manualMapDataSuccess(response));
  } catch (error) {
    yield put(actions.manualMapDataFailed(error));
  }
}

export function* geoLocationRequest(action) {
  yield put(mutationActions.geoLocationDone(action.data));
}

export function* fileSourceRequest(action) {
  yield put(mutationActions.fileSourceDone(action.data));
}

export function* fileRequest(action) {
  yield put(mutationActions.fileDone(action.data));
}

export function* countryActivitiesRequest(action) {
  try {
    const response = yield call(api.activitiesRequest, action.values);
    yield put(oipaActions.countryActivitiesSuccess(response));
  } catch (error) {
    yield put(oipaActions.countryActivitiesFailed(error));
  }
}

export function* activityDataRequest(action) {
  try {
    const response = yield call(api.activityRequest, action.values);
    yield put(oipaActions.activityDataSuccess(response));
  } catch (error) {
    yield put(oipaActions.activityDataFailed(error));
  }
}

export function* countryExcerptRequest(action) {
  try {
    const response = yield call(api.wikipediaExcerptRequest, action.values);
    yield put(actions.countryExcerptSuccess(response));
  } catch (error) {
    yield put(actions.countryExcerptFailed(error));
  }
}

export function* dataPaneToggleRequest(action) {
  yield put(generalActions.dataPaneToggleDone(action.open));
}

export function* countrySectorsRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.countrySectorsSuccess(response));
  } catch (error) {
    yield put(oipaActions.countrySectorsFailed(error));
  }
}

export function* countryOrganisationsRequest(action) {
  try {
    const response = yield call(
      api.transactionsAggregationsRequest,
      action.values
    );
    yield put(oipaActions.countryOrganisationsSuccess(response));
  } catch (error) {
    yield put(oipaActions.countryOrganisationsFailed(error));
  }
}

function* sagas() {
  yield [
    takeLatest('DATA_PANE_TOGGLE_REQUEST', dataPaneToggleRequest),
    takeLatest('COUNTRY_ACTIVITIES_REQUEST', countryActivitiesRequest),
    takeLatest('UPLOAD_REQUEST', uploadRequest),
    takeLatest('VALIDATE_REQUEST', validateRequest),
    takeLatest('GET_COLUMNS_REQUEST', getColumnsRequest),
    takeLatest('ERROR_CORRECTION_SAVE_REQUEST', errorCorrectionSaveRequest),
    takeLatest(
      'ERROR_CORRECTION_DELETE_ROW_REQUEST',
      errorCorrectionDeleteRowRequest
    ),
    takeLatest('GET_FILE_ERRORS', getFileErrorsRequest),
    takeLatest('MANUAL_MAP_DATA_REQUEST', manualMapDataRequest),
    takeLatest('GEOLOCATION_REQUEST', geoLocationRequest),
    takeLatest('FILE_SOURCE_REQUEST', fileSourceRequest),
    takeLatest('FILE_REQUEST', fileRequest),
    takeLatest('ACTIVITY_DATA_REQUEST', activityDataRequest),
    takeLatest('COUNTRY_EXCERPT_REQUEST', countryExcerptRequest),
    takeLatest('COUNTRY_SECTORS_REQUEST', countrySectorsRequest),
    takeLatest('COUNTRY_ORGANISATIONS_REQUEST', countryOrganisationsRequest)
  ];
}

export default sagas;
