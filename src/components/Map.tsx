import { h, FunctionalComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";

import * as L from 'leaflet';

// see https://github.com/pointhi/leaflet-color-markers
const RED_ICON = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }
);

export interface MapProps {
    id?: string;
    tileLayerURL?: string;
    latitude?: number;
    longitude?: number;
    zoom?: number;
};

const DEFAULT_PROPS: MapProps = {
    id: 'map',
    tileLayerURL: undefined,
    latitude: 51.505,
    longitude: -0.09,
    zoom: 18
};



export const Map: FunctionalComponent<MapProps> = (props) => {
    const mapRef = useRef<L.Map>(null);
    const markerRef = useRef<L.Marker>(null);

    useEffect(
        () => {
            mapRef.current = new L.Map(props.id!);

            if (props.tileLayerURL) {
                const tileLayer = new L.TileLayer(props.tileLayerURL);
                tileLayer.addTo(mapRef.current);
            }
        }, 
        []
    );

    useEffect(
        () => {
            mapRef.current.setView([props.latitude!, props.longitude!], props.zoom!);
            if (!markerRef.current) {
                markerRef.current = L.marker([props.latitude!, props.longitude!], { icon: RED_ICON });
                markerRef.current.addTo(mapRef.current);
            } else {
                markerRef.current.setLatLng([props.latitude!, props.longitude!]);
            }
        }, 
        [props.latitude, props.longitude, props.zoom]
    );

    return <div style="height: 100%" id={props.id!}></div>;
};

Map.defaultProps = DEFAULT_PROPS;