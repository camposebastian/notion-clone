"use client";

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

import React, { useEffect, useRef } from "react";
import GoogleMapReact from 'google-map-react';

const DEFAULT_ZOOM = 15;
const DEFAULT_CENTER = { lat: -13.523197875320747, lng: -71.97671370625604 };

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMaps =()=>{
    const defaultProps = {
      center: {
        lat: 10.99835602,
        lng: 77.01502627
      },
      zoom: 11
    };
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '200px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"            
          />
        </GoogleMapReact>
      </div>
    );
  }

export const MapEditor = createReactBlockSpec(
    {
      type: "map",
      propSchema: {
        textAlignment: defaultProps.textAlignment,
        textColor: defaultProps.textColor,
      },
      content: "none", // inline
    },
    {
      render: (props) => <GoogleMaps {...props} />,
    }
  );
