/**
 * News System Seed Data
 *
 * Seeds the single required article from HaitiLibre (2016)
 * Status: PENDING until admin confirms live page data
 *
 * Everything else comes from automated discovery.
 *
 * Usage: npm run db:seed:news
 */

import { prisma } from '../src/lib/db/prisma'

async function seedNewsArticle() {
  console.log('📰 Seeding news system...\n')

  // Single seed article (from steering document)
  const article = await prisma.newsArticle.upsert({
    where: {
      url: 'https://www.haitilibre.com/en/news-18348-haiti-elections-mirlande-manigat-present-the-7-senate-candidates-of-rndp.html',
    },
    update: {},
    create: {
      url: 'https://www.haitilibre.com/en/news-18348-haiti-elections-mirlande-manigat-present-the-7-senate-candidates-of-rndp.html',
      originalUrl:
        'https://www.haitilibre.com/en/news-18348-haiti-elections-mirlande-manigat-present-the-7-senate-candidates-of-rndp.html',
      headline:
        'Haiti - Elections : Mirlande Manigat present the 7 Senate candidates of RNDP',
      outlet: 'HaitiLibre',
      publishedAt: new Date('2016-08-22'),
      language: 'en',
      contentType: 'NEWS',
      matchScore: 9, // Full name in title + RNDP context
      matchTier: 'ABOUT',
      matchConfidence: 'HIGH',
      status: 'PENDING', // Mark PENDING until admin confirms live page
      discoveredVia: 'manual',
      domain: 'haitilibre.com',
    },
  })

  console.log('  ✅ Seed article created (PENDING status)')
  console.log(`     ${article.headline}`)
  console.log(`     ${article.url}`)
  console.log('\nNote: Status is PENDING until admin verifies live page data.\n')
}

async function seedNewsSources() {
  console.log('📡 Seeding news sources...\n')

  // GDELT source
  await prisma.newsSource.upsert({
    where: { name: 'GDELT' },
    update: {},
    create: {
      name: 'GDELT',
      sourceType: 'GDELT',
      enabled: true,
      config: {
        apiUrl: 'https://api.gdeltproject.org/api/v2/doc/doc',
        rateLimit: 0.2, // 1 request per 5 seconds
        maxResults: 250,
        queries: [
          '"Jean Fritznel Bellefleur"',
          '"Fritznel Bellefleur"',
          '(Bellefleur AND (sénateur OR sénat OR "Nord-Ouest" OR RDNP OR "Port-de-Paix" OR "Môle-Saint-Nicolas" OR Jean-Rabel OR candidat))',
        ],
      },
    },
  })
  console.log('  ✅ GDELT source')

  // RSS sources (Haiti outlets)
  const rssOutlets = [
    { name: 'Haitian Times', url: 'https://haitiantimes.com/' },
    { name: 'Le Nouvelliste', url: 'https://lenouvelliste.com/' },
    { name: 'HaitiLibre', url: 'https://www.haitilibre.com/' },
    { name: 'Juno7', url: 'https://www.juno7.ht/' },
    { name: 'Rezo Nòdwès', url: 'https://www.rezonodwes.com/' },
    { name: 'Le National', url: 'http://www.lenational.org/' },
    { name: 'Gazette Haïti', url: 'https://www.gazettehaiti.com/' },
    { name: 'Le Témoin', url: 'http://www.letemoin.net/' },
    { name: 'Zantray News', url: 'https://zantraynews.com/' },
    { name: 'Le Relief', url: 'https://lerelief.com/' },
  ]

  for (const outlet of rssOutlets) {
    await prisma.newsSource.upsert({
      where: { name: `${outlet.name} RSS` },
      update: {},
      create: {
        name: `${outlet.name} RSS`,
        sourceType: 'RSS',
        enabled: true,
        config: {
          siteUrl: outlet.url,
          feedUrl: null, // To be auto-discovered
          checkRobotsTxt: true,
        },
      },
    })
    console.log(`  ✅ ${outlet.name} RSS`)
  }

  // Manual source
  await prisma.newsSource.upsert({
    where: { name: 'Manual' },
    update: {},
    create: {
      name: 'Manual',
      sourceType: 'MANUAL',
      enabled: true,
      config: {},
    },
  })
  console.log('  ✅ Manual source')

  console.log()
}

async function seedNewsQueries() {
  console.log('🔍 Seeding search queries...\n')

  const queries = [
    {
      name: 'Full name (exact)',
      queryPattern: '"Jean Fritznel Bellefleur"',
      minScore: 7,
      autoPublishScore: 9,
    },
    {
      name: 'Middle + Last name',
      queryPattern: '"Fritznel Bellefleur"',
      minScore: 7,
      autoPublishScore: 9,
    },
    {
      name: 'Last name + context',
      queryPattern:
        'Bellefleur AND (sénateur OR sénat OR "Nord-Ouest" OR RDNP OR "Port-de-Paix" OR candidat)',
      minScore: 5,
      autoPublishScore: 7,
    },
  ]

  for (const query of queries) {
    await prisma.newsQuery.upsert({
      where: { name: query.name },
      update: {},
      create: query,
    })
    console.log(`  ✅ ${query.name}`)
  }

  console.log()
}

async function main() {
  console.log('Starting news system seed...\n')

  await seedNewsArticle()
  await seedNewsSources()
  await seedNewsQueries()

  console.log('✅ News system seed complete!\n')
  console.log('Next steps:')
  console.log('  1. Run ingestion to discover articles (when implemented)')
  console.log('  2. Review and approve PENDING article in /admin/news')
  console.log('  3. Configure RSS feed URLs in source manager')
  console.log('  4. Test GDELT queries')
  console.log('  5. Set NEWS_ENABLED=true when ready to show section\n')
}

main()
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
