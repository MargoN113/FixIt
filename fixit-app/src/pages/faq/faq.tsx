import React from "react";
import Header from "../../components/header/header";
import "./faq.scss";

const FAQ: React.FC = () => {
  return (
    <div>
      <Header></Header>

      <div className="faq">
        <h2>FAQ</h2>
        <h2>Häufig gestellte Fragen (FAQ)</h2>

        <div>
          <h3>Was ist ein Repaircafé?</h3>
          <p>
            Ein Repaircafé ist eine ehrenamtliche Veranstaltung, bei der
            Besucher defekte Alltagsgegenstände mitbringen können, um sie
            gemeinsam mit erfahrenen Reparateuren zu reparieren – kostenlos und
            in entspannter Atmosphäre.
          </p>
        </div>

        <div>
          <h3>Muss ich mich vorher anmelden?</h3>
          <p>
            In der Regel ist keine Anmeldung nötig. Bei größeren Reparaturen
            oder speziellen Geräten ist eine kurze Voranmeldung hilfreich.
          </p>
        </div>

        <div>
          <h3>Was kann ich mitbringen?</h3>
          <p>
            Typische Gegenstände sind elektrische Kleingeräte, Kleidung,
            Fahrräder, Spielzeug, Kleinmöbel und Haushaltsgegenstände.
          </p>
        </div>

        <div>
          <h3>Was kostet die Reparatur?</h3>
          <p>
            Die Reparaturhilfe ist kostenlos. Spenden sind willkommen und helfen
            uns, Material- und Raumkosten zu decken.
          </p>
        </div>

        <div>
          <h3>Muss ich selbst mithelfen bei der Reparatur?</h3>
          <p>
            Ja, gemeinsam reparieren ist Teil der Idee – du lernst dabei, wie
            dein Gerät funktioniert.
          </p>
        </div>

        <div>
          <h3>Was passiert, wenn mein Gerät nicht repariert werden kann?</h3>
          <p>
            Dann erhältst du eine Einschätzung. Vielleicht fehlt nur ein Teil
            oder die Reparatur ist zu aufwendig – wir beraten dich gern.
          </p>
        </div>

        <div>
          <h3>Wer sind die Reparateure?</h3>
          <p>
            Ehrenamtliche mit handwerklichem oder technischem Hintergrund – vom
            Tüftler bis zum Profi.
          </p>
        </div>

        <div>
          <h3>Muss ich Ersatzteile mitbringen?</h3>
          <p>
            Wenn du weißt, welches Teil fehlt, gerne. Andernfalls schauen wir
            gemeinsam, was nötig ist.
          </p>
        </div>

        <div>
          <h3>Wie kann ich mithelfen oder selbst Reparateur werden?</h3>
          <p>
            Wir freuen uns über jede Unterstützung! Melde dich einfach über
            unser <a href="#kontakt">Kontaktformular</a>.
          </p>
        </div>

        <div>
          <h3>Gibt es Parkplätze oder einen barrierefreien Zugang?</h3>
          <p>[Hier standortspezifische Informationen ergänzen.]</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
