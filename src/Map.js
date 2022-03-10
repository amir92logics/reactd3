import React, { memo, useState } from "react";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";

import * as Constants from "./places";

const mapStyles = {
  width: "90%",
  margin: "0 auto",
  display: "block",
  height: "auto"
};

const Map = ({ setTooltipContent }) => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom + 1 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom - 1 }));
  }

  function left() {
    setPosition((pos) => ({ coordinates: pos.coordinates[0] - 10, ...pos }));
  }
  function right() {
    setPosition((pos) => ({ coordinates: pos.coordinates[0] + 10, ...pos }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }
  return (
    <div style={{ width: "75%" }}>
      <ComposableMap
        width={500}
        height={500}
        projection="orthographic"
        projectionConfig={{ scale: 220 }}
        style={mapStyles}
        data-tip="aaaa"
      >
        <ZoomableGlobe
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <circle
            cx={250}
            cy={250}
            r={220}
            fill="transparent"
            stroke="#CFD8DC"
          />
          <Geographies
            disableOptimization
            // geography="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
            geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
          >
            {(geos, proj) =>
              geos.map((geo, i) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  projection={proj}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill:
                        Constants.countries.indexOf(geo.properties.NAME) > -1
                          ? "F53"
                          : "#CFD8DC"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
          <Markers>
            {Constants.markers.map((marker) => (
              <Marker
                marker={marker}
                style={{
                  hidden: { display: "none" }
                }}
              >
                <circle cx={0} cy={0} r={3} fill="#F00" stroke="#FFF" />
                <text
                  textAnchor="middle"
                  y={marker.markerOffset}
                  style={{
                    fontFamily: "system-ui",
                    fill: "#black",
                    fontSize: "6px"
                  }}
                >
                  {marker.name}
                </text>
              </Marker>
            ))}
          </Markers>
        </ZoomableGlobe>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        {/* <button onClick={left}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={right}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

export default memo(Map);
