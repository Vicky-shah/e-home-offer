import React, { Component, useEffect, useState } from "react";
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

const mapContainerStyle = {
  height: "120%",
  width: "100%",
};

const position = {
  lat: 37.772,
  lng: -122.214,
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};

// const options = {
//   drawingControl: true,
//   drawingControlOptions: {
//     drawingModes: ["polygon"],
//   },
//   polygonOptions: {
//     fillColor: `#2196F3`,
//     strokeColor: `#2196F3`,
//     fillOpacity: 0.5,
//     strokeWeight: 2,
//     clickable: false,
//     editable: false,
//     draggable: false,
//     zIndex: 1,
//     // visible:false
//   },
// };
const libraries = ["drawing"];

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

function MapProperty(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [options, setOptions] = useState({
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      fillColor: `#2196F3`,
      strokeColor: `#2196F3`,
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: false,
      editable: false,
      draggable: false,
      zIndex: 1,
      // visible:false
    },
  });

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  const onPolygonComplete = (polygon) => {
    const polyArray = polygon.getPath().getArray();
    const isvisible = polygon.getVisible();
    let paths = [];
    let location = [];
    polyArray.forEach(function (path) {
      paths.push([path.lng(), path.lat()]);
    });

    // polyArray.forEach(function (path) {
    //     paths.push([path.lat(),path.lng()]);
    // });
    console.log(paths, "check paths");
    paths.push(paths[0]);

    const data = {
      type: "Polygon",
      coordinates: [paths],
    };

    if (props.loadFromMap) {
      props.loadFromMap(data);
    }
    // props.fetchByMap({ data });
    polygon.setMap(null);
  };

  const onMarkerClick = (item, index) => {
    setIsOpen(true);
    setSelectedIndex(index);
  };
  useEffect(() => {
    if (props.myProperties.listings) {
      if (props.setDataFromMap) {
        props.setDataFromMap(props.myProperties.listings);
      }
    }
  }, [props.myProperties]);

  const center = props.coordinates
    ? {
      lat: props.coordinates.latitude,
      lng: props.coordinates.longitude,
    }
    : {
      lat: 40.675641937661645,
      lng: -74.40732978647165,
    };

  return (
    <LoadScript
      libraries={libraries}
      googleMapsApiKey="AIzaSyCNkbaUQ49AeNfiisnATf1UlrDixfyPk40"
    >
      <GoogleMap
        id="drawing-manager-example"
        height="100%"
        className="h-100"
        style={{ height: "100%" }}
        mapContainerStyle={mapContainerStyle}
        zoom={props.coordinates ? 18 : 9}
        center={center}
      >
        {props.propertiesList && (
          <>
            {props.propertiesList.map((item, index, z) => {
              return (
                <>
                  {item.address.state === "NJ" ? (
                    <>
                    {/* {console.info('item---NJ',item.address.state)} */}
                      {item.coordinates && (
                        <>
                          {item.coordinates.coordinates ? (
                            <Marker
                              key={index}
                              onClick={() => onMarkerClick(item, index)}
                              title={item.address.street}
                              id={item.id}
                              icon={{
                                url: markerIcon,
                              }}
                              position={{
                                lat: item.coordinates.coordinates[1],
                                lng: item.coordinates.coordinates[0],
                              }}
                            >
                              {selectedIndex === index &&
                                !props.coordinates(
                                  <InfoWindow style={styles.padZero}>
                                    <div
                                      style={{
                                        background: `url(${item.images[0]}) no-repeat`,
                                        ...styles.infoWindow,
                                      }}
                                    >
                                      <div className="info-content">
                                        <span>House for Sale</span>
                                        <div className="left-content">
                                          <Link
                                            to={{
                                              pathname: "/property-view",
                                              state: { id: item.id },
                                            }}
                                            className="name"
                                          >
                                            {item.address.street}
                                          </Link>
                                          <span>${item.listPrice}</span>
                                          <span>Est. $321/mo</span>
                                        </div>
                                        <div className="right-content">
                                          <img
                                            // onClick={addFavourite}
                                            src={image17}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </InfoWindow>
                                )}
                            </Marker>
                          ) : (
                            <Marker
                              key={index}
                              onClick={() => onMarkerClick(item, index)}
                              title={item.address.street}
                              id={item.id}
                              icon={{
                                url: markerIcon,
                              }}
                              position={{
                                lat: item.coordinates.latitude,
                                lng: item.coordinates.longitude,
                              }}
                            >
                              {/* on click of marker we getting one popup related perticular property and we can see some details on popup */}
                              {selectedIndex === index && (
                                <InfoWindow className="p-0">
                                  <div
                                    className="info-Window"
                                    style={{
                                      background: `url(${item.images[0]}) no-repeat`,
                                    }}
                                  >
                                    <div className="info-content">
                                      <span>House for Sale</span>
                                      <div className="left-content">
                                        <Link
                                          to={{
                                            pathname: "/property-view",
                                            state: { id: item.id },
                                          }}
                                          className="name"
                                        >
                                          {item.address.street}
                                        </Link>
                                        <span>${item.listPrice}</span>
                                        <span>Est. $321/mo</span>
                                      </div>
                                      <div className="right-content">
                                        <img
                                          // onClick={addFavourite}
                                          src={image17}
                                          alt=""
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </InfoWindow>
                              )}
                            </Marker>
                          )}
                        </>
                      )}
                    </>

                  ) : ''}
                </>
              );
            })}
          </>
        )}

        {/* as we create shape of polygon */}
        <DrawingManager
          drawingMode="polygon"
          options={options}
          onPolygonComplete={onPolygonComplete}
        // overlaycomplete={(poly) => {
        //     const polyArray = poly.getPath().getArray();
        //     let paths = [];
        //     polyArray.forEach(function (path) {
        //         paths.push({
        //             longitude: path.lng(),
        //             latitude: path.lat()
        //         });
        //     });
        // }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
const mapStateToProps = (state) => {
  return {
    myProperties: state.myProperties,
    mainLoader: state.loader,
  };
};

export default connect(mapStateToProps)(MapProperty);
