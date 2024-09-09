"use client";

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMaps =()=>{
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API,
    libraries,
  });

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  const initAutocomplete = useCallback(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });

    const input = document.getElementById("pac-input");
    const searchBox = new window.google.maps.places.SearchBox(input);
    searchBoxRef.current = searchBox;

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      setMarkers((current) => {
        current.forEach((marker) => marker.setMap(null));
        return [];
      });

      const bounds = new window.google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const marker = new window.google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        });

        setMarkers((current) => [...current, marker]);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      initAutocomplete();
    }
  }, [isLoaded, initAutocomplete]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="p-4">
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search here"
        style={{
          width: '400px',
          padding: '10px',
          marginBottom: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',          
        }}
      />
      <div
        id="map"
        ref={mapRef}
        style={{ width: '400px', height: '250px' }}
      />
    </div>
  );
  
  /* const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API, // Asegúrate de que tu API key esté en un archivo .env.local
    libraries,
  });

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  const initAutocomplete = useCallback(() => {
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: "roadmap",
    });

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    searchBoxRef.current = searchBox;

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      setMarkers((current) => {
        current.forEach((marker) => marker.setMap(null));
        return [];
      });

      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        });

        setMarkers((current) => [...current, marker]);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      initAutocomplete();
    }
  }, [isLoaded, initAutocomplete]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search Box"        
      />
      <div
        id="map"
        ref={mapRef}
        style={{ width: '700px', height: '300px', marginTop: '10px' }}
      />
    </div>
  ); */
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
