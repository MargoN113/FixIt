import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import repaircafes from '../../assets/repaircafes.json';
import './map.scss';  // Adjust the path as necessary
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl } from 'react-leaflet'



interface Cafe {
    id: string;
    name: string;
    description: string;
    type: string;
    lat?: number;
    lng?: number;
    marker?: any;
}

const Map: React.FC = () => {
    const [cafes, setCafes] = useState<Cafe[]>([]);
    const mapRef = useRef<any>(null);
    const markerIcon = L.icon({
        iconUrl: '/marker.png',
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    useEffect(() => {
        setCafes(repaircafes);

        if(mapRef.current) {
            mapRef.current.on('click', () => {
                closeCafeDetails();
                cafes.forEach(cafe => {
                    cafe.marker?.setOpacity(1);
                });
            });
        }
    }, []);


    const toggleCafeDetails = (cafe: Cafe) => {
        const el = document.getElementById(cafe.id);
        if (el?.classList.contains('list-element-focus')) {
            closeCafeDetails();
            return;
        }

        document.querySelectorAll('.list-element-focus').forEach(el =>
            el.classList.remove('list-element-focus')
        );

        highlightMarker(cafe.marker);
        el?.classList.add('list-element-focus');

        if (document.querySelectorAll('.show-details').length === 0) {
            document.documentElement.style.setProperty('--header-width', '800px');
            document.getElementById('details')?.classList.add('show-details');
        }
    };

    const closeCafeDetails = () => {
        document.querySelectorAll('.list-element-focus').forEach(el =>
            el.classList.remove('list-element-focus')
        );
        document.documentElement.style.setProperty('--header-width', '400px');
        document.getElementById('details')?.classList.remove('show-details');
    };

    const hoverStartCafeMarker = (cafe: Cafe) => {
        const el = document.getElementById(cafe.id);
        el?.classList.add('list-element-hover');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightMarker(cafe.marker);
    };

    const hoverStartCafeList = (cafe: Cafe) => {
        highlightMarker(cafe.marker);
    };

    const highlightMarker = (marker: any) => {
        const focused = document.querySelector('.list-element-focus')?.id;
        cafes.forEach(c => {
            if (c.id !== focused) {
                c.marker?.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
            }
        });
        marker?.setOpacity(1).setZIndexOffset(999).openTooltip();
    };

    const hoverEndCafe = (cafe: Cafe, triggerByListElement: boolean = false) => {
        document.querySelectorAll('.list-element-hover').forEach(el =>
            el.classList.remove('list-element-hover')
        );

        const isFocused = document.getElementById(cafe.id)?.classList.contains('list-element-focus');
        if (isFocused) {
            highlightMarker(cafe.marker);
            return;
        }

        const focusEl = document.querySelector('.list-element-focus') as HTMLElement;
        if (focusEl) {
            if(!triggerByListElement){
                focusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            cafe.marker?.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
        } else {
            cafes.forEach(c => c.marker?.setOpacity(1));
            cafe.marker?.setZIndexOffset(0).closeTooltip();
        }
    };

    return (
        <div className="wrapper">
            <div className="list">
                {cafes.map((cafe) => (
                    <div
                        id={cafe.id}
                        key={cafe.id}
                        className="list-element"
                        onClick={() => toggleCafeDetails(cafe)}
                        onMouseEnter={() => hoverStartCafeList(cafe)}
                        onMouseLeave={() => hoverEndCafe(cafe, true)}
                    >
                        <div className="list-element-name">{cafe.name}</div>
                        <div className="list-element-description">{cafe.description}</div>
                        <div className="list-element-type">{cafe.type}</div>
                    </div>
                ))}
            </div>
            <div id="details"></div>
            <div id="map-frame">
                <MapContainer id={"map"} center={[48.354, 10.9]} zoom={14} zoomControl={false}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        maxZoom={19} minZoom={11}
                    />
                    <ZoomControl position="bottomright" />
                    {cafes.map((cafe) => (
                        <Marker
                            key={cafe.id}
                            position={[cafe.lat!, cafe.lng!]}
                            icon={markerIcon}
                            eventHandlers={{
                                click: () => toggleCafeDetails(cafe), // Add click handler here
                                mouseover: () => hoverStartCafeMarker(cafe), // Add click handler here
                                mouseout: () => hoverEndCafe(cafe), // Add click handler here
                            }}>
                            <Tooltip
                                className={"custom-tooltip"}
                                offset={[0, -5]}
                                direction={"bottom"}>
                                {cafe.name}
                            </Tooltip>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
