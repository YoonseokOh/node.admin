import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Handlebars from 'handlebars';
import './style.css';

const service = { name: 'Yoon' };

const routes = {
  additional: {
    contacts: 'default',
    ecommerce: 'default',
    profile: 'default',
    projectDetail: 'default',
    projects: 'default',
  },
  chart: {
    echarts: 'default',
    js: 'default',
    js2: 'default',
    morisjs: 'default',
    others: 'default',
  },
  form: {
    advanced: 'default',
    buttons: 'default',
    general: 'default',
    upload: 'default',
    validation: 'default',
    wizards: 'default',
  },
  home: {
    index: 'default',
    index2: 'default',
    index3: 'default',
    level2: 'default',
  },
  table: {
    dynamic: 'default',
    general: 'default',
  },
  ui: {
    calendar: 'default',
    general: 'default',
    glyphicons: 'default',
    icons: 'default',
    inbox: 'default',
    invoice: 'default',
    mediaGallery: 'default',
    typography: 'default',
    widgets: 'default',
  },
  extras: {
    login: 'simple',
    plain: 'default',
    pricingTables: 'simple',
  },
  403: 'simple',
  404: 'simple',
  500: 'simple',
  login: 'simple',
};

const viewModules = import.meta.glob('../app/views/**/*.hbs', {
  eager: true,
  import: 'default',
  query: '?raw',
});
const loadedExternalScripts = new Set();
const installedHeadNodes = new Set();

function getView(path) {
  return viewModules[`../app/views/${path}.hbs`];
}

function resolveRoute(pathname) {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

  if (!cleanPath) {
    return { path: 'home/index', layout: 'default', redirectTo: '/home/index' };
  }

  if (typeof routes[cleanPath] === 'string') {
    return { path: cleanPath, layout: routes[cleanPath] };
  }

  const [section, page] = cleanPath.split('/');
  const layout = routes[section]?.[page];

  if (layout) {
    return { path: `${section}/${page}`, layout };
  }

  return { path: 'login', layout: 'simple', redirectTo: '/login' };
}

function createRenderer() {
  const hbs = Handlebars.create();
  const blocks = {};

  hbs.registerHelper('extend', function extend(type, name, context) {
    const blockType = String(type);
    const blockName = name == null ? '__default__' : String(name);

    if (!blocks[blockType]) {
      blocks[blockType] = { names: new Set(), values: [] };
    }

    if (!blocks[blockType].names.has(blockName)) {
      blocks[blockType].names.add(blockName);
      blocks[blockType].values.push(context.fn(this));
    }

    return '';
  });

  hbs.registerHelper('block', function block(type) {
    const blockType = String(type);
    const value = blocks[blockType]?.values.join('\n') ?? '';
    blocks[blockType] = { names: new Set(), values: [] };
    return new hbs.SafeString(value);
  });

  Object.entries(viewModules).forEach(([path, source]) => {
    const partialPrefix = '../app/views/components/';

    if (path.startsWith(partialPrefix)) {
      const name = path.slice(partialPrefix.length).replace(/\.hbs$/, '');
      hbs.registerPartial(name, source);
    }
  });

  return {
    render(path, layout) {
      const templateSource = getView(path);
      const layoutSource = getView(`layout/${layout}`);

      if (!templateSource || !layoutSource) {
        return this.render('404', 'simple');
      }

      const context = { service };
      const body = hbs.compile(templateSource)(context);

      return hbs.compile(layoutSource)({
        ...context,
        body: new hbs.SafeString(body),
      });
    },
  };
}

function removeManagedScripts(root) {
  document.body.querySelectorAll('script[data-vite-admin-managed="true"]').forEach((item) => {
    if (item !== root) {
      item.remove();
    }
  });
}

function applyHead(nextDocument) {
  const nextHeadNodes = [...nextDocument.head.childNodes].filter((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    return ['LINK', 'STYLE', 'META'].includes(node.tagName);
  });

  nextHeadNodes.forEach((node) => {
    const key = node.href || node.outerHTML;

    if (installedHeadNodes.has(key)) {
      return;
    }

    const nextNode = document.importNode(node, true);
    nextNode.dataset.viteAdminManaged = 'true';
    document.head.append(nextNode);
    installedHeadNodes.add(key);
  });
}

function shouldLoadScriptOnce(src) {
  return new URL(src, window.location.href).pathname.startsWith('/components/');
}

function runScript(script) {
  return new Promise((resolve, reject) => {
    const nextScript = document.createElement('script');

    [...script.attributes].forEach((attr) => {
      nextScript.setAttribute(attr.name, attr.value);
    });

    nextScript.dataset.viteAdminManaged = 'true';

    if (script.src) {
      if (shouldLoadScriptOnce(script.src) && loadedExternalScripts.has(script.src)) {
        resolve();
        return;
      }

      nextScript.onload = () => resolve();
      nextScript.onerror = () => reject(new Error(`Failed to load ${script.src}`));
      document.body.append(nextScript);
      loadedExternalScripts.add(script.src);
      return;
    }

    nextScript.textContent = script.textContent;
    document.body.append(nextScript);
    resolve();
  });
}

async function runScripts(scripts) {
  for (const script of scripts) {
    await runScript(script);
  }
}

function replaceDialogNodes(root, nextDocument) {
  const container = root.querySelector('.container.body');

  if (!container) {
    return;
  }

  let node = container.nextSibling;
  while (node) {
    const nextNode = node.nextSibling;
    node.remove();
    node = nextNode;
  }

  nextDocument.body.childNodes.forEach((item) => {
    if (item.nodeType === Node.ELEMENT_NODE) {
      if (item.matches('.container.body') || item.tagName === 'SCRIPT') {
        return;
      }
    }

    container.parentNode.append(document.importNode(item, true));
  });
}

function applyBodyClass(nextDocument, preserveNavigationSize) {
  const currentNavigationSize = document.body.classList.contains('nav-sm') ? 'nav-sm' : 'nav-md';

  document.body.className = nextDocument.body.className;

  if (preserveNavigationSize) {
    document.body.classList.remove('nav-md', 'nav-sm');
    document.body.classList.add(currentNavigationSize);
  }
}

function updateRoot(root, nextDocument, layout) {
  if (layout === 'default' && root.querySelector('.main_container')) {
    const currentContent = root.querySelector('.right_col');
    const nextContent = nextDocument.querySelector('.right_col');

    if (currentContent && nextContent) {
      currentContent.innerHTML = nextContent.innerHTML;
      replaceDialogNodes(root, nextDocument);
      applyBodyClass(nextDocument, true);
      return;
    }
  }

  root.innerHTML = nextDocument.body.innerHTML;
  applyBodyClass(nextDocument, false);
}

function useLocationPath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return [path, setPath];
}

function App() {
  const [path, setPath] = useLocationPath();
  const rootRef = useRef(null);
  const renderer = useMemo(() => createRenderer(), []);

  useEffect(() => {
    const route = resolveRoute(path);

    if (route.redirectTo && window.location.pathname !== route.redirectTo) {
      window.history.replaceState(null, '', route.redirectTo);
      setPath(route.redirectTo);
      return;
    }

    const html = renderer.render(route.path, route.layout);
    const nextDocument = new DOMParser().parseFromString(html, 'text/html');
    const root = rootRef.current;
    const scripts = [...nextDocument.querySelectorAll('script')];

    removeManagedScripts(root);
    applyHead(nextDocument);
    scripts.forEach((script) => script.remove());

    document.title = nextDocument.title || `${service.name} Admin`;

    if (root) {
      updateRoot(root, nextDocument, route.layout);
    }

    runScripts(scripts).catch((error) => {
      console.error(error);
    });
  }, [path, renderer, setPath]);

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href]');

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        anchor.target ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();

      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      window.history.pushState(null, '', url.pathname + url.search + url.hash);
      setPath(url.pathname);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [setPath]);

  return <div ref={rootRef} />;
}

createRoot(document.getElementById('root')).render(<App />);
