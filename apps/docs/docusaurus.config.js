module.exports = {
  title: 'nxpm',
  tagline: 'Toolkit for Nx Workspace',
  url: 'https://nxpm.github.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'nxpm', // Usually your GitHub org/user name.
  projectName: 'nxpm', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'nxpm',
      logo: {
        alt: 'nxpm logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/cli/getting-started',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://www.npmjs.com/package/nxpm',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/nxpm/nxpm-cli',
          label: 'GitHub',
          position: 'right',
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
              label: 'nxpm cli',
              to: 'docs/cli',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/RTgCpDd',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nxpm',
            },
          ],
        },
      ],
      copyright: [
        `<a target="_blank" href="https://kikstart.dev">kikstart.dev</a> © ${new Date().getFullYear()}`,
        `<small>Logo made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>`,
      ].join('<br />'),
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
