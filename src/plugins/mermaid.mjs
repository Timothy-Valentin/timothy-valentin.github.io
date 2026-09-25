/**
 * Plugin HAST pour Sätteri (processeur Markdown natif d'Astro 7) :
 * transforme les blocs ```mermaid (exclus de Shiki via `excludeLangs`)
 * en <pre class="mermaid">. Le rendu SVG est ensuite effectué côté client,
 * uniquement sur les pages qui contiennent un diagramme.
 * Fonctionne pour les fichiers .md comme .mdx.
 *
 * @type {import('satteri').HastPluginDefinition}
 */
const mermaid = {
  name: 'mermaid',
  element: {
    filter: ['pre'],
    visit(node, ctx) {
      const code = node.children?.find((c) => c.type === 'element' && c.tagName === 'code');
      if (!code || code.type !== 'element') return;
      const classes = Array.isArray(code.properties?.className) ? code.properties.className : [];
      const lang = code.data?.lang ?? classes.find((c) => String(c).startsWith('language-'))?.slice(9);
      if (lang !== 'mermaid') return;
      return {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'], dataPagefindIgnore: '' },
        children: [{ type: 'text', value: ctx.textContent(code).replace(/\n$/, '') }],
      };
    },
  },
};

export default mermaid;
