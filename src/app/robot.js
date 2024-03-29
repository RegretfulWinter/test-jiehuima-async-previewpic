export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/api/*',
        disallow: '/private/',
      },
      sitemap: 'https://acme.com/sitemap.xml',
    }
  }