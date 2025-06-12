import React, {useEffect, useRef, useState, RefObject} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './map.scss';  // Adjust the path as necessary
import {MapContainer, TileLayer, Marker, Tooltip, ZoomControl, useMapEvents} from 'react-leaflet'
import Header from '../../components/header/header';



interface Cafe {
    id: number;
    name: string;
    description: string;
    type: string;
    latitude: number;
    longitude: number;
    email: string;
    webseiteLink?: string;
    marker?: any;
}

const Map: React.FC = () => {
    const [cafes, setCafes] = useState<Cafe[]>([]);

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [detailCafe, setDetailCafe] = useState<Cafe>({
        description: "",
        id: 0,
        latitude: 0,
        longitude: 0,
        marker: undefined,
        name: "",
        type: "",
        email: "",
        webseiteLink: "",
    });
    const markerRefs = useRef<Record<string, RefObject<L.Marker | null>>>({});
    const markerIcon = L.icon({
        iconUrl: '/marker.png',
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    useEffect(() => {
        fetch("http://localhost:8080/api/cafes/approved") //Zugriff auf Backend und Abfrage von Cafes
        .then((response) => response.json())
        .then((data: Cafe[]) => {
            setCafes(data);

        const types = Array.from(new Set(data.map(cafe => cafe.type)));
        setAvailableTypes(types);

        console.log(data);
        for(let cafe of data) {

            markerRefs.current[cafe.id] = React.createRef<L.Marker>();
        }
        })
        .catch((error) => console.error("Fehler beim Laden der Cafés:", error));
    }, []);

    //Filter for Cafes
    const filteredCafes = cafes.filter(cafe => {
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(cafe.type);

        const search = searchTerm.toLowerCase().trim();
        const cafeName = cafe.name.toLowerCase();

        const matchesSearch = search === "" || 
        cafeName.split(" ").some(word => word.startsWith(search)) ||
        cafeName.includes(search);

        return matchesType && matchesSearch;
    });

    //Handling when checkbox used
    const handleTypeChange = (type: string, isChecked: boolean) => {
    if (isChecked) {
        setSelectedTypes(prev => [...prev, type]);
    } else {
        setSelectedTypes(prev => prev.filter(t => t !== type));
    }
    };


    const MapClickHandler: React.FC = () => {
        useMapEvents({
            click: (e) => {
                closeCafeDetails();
                cafes.forEach(cafe => {
                    markerRefs.current[cafe.id]?.current?.setOpacity(1);
                });
            },
        });
        return null; // This component doesn't render anything
    };

    const toggleCafeDetails = (cafe: Cafe) => {
        setDetailCafe(cafe);
        const el = document.getElementById(cafe.id.toString());
        if (el?.classList.contains('list-element-focus')) {
            closeCafeDetails();
            return;
        }

        document.querySelectorAll('.list-element-focus').forEach(el =>
            el.classList.remove('list-element-focus')
        );

        highlightMarker(cafe.id);
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
        const el = document.getElementById(cafe.id.toString());
        el?.classList.add('list-element-hover');
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightMarker(cafe.id);
    };

    const hoverStartCafeList = (cafe: Cafe) => {
        highlightMarker(cafe.id);
    };

    const highlightMarker = (cafeID: any) => {
        console.log("HIGHLIGHT" + cafeID)
        console.log(markerRefs);
        const focused = document.querySelector('.list-element-focus')?.id;
        cafes.forEach(c => {
            if (c.id.toString() !== focused) {
                markerRefs.current[c.id]?.current?.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
            }
        });
        markerRefs.current[cafeID]?.current?.setOpacity(1).setZIndexOffset(999).openTooltip();
    };

    const hoverEndCafe = (cafe: Cafe, triggerByListElement: boolean = false) => {
        document.querySelectorAll('.list-element-hover').forEach(el =>
            el.classList.remove('list-element-hover')
        );

        const isFocused = document.getElementById(cafe.id.toString())?.classList.contains('list-element-focus');
        if (isFocused) {
            highlightMarker(cafe.id);
            return;
        }

        const focusEl = document.querySelector('.list-element-focus') as HTMLElement;
        if (focusEl) {
            if(!triggerByListElement){
                focusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            markerRefs.current[cafe.id]?.current?.setOpacity(0.2).setZIndexOffset(0).closeTooltip();
        } else {
            cafes.forEach(c => markerRefs.current[c.id]?.current?.setOpacity(1));
            markerRefs.current[cafe.id]?.current?.setZIndexOffset(0).closeTooltip();
        }
    };

    return (
        <div className="wrapper">
            <Header></Header>
            <div className="list">
                <div className="list-filters">
                    <input
                    type="text"
                    placeholder="Suche ein Café"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                    <div className="filter-dropdown">
                        <details>
                            <summary>Filtern nach Typ</summary>
                            <div className="dropdown-content">
                                {availableTypes.map((type) => (
                                    <label key={type} style={{ display: 'block' }}>
                                        <input
                                            type="checkbox"
                                            value={type}
                                            checked={selectedTypes.includes(type)}
                                            onChange={(e) => handleTypeChange(e.target.value, e.target.checked)}
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </details>
                    </div>
                </div>
                
                {filteredCafes.length === 0 ? (
                    <div className="list-no-results">Keine Cafés gefunden</div>
                ) : (
                    filteredCafes.map((cafe) => (
                    <div
                        id={cafe.id.toString()}
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
                    ))
                )}
                </div>
            <div id="details">
                <div className="detail-head">{detailCafe.name}</div>
                <div className="detail-description">{detailCafe.description}</div>
                <div className="detail-mail">{detailCafe.email}</div>
                <a className="detail-website" href="https://tha.de" target="_blank" rel="noopener noreferrer">{detailCafe.webseiteLink}</a>
                <div className="detail-type">{detailCafe.type}</div>
            </div>
            <div id="map-frame">
                <MapContainer id={"map"} center={[48.354, 10.9]} zoom={14} zoomControl={false}>
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        maxZoom={19} minZoom={11}
                    />
                    <ZoomControl position="bottomright" />
                    {filteredCafes.map((cafe) => (
                        <Marker
                            key={cafe.id}
                            position={[cafe.latitude!, cafe.longitude!]}
                            icon={markerIcon}
                            ref={markerRefs.current[cafe.id]}
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
                    <MapClickHandler />
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
