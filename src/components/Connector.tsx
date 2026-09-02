import "./Connector.css";

export default function Connector() {
  return (
    <div className="connector" aria-hidden="true">
      <span className="connector-dot connector-dot-top" />
      <span className="connector-line" />
      <span className="connector-dot connector-dot-bottom" />
    </div>
  );
}
