/* base */
import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router';

/* utils */
import { fromJS } from 'immutable';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { generateLegends, generateMarkers } from './GeoMap.util';

/* styles */
import {
  borderStyle,
  dataLayer,
  defaultMapStyle,
} from './components/map-style';

/* components */
import markerInfo from './components/ToolTips/MarkerInfo/MarkerInfo';
import layerInfo from './components/ToolTips/LayerInfo/LayerInfo';
import CustomYearSelector from 'components/CustomYearSelector/CustomYearSelector';
import MapControls from 'components/GeoMap/components/MapControls/MapControls';
import Fullscreen from 'react-full-screen';

import {
  LegendContainer,
  MapContainer,
  YearContainer,
  ControlsContainer,
} from './GeoMap.style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiemltbWVybWFuMjAxNCIsImEiOiJhNUhFM2YwIn0.sedQBdUN7PJ1AjknVVyqZw';

class GeoMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyle: fromJS(defaultMapStyle),
      markerArray: [],
      legends: [],
      hoverLayerInfo: null,
      viewport: {
        latitude: 15,
        longitude: 0,
        bearing: 0,
        pitch: 0,
      },
      hoverMarkerInfo: null,
      values: [12, 16],
      zoom: 2,
      fullScreen: false,
    };

    this.setMarkerInfo = this.setMarkerInfo.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.fullScreen = this.fullScreen.bind(this);
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props.indicatorData);
    if (!isEqual(this.props.indicatorData, prevProps.indicatorData)) {
      this.updateMap(this.props.indicatorData);
    }
  }

  updateMap(indicatorData) {
    // So because the layers are a part of this map, and not just a component
    // that we can put in the map(at least thats how we do it right now)
    // we will generate the layers here, and differently than all other indicator
    // markers
    // Note: the layer will also use a different tooltip than the markers
    // cause it kind of makes sense for some cases
    const layers = find(indicatorData, ['type', 'layer']);
    if (layers) {
      let mapStyle = defaultMapStyle;
      const borderData = layers.borderData ? layers.borderData : layers.data;

      // here we need to push in the border line style seperately like this
      // so that it would work and load properly with the layers
      // this may not be the best approach, but its the one that actually works
      // we also only push the borderStyle once.
      if (!find(mapStyle.layers, ['id', 'outline'])) {
        mapStyle.layers.push(borderStyle);
      }

      //then we continue working with the normal fromJS  variable
      mapStyle = fromJS(mapStyle);
      mapStyle = mapStyle
        // Add geojson layer source to map
        .setIn(
          ['sources', 'layer'],
          fromJS({ type: 'geojson', data: layers.data }),
        )
        // Add point layer to map
        .set('layers', mapStyle.get('layers').push(dataLayer))
        // Add geojson border source to map
        .setIn(
          ['sources', 'outline'],
          fromJS({ type: 'geojson', data: borderData }),
        );
      this.setState({ mapStyle });
    } else if (!isEqual(this.state.mapStyle, fromJS(defaultMapStyle))) {
      //Here we set the map back to default when no layer data has been passed in
      // And we need to remove the borderStyle cause it gets added there
      // and while its there, the map will not set itself to default
      let mapStylez = defaultMapStyle;
      const ind = findIndex(mapStylez.layers, ['id', 'outline']);
      mapStylez.layers.splice(ind, 1);
      this.setState({ mapStyle: fromJS(mapStylez) });
    }

    // and all of the generic markers that can be just put in the map, like separate components
    // will be generated like this, and will use the same marker tooltip
    const markerArray = generateMarkers(indicatorData, this.setMarkerInfo);
    // and in a similar way we generate legends
    const legends = generateLegends(indicatorData);

    this.setState({ markerArray, legends });
  }

  _onViewportChange = viewport => this.setState({ viewport });

  _setLayerInfo = event => {
    let hoverLayerInfo = null;
    const { features } = event;

    const feature = features && features.find(f => f.layer.id === 'layer');
    if (feature) {
      hoverLayerInfo = {
        lngLat: event.lngLat,
        properties: feature.properties,
      };
    }
    this.setState({
      hoverLayerInfo,
    });
  };

  _showLayerInfo() {
    const { hoverLayerInfo, hoverMarkerInfo } = this.state;
    if (!hoverMarkerInfo) {
      return layerInfo(hoverLayerInfo);
    }
    return null;
  }

  setMarkerInfo(indicator) {
    this.setState({
      hoverMarkerInfo: indicator,
    });
  }

  _showMarkerInfo() {
    const { hoverMarkerInfo } = this.state;
    return markerInfo(hoverMarkerInfo);
  }

  _onCountryClick = event => {
    const { features } = event;

    const feature = features && features.find(f => f.layer.id === 'layer');
    if (feature) this.props.history.push(`country/${feature.properties.iso2}`);
  };

  zoomIn() {
    // cause when its 25 it gets white
    if (this.state.zoom < 25)
      this.setState(prevState => {
        return { zoom: prevState.zoom + 0.2 };
      });
  }

  zoomOut() {
    if (this.state.zoom > 1)
      this.setState(prevState => {
        return { zoom: prevState.zoom - 0.2 };
      });
  }

  fullScreen() {
    this.setState(prevState => {
      return { fullScreen: !prevState.fullScreen };
    });
  }

  render() {
    const { viewport, mapStyle, markerArray, legends, fullScreen } = this.state;
    return (
      <Fullscreen enabled={fullScreen}>
        <MapContainer>
          <ControlsContainer>
            <MapControls
              zoomIn={this.zoomIn}
              zoomOut={this.zoomOut}
              fullScreen={this.fullScreen}
            />
          </ControlsContainer>
          <MapGL
            {...viewport}
            scrollZoom={false}
            width="100%"
            height="100%"
            mapStyle={mapStyle}
            onViewportChange={this._onViewportChange}
            onHover={this._setLayerInfo}
            onClick={this._onCountryClick}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            zoom={this.state.zoom}
          >
            {/*So this is the layer tooltip, and we seperate it from the
              martker tooltip, cause its functionality as a tooltip is a bit different
              and also because we implement the layers a bit more differently
              than normal markers*/}
            {this._showLayerInfo()}

            {this._showMarkerInfo()}

            {markerArray}

            <LegendContainer>{legends}</LegendContainer>
          </MapGL>
          <YearContainer>
            <CustomYearSelector
              selectedYears={this.props.selectedYears}
              selectYear={this.props.selectYear}
            />
          </YearContainer>
        </MapContainer>
      </Fullscreen>
    );
  }
}

export default withRouter(GeoMap);
