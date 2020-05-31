export default {
  htmlAttributes: { lang: 'en' },
  titleTemplate: 'Universal App | %s',
  link: [
    {
      rel: 'stylesheet',
      href:
        'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css'
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/icons/favicon.png'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ],
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
      name: 'description',
      content: 'Universal React Redux Boilerplate.'
    },
    {
      name: 'theme-color',
      content: '#1a1a1a'
    }
  ]
};
