export default function DocsSection() {
  return (
    <section id="docs" className="py-24 bg-gradient-to-br from-slate-900/5 via-gray-900/10 to-zinc-900/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-semibold">Documentation</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to get the most out of PlusFolio with our comprehensive guides and API documentation.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-medium mb-4">Getting Started</h3>
              <p className="text-muted-foreground mb-4">
                Quick start guide to analyzing your first website and understanding the results.
              </p>
              <a href="#" className="text-primary hover:underline">
                Read Guide →
              </a>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-medium mb-4">API Reference</h3>
              <p className="text-muted-foreground mb-4">
                Complete API documentation for integrating PlusFolio into your workflow.
              </p>
              <a href="#" className="text-primary hover:underline">
                View API Docs →
              </a>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-medium mb-4">Best Practices</h3>
              <p className="text-muted-foreground mb-4">
                Tips and strategies for acting on AI insights to maximize your conversion rates.
              </p>
              <a href="#" className="text-primary hover:underline">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
