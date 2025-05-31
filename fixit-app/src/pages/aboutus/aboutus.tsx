import React from "react";
import "./aboutus.scss"; // Adjust the path as necessary
import Header from "../../components/header/header";

const Aboutus: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <div className="über uns">
        <h2>Über uns</h2>

        <p>
          Bisher sind 39 Repair Cafes aufgelistet, aber wir arbeiten daran, die Informationen von weiteren bestätigten Quellen zu erhalten.
        </p>

        <p>
          Die Webseite ist Open Source, siehe den Quellcode auf {" "}
          <a href="https://github.com">Github</a>.
        </p>

        <p>
          Alle Information auf dieser Website beziehen sich auf Augsburg. Weitere Informationen zu Repair Cafes im Allgemeinen finden Sie unter{" "}
          <a href="https://repaircafe.org">repaircafe.org</a>.
        </p>

        <p>
          Wenn Sie ein Repair Cafe hinzufügen möchten oder wenn Information falsch oder unvollständig sind, würden wir uns über eine Email freuen. Zum hinzufügen verwenden wir am liebsten diesen.{" "}
          <a href="#" title="Questionnaire (currently in Dutch)">
            Fragebogen
          </a>
          .
        </p>

        <p>Wir suchen noch Unterstützung bei.</p>

        <ul className="list-disc list-inside">
          <li>
            <strong>Komunikations Managment.</strong> Jemand, der bei der Kommunikation mit den Repair Cafes unterstützt, damit die Aufgabe so genau und vollständig wie möglich ist und bleibt.
          </li>
          <li>
            <strong>Visualisierung / UI / UX Design.</strong> Jemand, der Ideen zu struktur, Navigation, Funktionsweise und Aussehen einbringen kann. Wir haben eine Figma-Datei voller Designs , die wir gerne mit Ihnen teilen möchten
          </li>
          <li>
            <strong>Entwicklung.</strong> Hauptsählich Frontend-Entwicklung, Jemand, der möglicherweise mittentwickeln und als Backup fungieren kann. Jemand mit Kenntnissen in z.b.React, Next und Tailwind. Siehe den Code auf {" "}
            <a href="https://github.com">Github</a> for more info.
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
