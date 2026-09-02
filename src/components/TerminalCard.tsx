import "./TerminalCard.css";

interface TerminalCardProps {
  prompt?: string;
  command: string;
  title?: string;
  description: string[];
}

export default function TerminalCard({ prompt = "$", command, title, description }: TerminalCardProps) {
  return (
    <pre className="terminal-card">
      <span className="terminal-prompt">{prompt}</span> {command}
      {"\n"}
      {title && (
        <>
          <span className="terminal-title">{title}</span>
          {"\n"}
        </>
      )}
      {description.map((line) => (
        <span className="terminal-desc" key={line}>{line}</span>
      ))}
    </pre>
  );
}
