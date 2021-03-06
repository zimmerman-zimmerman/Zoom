export const ALL_USER_CHARTS_INITIAL = 'ALL_USER_CHARTS_INITIAL';
export const ALL_USER_CHARTS_REQUEST = 'ALL_USER_CHARTS_REQUEST';
export const ALL_USER_CHARTS_SUCCESS = 'ALL_USER_CHARTS_SUCCESS';
export const ALL_USER_CHARTS_FAILED = 'ALL_USER_CHARTS_FAILED';

export function allUserChartsInitial() {
  return {
    type: ALL_USER_CHARTS_INITIAL
  };
}

export function allUserChartsRequest(values) {
  return {
    type: ALL_USER_CHARTS_REQUEST,
    values
  };
}

export function allUserChartsSuccess(data) {
  return {
    type: ALL_USER_CHARTS_SUCCESS,
    data
  };
}

export function allUserChartsFailed(error) {
  return {
    type: ALL_USER_CHARTS_FAILED,
    error
  };
}

export const GET_USER_INITIAL = 'GET_USER_INITIAL';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export function getUserInitial() {
  return {
    type: GET_USER_INITIAL
  };
}

export function getUserRequest(values) {
  return {
    type: GET_USER_REQUEST,
    values
  };
}

export function getUserSuccess(data) {
  return {
    type: GET_USER_SUCCESS,
    data
  };
}

export function getUserFailed(error) {
  return {
    type: GET_USER_FAILED,
    error
  };
}

export const ADD_NEW_DATASET_INITIAL = 'ADD_NEW_DATASET_INITIAL';
export const ADD_NEW_DATASET_REQUEST = 'ADD_NEW_DATASET_REQUEST';
export const ADD_NEW_DATASET_SUCCESS = 'ADD_NEW_DATASET_SUCCESS';
export const ADD_NEW_DATASET_FAILED = 'ADD_NEW_DATASET_FAILED';

export function addNewDatasetInitial() {
  return {
    type: ADD_NEW_DATASET_INITIAL
  };
}

export function addNewDatasetRequest(values) {
  return {
    type: ADD_NEW_DATASET_REQUEST,
    values
  };
}

export function addNewDatasetSuccess(data) {
  return {
    type: ADD_NEW_DATASET_SUCCESS,
    data
  };
}

export function addNewDatasetFailed(error) {
  return {
    type: ADD_NEW_DATASET_FAILED,
    error
  };
}

export const CREATE_UPDATE_CHART_INITIAL = 'CREATE_UPDATE_CHART_INITIAL';
export const CREATE_UPDATE_CHART_REQUEST = 'CREATE_UPDATE_CHART_REQUEST';
export const CREATE_UPDATE_CHART_SUCCESS = 'CREATE_UPDATE_CHART_SUCCESS';
export const CREATE_UPDATE_CHART_FAILED = 'CREATE_UPDATE_CHART_FAILED';

export function createUpdateChartInitial() {
  return {
    type: CREATE_UPDATE_CHART_INITIAL
  };
}

export function createUpdateChartRequest(values) {
  return {
    type: CREATE_UPDATE_CHART_REQUEST,
    values
  };
}

export function createUpdateChartSuccess(data) {
  return {
    type: CREATE_UPDATE_CHART_SUCCESS,
    data
  };
}

export function createUpdateChartFailed(error) {
  return {
    type: CREATE_UPDATE_CHART_FAILED,
    error
  };
}

export const GET_CHART_INITIAL = 'GET_CHART_INITIAL';
export const GET_CHART_REQUEST = 'GET_CHART_REQUEST';
export const GET_CHART_SUCCESS = 'GET_CHART_SUCCESS';
export const GET_CHART_FAILED = 'GET_CHART_FAILED';

export function getChartInitial() {
  return {
    type: GET_CHART_INITIAL
  };
}

export function getChartRequest(values) {
  return {
    type: GET_CHART_REQUEST,
    values
  };
}

export function getChartSuccess(data) {
  return {
    type: GET_CHART_SUCCESS,
    data
  };
}

export function getChartFailed(error) {
  return {
    type: GET_CHART_FAILED,
    error
  };
}

export const GET_PUBLIC_CHART_INITIAL = 'GET_PUBLIC_CHART_INITIAL';
export const GET_PUBLIC_CHART_REQUEST = 'GET_PUBLIC_CHART_REQUEST';

export function getPublicChartInitial() {
  return {
    type: GET_PUBLIC_CHART_INITIAL
  };
}

export function getPublicChartRequest(values) {
  return {
    type: GET_PUBLIC_CHART_REQUEST,
    values
  };
}

export const GET_USER_CHARTS_INITIAL = 'GET_USER_CHARTS_INITIAL';
export const GET_USER_CHARTS_REQUEST = 'GET_USER_CHARTS_REQUEST';
export const GET_USER_CHARTS_SUCCESS = 'GET_USER_CHARTS_SUCCESS';
export const GET_USER_CHARTS_FAILED = 'GET_USER_CHARTS_FAILED';

export function getUserChartsInitial() {
  return {
    type: GET_USER_CHARTS_INITIAL
  };
}

export function getUserChartsRequest(values) {
  return {
    type: GET_USER_CHARTS_REQUEST,
    values
  };
}

export function getUserChartsSuccess(data) {
  return {
    type: GET_USER_CHARTS_SUCCESS,
    data
  };
}

export function getUserChartsFailed(error) {
  return {
    type: GET_USER_CHARTS_FAILED,
    error
  };
}

export const DELETE_CHART_INITIAL = 'DELETE_CHART_INITIAL';
export const DELETE_CHART_REQUEST = 'DELETE_CHART_REQUEST';
export const DELETE_CHART_SUCCESS = 'DELETE_CHART_SUCCESS';
export const DELETE_CHART_FAILED = 'DELETE_CHART_FAILED';

export function deleteChartInitial() {
  return {
    type: DELETE_CHART_INITIAL
  };
}

export function deleteChartRequest(values) {
  return {
    type: DELETE_CHART_REQUEST,
    values
  };
}

export function deleteChartSuccess(data) {
  return {
    type: DELETE_CHART_SUCCESS,
    data
  };
}

export function deleteChartFailed(error) {
  return {
    type: DELETE_CHART_FAILED,
    error
  };
}

export const GET_USER_DATASETS_INITIAL = 'GET_USER_DATASETS_INITIAL';
export const GET_USER_DATASETS_REQUEST = 'GET_USER_DATASETS_REQUEST';
export const GET_USER_DATASETS_SUCCESS = 'GET_USER_DATASETS_SUCCESS';
export const GET_USER_DATASETS_FAILED = 'GET_USER_DATASETS_FAILED';

export function getUserDatasetsInitial() {
  return {
    type: GET_USER_DATASETS_INITIAL
  };
}

export function getUserDatasetsRequest(values) {
  return {
    type: GET_USER_DATASETS_REQUEST,
    values
  };
}

export function getUserDatasetsSuccess(data) {
  return {
    type: GET_USER_DATASETS_SUCCESS,
    data
  };
}

export function getUserDatasetsFailed(error) {
  return {
    type: GET_USER_DATASETS_FAILED,
    error
  };
}

export const GET_PUBLIC_CHARTS_INITIAL = 'GET_PUBLIC_CHARTS_INITIAL';
export const GET_PUBLIC_CHARTS_REQUEST = 'GET_PUBLIC_CHARTS_REQUEST';
export const GET_PUBLIC_CHARTS_SUCCESS = 'GET_PUBLIC_CHARTS_SUCCESS';
export const GET_PUBLIC_CHARTS_FAILED = 'GET_PUBLIC_CHARTS_FAILED';

export function getPublicChartsInitial() {
  return {
    type: GET_PUBLIC_CHARTS_INITIAL
  };
}

export function getPublicChartsRequest(values) {
  return {
    type: GET_PUBLIC_CHARTS_REQUEST,
    values
  };
}

export function getPublicChartsSuccess(data) {
  return {
    type: GET_PUBLIC_CHARTS_SUCCESS,
    data
  };
}

export function getPublicChartsFailed(error) {
  return {
    type: GET_PUBLIC_CHARTS_FAILED,
    error
  };
}

export const UPDATE_DATASET_INITIAL = 'UPDATE_DATASET_INITIAL';
export const UPDATE_DATASET_REQUEST = 'UPDATE_DATASET_REQUEST';
export const UPDATE_DATASET_SUCCESS = 'UPDATE_DATASET_SUCCESS';
export const UPDATE_DATASET_FAILED = 'UPDATE_DATASET_FAILED';

export function updateDatasetInitial() {
  return {
    type: UPDATE_DATASET_INITIAL
  };
}

export function updateDatasetRequest(values) {
  return {
    type: UPDATE_DATASET_REQUEST,
    values
  };
}

export function updateDatasetSuccess(data) {
  return {
    type: UPDATE_DATASET_SUCCESS,
    data
  };
}

export function updateDatasetFailed(error) {
  return {
    type: UPDATE_DATASET_FAILED,
    error
  };
}

export const CREATE_DUPLICATE_CHART_INITIAL = 'CREATE_DUPLICATE_CHART_INITIAL';
export const CREATE_DUPLICATE_CHART_REQUEST = 'CREATE_DUPLICATE_CHART_REQUEST';
export const CREATE_DUPLICATE_CHART_SUCCESS = 'CREATE_DUPLICATE_CHART_SUCCESS';
export const CREATE_DUPLICATE_CHART_FAILED = 'CREATE_DUPLICATE_CHART_FAILED';

export function createDuplicateChartInitial() {
  return {
    type: CREATE_DUPLICATE_CHART_INITIAL
  };
}

export function createDuplicateChartRequest(values) {
  return {
    type: CREATE_DUPLICATE_CHART_REQUEST,
    values
  };
}

export function createDuplicateChartSuccess(data) {
  return {
    type: CREATE_DUPLICATE_CHART_SUCCESS,
    data
  };
}

export function createDuplicateChartFailed(error) {
  return {
    type: CREATE_DUPLICATE_CHART_FAILED,
    error
  };
}

export const DUPLICATE_CHART_INITIAL = 'DUPLICATE_CHART_INITIAL';
export const DUPLICATE_CHART_REQUEST = 'DUPLICATE_CHART_REQUEST';
export const DUPLICATE_CHART_SUCCESS = 'DUPLICATE_CHART_SUCCESS';
export const DUPLICATE_CHART_FAILED = 'DUPLICATE_CHART_FAILED';

export function duplicateChartInitial() {
  return {
    type: DUPLICATE_CHART_INITIAL
  };
}

export function duplicateChartRequest(values) {
  return {
    type: DUPLICATE_CHART_REQUEST,
    values
  };
}

export function duplicateChartSuccess(data) {
  return {
    type: DUPLICATE_CHART_SUCCESS,
    data
  };
}

export function duplicateChartFailed(error) {
  return {
    type: DUPLICATE_CHART_FAILED,
    error
  };
}

export const DELETE_DATASET_INITIAL = 'DELETE_DATASET_INITIAL';
export const DELETE_DATASET_REQUEST = 'DELETE_DATASET_REQUEST';
export const DELETE_DATASET_SUCCESS = 'DELETE_DATASET_SUCCESS';
export const DELETE_DATASET_FAILED = 'DELETE_DATASET_FAILED';

export function deleteDatasetInitial() {
  return {
    type: DELETE_DATASET_INITIAL
  };
}

export function deleteDatasetRequest(values) {
  return {
    type: DELETE_DATASET_REQUEST,
    values
  };
}

export function deleteDatasetSuccess(data) {
  return {
    type: DELETE_DATASET_SUCCESS,
    data
  };
}

export function deleteDatasetFailed(error) {
  return {
    type: DELETE_DATASET_FAILED,
    error
  };
}

export const ALL_ARCHIVED_CHARTS_INITIAL = 'ALL_ARCHIVED_CHARTS_INITIAL';
export const ALL_ARCHIVED_CHARTS_REQUEST = 'ALL_ARCHIVED_CHARTS_REQUEST';
export const ALL_ARCHIVED_CHARTS_SUCCESS = 'ALL_ARCHIVED_CHARTS_SUCCESS';
export const ALL_ARCHIVED_CHARTS_FAILED = 'ALL_ARCHIVED_CHARTS_FAILED';

export function allArchivedChartsInitial() {
  return {
    type: ALL_ARCHIVED_CHARTS_INITIAL
  };
}

export function allArchivedChartsRequest(values) {
  return {
    type: ALL_ARCHIVED_CHARTS_REQUEST,
    values
  };
}

export function allArchivedChartsSuccess(data) {
  return {
    type: ALL_ARCHIVED_CHARTS_SUCCESS,
    data
  };
}

export function allArchivedChartsFailed(error) {
  return {
    type: ALL_ARCHIVED_CHARTS_FAILED,
    error
  };
}

export const EMPTY_CHART_TRASH_INITIAL = 'EMPTY_CHART_TRASH_INITIAL';
export const EMPTY_CHART_TRASH_REQUEST = 'EMPTY_CHART_TRASH_REQUEST';
export const EMPTY_CHART_TRASH_SUCCESS = 'EMPTY_CHART_TRASH_SUCCESS';
export const EMPTY_CHART_TRASH_FAILED = 'EMPTY_CHART_TRASH_FAILED';

export function emptyChartTrashInitial() {
  return {
    type: EMPTY_CHART_TRASH_INITIAL
  };
}

export function emptyChartTrashRequest(values) {
  return {
    type: EMPTY_CHART_TRASH_REQUEST,
    values
  };
}

export function emptyChartTrashSuccess(data) {
  return {
    type: EMPTY_CHART_TRASH_SUCCESS,
    data
  };
}

export function emptyChartTrashFailed(error) {
  return {
    type: EMPTY_CHART_TRASH_FAILED,
    error
  };
}

export const GET_DATASET_IDS_INITIAL = 'GET_DATASET_IDS_INITIAL';
export const GET_DATASET_IDS_REQUEST = 'GET_DATASET_IDS_REQUEST';
export const GET_DATASET_IDS_SUCCESS = 'GET_DATASET_IDS_SUCCESS';
export const GET_DATASET_IDS_FAILED = 'GET_DATASET_IDS_FAILED';

export function getDatasetIdsInitial() {
  return {
    type: GET_DATASET_IDS_INITIAL
  };
}

export function getDatasetIdsRequest(values) {
  return {
    type: GET_DATASET_IDS_REQUEST,
    values
  };
}

export function getDatasetIdsSuccess(data) {
  return {
    type: GET_DATASET_IDS_SUCCESS,
    data
  };
}

export function getDatasetIdsFailed(error) {
  return {
    type: GET_DATASET_IDS_FAILED,
    error
  };
}
