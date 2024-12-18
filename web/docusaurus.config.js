// See https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer'

const config = {
  title: 'PiWo - Pico Web Components',
  tagline: 'Experimental web components. A demonstration of the technology rather than a library for building applications. But that may change :-)',
  favicon: 'data:image/png;base64,iVBORw0KGgo=',

  url: 'https://prantlf.github.io',
  baseUrl: '/piwo/',
  trailingSlash: true,

  organizationName: 'prantlf',
  projectName: 'piwo',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/'
        }
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-live-codeblock'
  ],

  themeConfig:
    {
      navbar: {
        title: 'PiWo - Pico Web Components',
        items: [
          {
            href: 'https://github.com/prantlf/piwo',
            label: 'GitHub',
            position: 'right'
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Home',
                to: '/'
              },
            ],
          },
          {
            title: 'Technology',
            items: [
              {
                label: 'WHATWG',
                href: 'https://html.spec.whatwg.org/dev/custom-elements.html'
              },
              {
                label: 'More capable form controls',
                href: 'https://web.dev/articles/more-capable-form-controls'
              },
              {
                label: 'ElementInternals and Form-Associated Custom Elements',
                href: 'https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/'
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/prantlf/piwo'
              },
              {
                label: 'NPMJS',
                href: 'https://www.npmjs.com/package/piwecko'
              }
            ],
          },
        ],
        copyright: `Copyright © 2024 Ferdinand Prantl`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      }
    }
}

export default config
