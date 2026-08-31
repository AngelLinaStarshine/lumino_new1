export default function EducatorHelpPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 prose prose-sm">
      <h1 className="text-2xl font-display not-prose">Educator help & shortcuts</h1>
      <section>
        <h2 className="text-lg font-medium not-prose">Keyboard shortcuts</h2>
        <ul>
          <li><kbd>G</kbd> then <kbd>D</kbd> — Dashboard</li>
          <li><kbd>G</kbd> then <kbd>S</kbd> — Students roster</li>
          <li><kbd>G</kbd> then <kbd>A</kbd> — Assign practice</li>
          <li><kbd>/</kbd> — Focus search on roster page</li>
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-medium not-prose">Safeguarding</h2>
        <p>Educator messages to students are auto-copied to parents. Flagged words are held for review.</p>
      </section>
    </div>
  );
}
