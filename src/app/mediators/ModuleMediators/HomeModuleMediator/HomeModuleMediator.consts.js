export const initialState = {
  data: [],
  selectedInd1:
    process.env.NODE_ENV === 'development'
      ? 'aids related deaths (unaids)'
      : undefined,
  selectedInd2: undefined,
  subIndicators1: [],
  indSelectedIndex: -1,
  subIndicators2: [],
  selectedCountryVal: [],
  selectedCountryLabel: [],
  selectedSubInd1: [],
  selectedSubInd2: [],
  selectedRegionVal: [],
  selectedRegionLabels: []
};
