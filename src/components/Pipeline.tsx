import "./Pipeline.css";

export interface PipelineStage {
  label: string;
  detail?: string;
}

export default function Pipeline({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="pipeline">
      {stages.map((stage, idx) => (
        <div className="pipeline-step" key={stage.label}>
          <div className="pipeline-stage">
            <div className="pipeline-stage-label">{stage.label}</div>
            {stage.detail && <div className="pipeline-stage-detail">{stage.detail}</div>}
          </div>
          {idx < stages.length - 1 && (
            <div className="pipeline-connector-h" aria-hidden="true">
              <span className="pipeline-connector-h-line" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
