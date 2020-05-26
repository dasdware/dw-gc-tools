import { h, FunctionalComponent, render } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { Map as LeafletMap, Control, DomUtil, TileLayer, marker, Icon}  from 'leaflet';
import { AppController, AppView } from "../app-controller";
import { faAdjust, faCogs, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "./FontAwesomeIcon";

class ShowSettingsButton extends Control {

    constructor(private controller?: AppController) {
        super({ position: 'topright' });
    }

    onAdd = (_: LeafletMap) => {
        const container = DomUtil.create('div', 'button leaflet-control leaflet-control-custom');
        container.id="show-settings";
        
        render(<FontAwesomeIcon icon={faCog} />, container);

        container.style.backgroundColor = 'white';     
        container.style.backgroundSize = "30px 30px";
        container.style.width = '30px';
        container.style.height = '30px';

        container.onclick = () => {
            if (this.controller) {
                this.controller.setView("settings");
            }
        }

        return container;
    }
}

// see https://github.com/pointhi/leaflet-color-markers
const RED_ICON = new Icon({
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
    visible?: boolean;
    controller: AppController;
};

const DEFAULT_PROPS: Partial<MapProps> = {
    id: 'map',
    tileLayerURL: undefined,
    latitude: 51.505,
    longitude: -0.09,
    zoom: 18,
    visible: true
};

export const Map: FunctionalComponent<MapProps> = (props) => {
    const mapRef = useRef<L.Map>(null);
    const markerRef = useRef<L.Marker>(null);

    const mapDivRef = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            mapRef.current = new LeafletMap(mapDivRef.current);

            if (props.tileLayerURL) {
                const tileLayer = new TileLayer(props.tileLayerURL);
                tileLayer.addTo(mapRef.current);
            }

            mapRef.current.addControl(new ShowSettingsButton(props.controller));

            if (props.controller.view === AppView.MAP) {
                mapDivRef.current.classList.add("active");
            }
        }, 
        []
    );

    useEffect(
        () => {
            mapRef.current.setView([props.latitude!, props.longitude!], props.zoom!);
            if (!markerRef.current) {
                markerRef.current = marker([props.latitude!, props.longitude!], { icon: RED_ICON });
                markerRef.current.addTo(mapRef.current);
            } else {
                markerRef.current.setLatLng([props.latitude!, props.longitude!]);
            }
        }, 
        [props.latitude, props.longitude, props.zoom]
    );

    props.controller.events.addListener("viewChanged",
        (view) => {
            if (view === AppView.MAP) {
                mapDivRef.current.classList.add("active");
            } else {
                mapDivRef.current.classList.remove("active");
            }
            setTimeout(() => mapRef.current.invalidateSize(), 0);
        });
   

    return <div id={props.id} ref={mapDivRef} style="height: 100%"></div>;
};

Map.defaultProps = DEFAULT_PROPS;