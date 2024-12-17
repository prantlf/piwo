// See https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer'

const config = {
  title: 'PiWo - Pico Web Components',
  tagline: 'Experimental web components. A demonstration of the technology rather than a library for building applications. But that may change :-)',
  favicon: 'data:image/png;base64,iVBORw0KGgo=',

  url: 'https://prantlf.github.io',
  baseUrl: '/piwo/',

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
          routeBasePath: '/',
          editUrl: 'https://github.com/prantlf/piwo/edit/master/README.md'
        }
      },
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

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
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus'
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus'
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus'
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus'
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula
      }
    }
}

export default config
