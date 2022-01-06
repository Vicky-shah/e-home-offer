import React, { useRef, useEffect, useState } from "react";
// import { withScriptjs, withGoogleMap } from "react-google-maps";
// import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
// import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import {
  LoadScript,
  GoogleMap,
  DrawingManager,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { connect } from "react-redux";
import "./map.css";
import image17 from "../../assets/images/17.png";
import markerIcon from "../../assets/images/marker-icon.png";
import { Link } from "react-router-dom";
import mapboxgl, { MatGeocoder, MapboxCircle, TouchPitchHandler } from 'mapbox-gl';
import {mapboxToken} from '../../apiPaths';

class MapProperty extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 40.20,
      lat: -74.73,
      zoom: 8,
      PropertyList: this.props.propertiesList,
      Property_coordinates: this.props.propertiesList.coordinates
    };
    this.mapContainer = React.createRef();
    this.mapRecords = [];
  }
  

  componentDidMount() {

    mapboxgl.accessToken = mapboxToken;
    const maps = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lat,this.state.lng],
      zoom: 8,
    });
  
    const styles = {
      padZero: {
        padding: "0",
      },
      infoWindow: {
        padding: "20px",
        color: "#fff",
        position: "relative",
      },
    };

    
    if (this.state.PropertyList) {
  
      const mapRecords = this.props.propertiesList.map((item, index) => {
        return ({
          'type': 'Feature',
          "properties": {
            "title": '',
            "description": `
            <div className='rightlet'>
            <img src='${item.images ? item.images[0] : ''}' width="100%" no-repeat;/>
            </div>
            <div>
            <span>House for Sale</span> </br>
            <span> ${item.address.street ? item.address.street : ''} </span>
            </br> <span>$ ${item.listPrice}</span>
            </br><span>Est. $321/mo</span></div>`},
          "geometry": {
            "coordinates": [item.coordinates.longitude, item.coordinates.latitude],
            "type": "Point"
          },
        })
      });      
    
      maps.on('load', () => {
      
        maps.addSource('places', {
          type: 'geojson',
          data: {
            type: "FeatureCollection",
            features: mapRecords
          },
        });
        // Add a layer showing the places.
        maps.addLayer({
          'id': 'places',
          'type': 'circle',
          'source': 'places',
          'paint': {
            'circle-color': 'red',
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });
    
        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });
    
        maps.on('mouseenter', 'places', (e) => {
          // Change the cursor style as a UI indicator.
          maps.getCanvas().style.cursor = 'pointer';
    
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
    
          // Ensure that if the maps is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
    
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat(coordinates).setHTML(description).addTo(maps);
        });
    
        maps.on('mouseleave', 'places', () => {
          maps.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }


  }
  render() {
    return (
      <div ref={el => this.mapContainer = el} className="map-container"/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myProperties: state.myProperties,
    mainLoader: state.loader,
  };
};

export default connect(mapStateToProps)(MapProperty);
