let ghostConfig

if (process.env.NODE_ENV === `development`) {
    ghostConfig = require(`./.ghost`)
} else {
  ghostConfig = {
    production: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  }
}

const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
}

module.exports = {
  siteMetadata: {
    title: "Aupairadise"
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-ghost`,
      options:
          process.env.NODE_ENV === `development`
              ? ghostConfig.development
              : ghostConfig.production,
    },
    {
      resolve: `gatsby-plugin-remote-images`,
        options: {
          nodeType: `GhostPost`,
          imagePath: `feature_image`,
          name: `featuredImage`,
        },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Aupairadise",
        short_name: "Aupairadise",
        description: `Hey, mein Name ist Luise, willkommen auf diesem Blog über mein Aupairjahr in Amerika!`,
        lang: `de`,
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        display: "standalone",
        icon: "src/assets/Favicon.png", // This path is relative to the root of the site.
        crossOrigin: `use-credentials`,
      },
    },
  ],
}