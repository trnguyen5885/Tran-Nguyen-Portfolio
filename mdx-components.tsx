import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />,
    h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
    p: (props) => <p className="mt-4 leading-8 text-muted" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted" {...props} />,
    a: (props) => <a className="text-accent underline underline-offset-4" {...props} />,
    ...components,
  };
}
