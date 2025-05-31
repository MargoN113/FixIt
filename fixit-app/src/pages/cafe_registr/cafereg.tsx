import React, { useEffect, useState } from 'react';
import './cafereg.scss';
import { toast, Toaster } from 'react-hot-toast';
import Header from '../../components/header/header';

const CafeReg: React.FC = () => {
    interface CafeFormData {
        name: string;
        type: string;
        longitude: string; //input text is always a string
        latitude: string;
        description: string;
        email: string;
        webLink?: string;
    }

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        longitude: "",
        latitude: "",
        description: "",
        email: "",
        webLink: ""
    });
    const [availableTypes, setAvailableTypes] = useState<string[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof CafeFormData, string>>>({});


    useEffect(() => {
        fetch("http://localhost:8080/api/cafes/approved")
            .then(res => res.json())
            .then((data: CafeFormData[]) => {
            const types = Array.from(new Set(data.map(c => c.type)));
            setAvailableTypes(types);
            });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>):void => {
        const {name, value} = event.target;

        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev, 
            [name]: error || undefined }));

        setFormData(prev => ({
            ...prev,
            [name]: value.trim(),
        }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault(); //page can't be updated

        const newErrors: Partial<Record<keyof CafeFormData, string>> = {};

        for (const key in formData) {
            const value = formData[key as keyof CafeFormData];
            const error = validateField(key, value);
            if (error) {
                newErrors[key as keyof CafeFormData] = error;
            }
        }
        setErrors(newErrors);

        if (!formData.name || !formData.type || !formData.latitude || !formData.longitude || !formData.description || !formData.email) {
            toast("Bitte füllen Sie alle Felder aus!", {
            icon: "⚠️",
            });
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            toast("Bitte korrigieren Sie alle Fehler im Formular!", {
            icon: "⚠️",
            });
            return;
        }

        fetch("http://localhost:8080/api/cafes/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...formData,
            longitude: parseFloat(formData.longitude),
            latitude: parseFloat(formData.latitude),
            }),
        })
        .then(res => {
            if (res.ok) {
                toast.success("Ihr Café wurde erfolgreich registriert!");
                setFormData({
                    name: "",
                    type: "",
                    longitude: "",
                    latitude: "",
                    description: "",
                    email: "",
                    webLink: ""
                });
                setErrors({});
            } else {
                toast.error("Fehler beim Speichern!");
            }
        })
        .catch(() => toast.error("Verbindungsfehler!"));
    };

    //validation of data
    const validateField = (name: string, value: string): string | null => {
        if (name === "name" && /[$%§@!?#^~*()_+={}<>;]/.test(value)) {
            return "Ungültiger Name! Zeichen $%§@!?#^~*()_+={}<>; sind nicht erlaubt!";
        }
        if (value.trim().length > 0) {
            if (name === "longitude") {
                const num = parseFloat(value);
                if (isNaN(num) || num < -180 || num > 180) return "Längengrad muss zwischen -180 und 180 liegen!";
                
            }
            if (name === "latitude") {
                const num = parseFloat(value);
                if (isNaN(num) || num < -90 || num > 90) return "Breitengrad muss zwischen -90 und 90 liegen!";
                
            }
            if (name === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Ungültige E-Mail-Adresse!";
            }
        }
        if (name === "webLink" && value) {
            try {
                new URL(value);
            } catch {
                return "Ungültiger Weblink!";
            }
        }
        return null;
    };

    return (
        <div className="form-wrapper">
            <Header />
            <div className="form-container">
                <h2 className="form-title">Wollen Sie Ihr Café registrieren? Dann brauchen wir Ihre Daten!</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <label>Name<span className="required">*</span></label>
                    <input
                        type="text"
                        value={formData.name}
                        name="name"
                        placeholder="Name von Café" 
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                    <label>Typ<span className="required">*</span></label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Bitte wählen</option>
                            {availableTypes.map((typeOption) => (
                                <option key={typeOption} value={typeOption}>
                                    {typeOption}
                                </option>
                            ))}
                        </select>
                    <label>Längengrad<span className="required">*</span></label>
                    <input
                        type="number"
                        value={formData.longitude}
                        name="longitude"
                        placeholder="Längengrad von Café" 
                        onChange={handleChange}
                        step="any"
                    />
                    {errors.longitude && <span className="error">{errors.longitude}</span>}
                    <label>Breitengrad<span className="required">*</span></label>
                    <input
                        type="number"
                        value={formData.latitude}
                        name="latitude"
                        placeholder="Breitengrad von Café" 
                        onChange={handleChange}
                        step="any"
                    />
                    {errors.latitude && <span className="error">{errors.latitude}</span>}
                    <label>Beschreibung<span className="required">*</span></label>
                    <input
                        type="text"
                        value={formData.description}
                        name="description"
                        placeholder="Beschreibung von Café" 
                        onChange={handleChange}
                    />
                    <label>Email<span className="required">*</span></label>
                    <input
                        type="email"
                        value={formData.email}
                        name="email"
                        placeholder="Ihre Email" 
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <label>Webseite Link</label>
                    <input
                        type="url"
                        value={formData.webLink}
                        name="webLink"
                        placeholder="Link auf Ihre Webseite" 
                        onChange={handleChange}
                    />
                    {errors.webLink && <span className="error">{errors.webLink}</span>}
                    <button type="submit">Absenden</button>
                    <p className="form-note">
                        Ihre Daten werden in unserer Datenbank gespeichert und müssen erst durch einen unserer Mitarbeiter geprüft werden. 
                        Wir melden uns umgehend :)
                    </p>
                </form>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}

export default CafeReg;
