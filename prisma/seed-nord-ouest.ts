/**
 * Nord-Ouest Department Seed Data
 *
 * Seeds the 10 communes of Nord-Ouest with basic information.
 * Population data from IHSI 2015 estimate (as cited on Wikipedia).
 *
 * Usage: npm run db:seed:nord-ouest
 */

import { prisma } from '../src/lib/db/prisma'

interface CommuneData {
  slug: string
  name: string
  arrondissement: string
  population2015: number | null
  order: number
}

const communes: CommuneData[] = [
  // Arrondissement of Môle-Saint-Nicolas
  {
    slug: 'mole-saint-nicolas',
    name: 'Môle-Saint-Nicolas',
    arrondissement: 'Môle-Saint-Nicolas',
    population2015: null, // To be verified
    order: 1,
  },
  {
    slug: 'baie-de-henne',
    name: 'Baie-de-Henne',
    arrondissement: 'Môle-Saint-Nicolas',
    population2015: null,
    order: 2,
  },
  {
    slug: 'bombardopolis',
    name: 'Bombardopolis',
    arrondissement: 'Môle-Saint-Nicolas',
    population2015: null,
    order: 3,
  },
  {
    slug: 'jean-rabel',
    name: 'Jean-Rabel',
    arrondissement: 'Môle-Saint-Nicolas',
    population2015: null,
    order: 4,
  },

  // Arrondissement of Port-de-Paix
  {
    slug: 'port-de-paix',
    name: 'Port-de-Paix',
    arrondissement: 'Port-de-Paix',
    population2015: null,
    order: 5,
  },
  {
    slug: 'bassin-bleu',
    name: 'Bassin-Bleu',
    arrondissement: 'Port-de-Paix',
    population2015: null,
    order: 6,
  },
  {
    slug: 'chansolme',
    name: 'Chansolme',
    arrondissement: 'Port-de-Paix',
    population2015: null,
    order: 7,
  },
  {
    slug: 'la-tortue',
    name: 'La Tortue',
    arrondissement: 'Port-de-Paix',
    population2015: null,
    order: 8,
  },

  // Arrondissement of Saint-Louis-du-Nord
  {
    slug: 'saint-louis-du-nord',
    name: 'Saint-Louis-du-Nord',
    arrondissement: 'Saint-Louis-du-Nord',
    population2015: null,
    order: 9,
  },
  {
    slug: 'anse-a-foleur',
    name: 'Anse-à-Foleur',
    arrondissement: 'Saint-Louis-du-Nord',
    population2015: null,
    order: 10,
  },
]

async function seedCommunes() {
  console.log('🏛️  Seeding Nord-Ouest communes...')

  for (const commune of communes) {
    await prisma.commune.upsert({
      where: { slug: commune.slug },
      update: {
        name: commune.name,
        arrondissement: commune.arrondissement,
        population2015: commune.population2015,
        populationSource: commune.population2015
          ? 'IHSI 2015 estimate (as cited on Wikipedia)'
          : null,
        populationSourceUrl: commune.population2015
          ? 'https://en.wikipedia.org/wiki/Nord-Ouest_(department)'
          : null,
        order: commune.order,
      },
      create: {
        slug: commune.slug,
        name: commune.name,
        arrondissement: commune.arrondissement,
        population2015: commune.population2015,
        populationSource: commune.population2015
          ? 'IHSI 2015 estimate (as cited on Wikipedia)'
          : null,
        populationSourceUrl: commune.population2015
          ? 'https://en.wikipedia.org/wiki/Nord-Ouest_(department)'
          : null,
        order: commune.order,
        supporterCount: 0,
      },
    })

    console.log(`  ✅ ${commune.name}`)
  }
}

async function seedCandidateConfig() {
  console.log('\n📋 Updating candidate config with campaign dates...')

  // Check if candidate config exists
  const config = await prisma.candidateConfig.findFirst({
    where: { slug: 'bellefleur' },
  })

  if (!config) {
    console.log('  ⚠️  No candidate config found. Run main seed first.')
    return
  }

  // Update with reported campaign calendar
  await prisma.candidateConfig.update({
    where: { id: config.id },
    data: {
      firstRoundDate: new Date('2027-07-18'),
      firstRoundDateNote:
        'First round date per CEP calendar reported October 28, 2026. Verify against official CEP decree.',
      secondRoundDate: new Date('2027-10-04'),
      secondRoundDateNote:
        'Second round date per CEP calendar reported October 28, 2026. Verify against official CEP decree.',
      officialCampaignStart: new Date('2027-04-15'),
      communes: [
        'Môle-Saint-Nicolas',
        'Baie-de-Henne',
        'Bombardopolis',
        'Jean-Rabel',
        'Port-de-Paix',
        'Bassin-Bleu',
        'Chansolme',
        'La Tortue',
        'Saint-Louis-du-Nord',
        'Anse-à-Foleur',
      ],
    },
  })

  console.log('  ✅ Campaign dates updated (marked as reported, requires verification)')
  console.log('  ✅ Communes list updated')
}

async function seedPressKit() {
  console.log('\n📰 Creating press kit placeholder...')

  await prisma.pressKit.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      contactName: 'Media Contact',
      contactEmail: 'press@example.com',
      contactPhone: null,
      contentHt: null,
      contentFr: null,
      contentEn: null,
      published: false,
    },
  })

  console.log('  ✅ Press kit placeholder created (unpublished)')
}

async function main() {
  console.log('Starting Nord-Ouest seed...\n')

  await seedCommunes()
  await seedCandidateConfig()
  await seedPressKit()

  console.log('\n✅ Nord-Ouest seed complete!')
  console.log('\nNext steps:')
  console.log('  1. Verify IHSI population data and update individual commune populations')
  console.log('  2. Verify CEP campaign calendar dates')
  console.log('  3. Add commune descriptions (descriptionHt/Fr/En)')
  console.log('  4. Update press kit content when approved')
}

main()
  .catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
