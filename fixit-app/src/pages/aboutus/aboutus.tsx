import React from "react";
import "./aboutus.scss"; // Adjust the path as necessary
import Header from "../../components/header/header";


const Aboutus: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="about-us">
        <h2>Über uns</h2>

        <p>
          Bisher sind 39 Repair Cafés aufgelistet, aber wir arbeiten daran, Informationen von weiteren bestätigten Quellen zu erhalten.
        </p>

        <p>
          Alle Informationen auf dieser Website beziehen sich auf Augsburg. Weitere Informationen zu Repair Cafés im Allgemeinen finden Sie unter{" "}
          <a href="https://repaircafe.org">repaircafe.org</a>.
        </p>

        <p>
          Wenn Sie ein Repair Café hinzufügen möchten oder wenn Informationen falsch oder unvollständig sind, würden wir uns über eine E-Mail freuen. Zum Hinzufügen verwenden wir am liebsten diesen{" "}
          <a href="http://localhost:3000/register">Fragebogen</a>.
        </p>

        <p>Wir suchen noch Unterstützung bei:</p>

        <ul>
          <li>
            <strong>Kommunikationsmanagement:</strong> Jemand, der bei der Kommunikation mit den Repair Cafés unterstützt, damit die Angaben so genau und vollständig wie möglich sind und bleiben.
          </li>
          <li>
            <strong>Visualisierung / UI / UX Design:</strong> Jemand, der Ideen zur Struktur, Navigation, Funktionsweise und zum Aussehen einbringen kann. Wir haben eine Figma-Datei voller Designs, die wir gerne mit Ihnen teilen möchten.
          </li>
          <li>
            <strong>Entwicklung:</strong> Hauptsächlich Frontend-Entwicklung. Jemand, der möglicherweise mitentwickeln und als Backup fungieren kann – idealerweise mit Kenntnissen in z. B. React und Next.js.
          </li>
        </ul>

        <p>Kontakt</p>
        <p>
          <a href="mailto:info@repaircafe.fixit">info@repaircafe.fixit</a>
        </p>
      </div>
    </div>
  );
};

export default Aboutus;
