module.exports = {
  title: 'nxpm',
  tagline: 'A toolkit for Nx Workspace',
  url: 'https://nxpm.dev',
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
          to: 'docs/getting-started',
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
    googleAnalytics: {
      trackingID: 'UA-166626980-1',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            {
              label: 'Releasing Packages',
              to: 'docs/guides/releasing-packages',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Kikstart Discord',
              href: 'https://discord.gg/RTgCpDd',
            },
            {
              label: 'Nrwl Slack',
              href:
                'https://join.slack.com/t/nrwlcommunity/shared_invite/zt-9oqftflu-gcpO8xpMCdBhxUWmtuwr~g',
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
            {
              label: 'Twitter',
              href: 'https://twitter.com/beeman_nl',
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
          editUrl: 'https://github.com/nxpm/nxpm/edit/master/apps/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
