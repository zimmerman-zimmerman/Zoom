import findIndex from 'lodash/findIndex';

/* utils */
import sortBy from 'lodash/sortBy';

// Updates layer percentiles depending on the value
// and updates the unique value amount that will be used
// to determine the amount of color stops
export function updatePercentiles(featureCollection) {
  let { features } = featureCollection;

  let uniqCount = 0;

  if (features.length > 0) {
    // so first we sort the values from lowest to highest
    features = sortBy(features, ['properties.value']);

    // so we'll start with the first lowest value
    let currentValue = features[0].properties.value;
    // and then we give percentile values to features
    features.forEach(f => {
      if (currentValue !== f.properties.value) {
        uniqCount += 1;
        currentValue = f.properties.value;
      }
      f.properties.percentile = uniqCount;
    });
  }

  featureCollection.uniqCount = uniqCount;
}

export function formatCountryLayerData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr
) {
  const countryLayers = {
    type: 'FeatureCollection',
    features: []
  };

  indicators.forEach(indicator => {
    const existLayerIndex = findIndex(countryLayers.features, feat => {
      return indicator.geolocationTag === feat.properties.name;
    });

    // so here we check if we already added a country to the countries layers
    // and if it has been added we just add the indicators value instead of pushing
    // another country
    // this needs to be done when using several data points with the same country
    // example: data points with different years, will have same countries
    // JSON.parse('{ "name":"John", "age":30, "city":"New York"}')
    if (existLayerIndex === -1) {
      countryLayers.features.push({
        // we need to do a double parse here, cause we retrieve a json
        // which is i dunno a double string or sth :D
        geometry: JSON.parse(JSON.parse(indicator.geolocationPolygons)),
        properties: {
          tooltipLabels: [
            {
              subIndName: indicator.filterName,
              format: indicator.valueFormatType,
              label: subIndAggr
                ? `${indName} - ${selectedSubInd.join(', ')}`
                : `${indName} - ${indicator.filterName}`,
              value: Math.round(indicator.value)
            }
          ],
          indName,
          name: indicator.geolocationTag,
          iso2: indicator.geolocationIso2,
          geolocationType: indicator.geolocationType,
          // we round it to two decimals
          value: Math.round(indicator.value),
          format: indicator.valueFormatType,
          percentile: 0
        }
      });
    } else {
      const changeFeat = countryLayers.features[existLayerIndex];
      changeFeat.properties.value += Math.round(indicator.value);

      if (subIndAggr) {
        // cause if its being aggregated, we will only have one
        // tooltip label item, which will show the summed up value
        changeFeat.properties.tooltipLabels[0].value += Math.round(
          indicator.value
        );
      } else {
        const labelInd = findIndex(changeFeat.properties.tooltipLabels, [
          'subIndName',
          indicator.filterName
        ]);

        // so if the sub indicators value exists, we will add up the value in the tool tip for that
        // sub indicator
        if (labelInd !== -1) {
          changeFeat.properties.tooltipLabels[labelInd].value += Math.round(
            indicator.value
          );
        } else {
          // otherwise we just push in a new filter value
          changeFeat.properties.tooltipLabels.push({
            subIndName: indicator.filterName,
            format: indicator.valueFormatType,
            label: `${indName} - ${indicator.filterName}`,
            value: Math.round(indicator.value)
          });
        }
      }
    }
  });

  // And we add min and max values to be used for legends and what not
  countryLayers.minValue = Math.round(
    Math.min.apply(
      Math,
      countryLayers.features.map(feature => {
        return feature.properties.value;
      })
    )
  );

  countryLayers.maxValue = Math.round(
    Math.max.apply(
      Math,
      countryLayers.features.map(feature => {
        return feature.properties.value;
      })
    )
  );

  return countryLayers;
}

export function formatCountryCenterData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr
) {
  const countryCenteredData = [];

  indicators.forEach(indicator => {
    const existCountryIndex = findIndex(countryCenteredData, [
      'name',
      indicator.geolocationTag
    ]);

    if (indicator.geolocationCenterLongLat) {
      // so here we check if we already added a country to the countries layers
      // and if it has been added we just add the indicators value instead of pushing
      // another country
      // this needs to be done when using several data points with the same country
      // example: data points with different years, will have same countries
      if (existCountryIndex === -1) {
        // we need to do a double parse here, cause we retrieve a json
        // which is i dunno a double string or sth :D
        const coord = JSON.parse(JSON.parse(indicator.geolocationCenterLongLat))
          .coordinates;
        countryCenteredData.push({
          tooltipLabels: [
            {
              subIndName: indicator.filterName,
              format: indicator.valueFormatType,
              label: subIndAggr
                ? `${indName} - ${selectedSubInd.join(', ')}`
                : `${indName} - ${indicator.filterName}`,
              value: Math.round(indicator.value)
            }
          ],
          indName,
          value: Math.round(indicator.value),
          geolocationIso2: indicator.geolocationIso2,
          geolocationType: indicator.geolocationType,
          maxValue: 0,
          minValue: 0,
          longitude: coord[0],
          latitude: coord[1],
          name: indicator.geolocationTag
        });
      } else {
        countryCenteredData[existCountryIndex].value =
          countryCenteredData[existCountryIndex].value +
          Math.round(indicator.value);

        if (subIndAggr) {
          // cause if its being aggregated, we will only have one
          // tooltip label item, which will show the summed up value
          countryCenteredData[
            existCountryIndex
          ].tooltipLabels[0].value += Math.round(indicator.value);
        } else {
          const labelInd = findIndex(
            countryCenteredData[existCountryIndex].tooltipLabels,
            ['subIndName', indicator.filterName]
          );

          // so if the sub indicators value exists, we will add up the value in the tool tip for that
          // sub indicator
          if (labelInd !== -1) {
            countryCenteredData[existCountryIndex].tooltipLabels[
              labelInd
            ].value += Math.round(indicator.value);
          } else {
            // otherwise we just push in a new filter value
            countryCenteredData[existCountryIndex].tooltipLabels.push({
              subIndName: indicator.filterName,
              format: indicator.valueFormatType,
              label: `${indName} - ${indicator.filterName}`,
              value: Math.round(indicator.value)
            });
          }
        }
      }
    }
  });

  const maxValue = Math.max.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    })
  );
  const minValue = Math.min.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    })
  );

  countryCenteredData.forEach(indicator => {
    indicator.maxValue = Math.round(maxValue);
    indicator.minValue = Math.round(minValue);
  });

  return countryCenteredData;
}

// formats the param for the datapoints aggregations
// according to the single selected countries
// and according to the countries of selected regions
// no duplicate countries should be in this param
export function formatCountryParam(countryCodes, regionCountryCodes) {
  let jointCountries = [];
  jointCountries = jointCountries.concat(countryCodes);

  regionCountryCodes.forEach(region => {
    if (region !== 'select all') {
      region.forEach(countryCode => {
        if (jointCountries.indexOf(countryCode.iso2) === -1) {
          jointCountries.push(countryCode.iso2);
        }
      });
    }
  });

  return jointCountries;
}

export function formatLongLatData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr
) {
  const longLatData = [];

  indicators.forEach(indicator => {
    if (indicator.geolocationTag.indexOf(',') !== -1) {
      const existPointIndex = findIndex(longLatData, [
        'name',
        indicator.geolocationTag
      ]);

      if (existPointIndex === -1) {
        let long = indicator.geolocationTag.substring(
          0,
          indicator.geolocationTag.indexOf(',')
        );
        long = parseFloat(long);

        let lat = indicator.geolocationTag.substring(
          indicator.geolocationTag.indexOf(',') + 1
        );
        lat = parseFloat(lat);

        longLatData.push({
          tooltipLabels: [
            {
              subIndName: indicator.filterName,
              format: indicator.valueFormatType,
              label: subIndAggr
                ? `${indName} - ${selectedSubInd.join(', ')}`
                : `${indName} - ${indicator.filterName}`,
              value: Math.round(indicator.value)
            }
          ],
          indName,
          longitude: long,
          latitude: lat,
          name: indicator.comment || indicator.geolocationTag,
          value: Math.round(indicator.value)
        });
      } else {
        longLatData[existPointIndex].value += Math.round(indicator.value);
        if (subIndAggr) {
          // cause if its being aggregated, we will only have one
          // tooltip label item, which will show the summed up value
          longLatData[existPointIndex].tooltipLabels[0].value += Math.round(
            indicator.value
          );
        } else {
          const labelInd = findIndex(
            longLatData[existPointIndex].tooltipLabels,
            ['subIndName', indicator.filterName]
          );

          // so if the sub indicators value exists, we will add up the value in the tool tip for that
          // sub indicator
          if (labelInd !== -1) {
            longLatData[existPointIndex].tooltipLabels[
              labelInd
            ].value += Math.round(indicator.value);
          } else {
            // otherwise we just push in a new filter value
            longLatData[existPointIndex].tooltipLabels.push({
              subIndName: indicator.filterName,
              format: indicator.valueFormatType,
              label: `${indName} - ${indicator.filterName}`,
              value: Math.round(indicator.value)
            });
          }
        }
      }
    }
  });

  return longLatData;
}
