import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

import * as L from 'leaflet';

export interface MapProps {
    id?: string;
    tileLayerURL?: string;
    latitude?: number;
    longitude?: number;
};

export const Map: FunctionalComponent<MapProps> = (props) => {
    const mapId = props.id || 'map';

    const mapRef = useRef<L.Map>(null);

    useEffect(() => {
        mapRef.current = new L.Map(mapId);
        mapRef.current.setView([51.505, -0.09], 13);

        if (props.tileLayerURL) {
            const tileLayer = new L.TileLayer(props.tileLayerURL);
            tileLayer.addTo(mapRef.current);
        }
    }, []);

    useEffect(() => {
        if (props.latitude !== undefined && props.longitude !== undefined) {
            mapRef.current.setView([props.latitude, props.longitude], 13);
        }
    }, [props.latitude, props.longitude]);

    return <div style="height: 100%" id={mapId}></div>;
};