type Workflow = {
  id: string;
  name: string;
  trigger: string;
  status: "active" | "inactive" | "error";
  successRate?: number;
};

export type N8NWorkflowDashboardProps = {
  workflows: Workflow[];
  activeWorkflowId?: string;
};

export function N8NWorkflowDashboard({
  workflows,
  activeWorkflowId,
}: N8NWorkflowDashboardProps) {
  return (
    <section className="rounded border border-charcoal-black/10 bg-brick-white p-4 shadow-subtle-line">
      <h3 className="mb-3 font-serif-jp text-lg text-charcoal-black">n8n Workflow Dashboard</h3>
      <ul className="space-y-2">
        {workflows.map((workflow) => (
          <li key={workflow.id} className={`rounded border px-3 py-2 ${workflow.id === activeWorkflowId ? "border-light-copper bg-light-copper/10" : "border-concrete-grey bg-washi-white"}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-charcoal-black">{workflow.name}</p>
              <span className="text-xs text-rust-iron">{workflow.status}</span>
            </div>
            <p className="text-xs text-rust-iron">Trigger: {workflow.trigger}</p>
            {typeof workflow.successRate === "number" ? <p className="text-xs text-rust-iron">Success: {(workflow.successRate * 100).toFixed(1)}%</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default N8NWorkflowDashboard;
