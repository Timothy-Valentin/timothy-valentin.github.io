/**
 * Rendu des diagrammes Mermaid (topologies réseau).
 * La bibliothèque n'est chargée (import dynamique) que si la page contient
 * au moins un bloc `pre.mermaid` : les autres pages restent sans JS lourd.
 */
const isDark = () => document.documentElement.classList.contains('dark');

async function render(nodes: HTMLElement[]) {
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: isDark() ? 'dark' : 'neutral',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    flowchart: { htmlLabels: true, curve: 'basis' },
  });
  for (const node of nodes) {
    node.removeAttribute('data-processed');
    node.textContent = node.dataset.source ?? '';
  }
  await mermaid.run({ nodes });
}

export function initMermaid() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('pre.mermaid'));
  if (nodes.length === 0) return;
  // Conserve la source pour pouvoir re-rendre au changement de thème.
  for (const node of nodes) node.dataset.source = node.textContent ?? '';
  render(nodes).catch((err) => console.error('[mermaid]', err));
  document.addEventListener('themechange', () => {
    render(nodes).catch((err) => console.error('[mermaid]', err));
  });
}
