export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/api/og/*',
        disallow: '/private/',
      },
      sitemap: 'https://acme.com/sitemap.xml',
    }
  }