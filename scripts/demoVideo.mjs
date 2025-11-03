import { chromium, devices } from 'playwright'
import fs from 'fs/promises'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.resolve(__dirname, '../demo')
const TEMP_VIDEO_DIR = path.resolve(OUTPUT_DIR, '.temp')
const FINAL_VIDEO_PATH = path.resolve(OUTPUT_DIR, 'dish-recipe-app-demo.webm')

const BASE_URL = process.env.DEMO_BASE_URL ?? 'http://127.0.0.1:4173/'

const mockProducts = [
  {
    _id: 'dish-1',
    name: 'Chicken Drum Stick',
    image:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2019%2F03%2FChicken-UberForgottenFood-FT-Blog0319.jpg',
    recipeIngredient: [
      {
        ingredient_name: 'Chicken',
        ingredient_quantity: '500',
        ingredient_unit: 'gm',
      },
      {
        ingredient_name: 'Onion',
        ingredient_quantity: '3',
        ingredient_unit: 'medium',
      },
      {
        ingredient_name: 'Butter',
        ingredient_quantity: '2',
        ingredient_unit: 'tbsp',
      },
    ],
    recipeInstructions: [
      'Marinate drumsticks with spices and rest for 30 minutes.',
      'Pan sear until golden brown and finish in the oven.',
      'Brush with melted butter before serving.',
    ],
  },
  {
    _id: 'dish-2',
    name: 'Fresh Caprese Pizza',
    image:
      'https://st.depositphotos.com/1003814/5052/i/950/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg',
    recipeIngredient: [
      {
        ingredient_name: 'Cheese',
        ingredient_quantity: '300',
        ingredient_unit: 'gm',
      },
      {
        ingredient_name: 'Tomato',
        ingredient_quantity: '3',
        ingredient_unit: 'medium',
      },
      {
        ingredient_name: 'Basil',
        ingredient_quantity: '8',
        ingredient_unit: 'leaves',
      },
    ],
    recipeInstructions: [
      'Stretch the dough and spread tomato sauce evenly.',
      'Top with mozzarella slices, tomatoes and basil leaves.',
      'Bake in a 250C oven for 12 minutes.',
    ],
  },
  {
    _id: 'dish-3',
    name: 'Veggie Power Bowl',
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    recipeIngredient: [
      {
        ingredient_name: 'Quinoa',
        ingredient_quantity: '1',
        ingredient_unit: 'cup',
      },
      {
        ingredient_name: 'Broccoli',
        ingredient_quantity: '2',
        ingredient_unit: 'cups',
      },
      {
        ingredient_name: 'Chickpeas',
        ingredient_quantity: '1',
        ingredient_unit: 'can',
      },
    ],
    recipeInstructions: [
      'Cook quinoa until fluffy and toss with olive oil.',
      'Roast broccoli and chickpeas with paprika.',
      'Assemble with a lemon tahini drizzle.',
    ],
  },
  {
    _id: 'dish-4',
    name: 'Citrus Sunrise Smoothie',
    image:
      'https://images.unsplash.com/photo-1570158268183-d296b2892211?auto=format&fit=crop&w=900&q=80',
    recipeIngredient: [
      {
        ingredient_name: 'Orange',
        ingredient_quantity: '2',
        ingredient_unit: 'whole',
      },
      {
        ingredient_name: 'Carrot',
        ingredient_quantity: '1',
        ingredient_unit: 'large',
      },
      {
        ingredient_name: 'Ginger',
        ingredient_quantity: '1',
        ingredient_unit: 'inch',
      },
    ],
    recipeInstructions: [
      'Peel oranges and chop carrot into chunks.',
      'Blend everything with ice until smooth.',
      'Serve chilled with a mint garnish.',
    ],
  },
]

const ensureDirs = async () => {
  await fs.mkdir(TEMP_VIDEO_DIR, { recursive: true })
}

const cleanTempVideos = async () => {
  try {
    const files = await fs.readdir(TEMP_VIDEO_DIR)
    await Promise.all(
      files.map(file => fs.unlink(path.join(TEMP_VIDEO_DIR, file)).catch(() => null))
    )
  } catch (error) {
    if ((error)?.code !== 'ENOENT') {
      throw error
    }
  }
}

const run = async () => {
  await ensureDirs()
  await cleanTempVideos()

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    ...devices['Desktop Chrome'],
    recordVideo: {
      dir: TEMP_VIDEO_DIR,
      size: { width: 1280, height: 720 },
    },
  })

  const page = await context.newPage()
  const video = page.video()

  await page.route('**/api/products', async route => {
    await route.fulfill({
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
      },
      body: JSON.stringify(mockProducts),
    })
  })

  const step = async (label, action) => {
    try {
      await action()
      await page.waitForTimeout(500)
    } catch (error) {
      console.error(`Failed at step: ${label}`)
      throw error
    }
  }

  await step('Navigate to home', async () => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })
    await page.waitForSelector('text=Filter Dish Recipes', { timeout: 20000 })
  })

  await step('Showcase hero', async () => {
    await page.waitForTimeout(1500)
  })

  await step('Toggle dark mode', async () => {
    await page.locator('.dark-mode-toggle').click()
    await page.waitForTimeout(1200)
    await page.locator('.dark-mode-toggle').click()
  })

  await step('Interact with filters', async () => {
    const firstFilter = page.locator('.filter-drop input[type="checkbox"]').first()
    await page.evaluate(() => window.scrollTo({ top: 550, behavior: 'smooth' }))
    await page.waitForTimeout(1500)
    await firstFilter.click({ force: true })
    await page.waitForTimeout(1200)
    await firstFilter.click({ force: true })
  })

  await step('Open first recipe', async () => {
    const firstViewRecipe = page.getByRole('link', { name: 'View Recipe' }).first()
    await firstViewRecipe.click()
    await page.waitForSelector('text=Ingredients:', { timeout: 20000 })
  })

  await step('Scroll recipe details', async () => {
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }))
    await page.waitForTimeout(2000)
  })

  await step('Return home', async () => {
    await page.goBack()
    await page.waitForSelector('text=Filter Dish Recipes', { timeout: 20000 })
  })

  await step('Show login', async () => {
    await page.getByRole('link', { name: 'Login' }).first().click()
    await page.waitForURL('**/login', { timeout: 20000 })
    await page.getByRole('heading', { name: 'Login' }).waitFor({ timeout: 10000 })
    await page.waitForTimeout(1500)
  })

  await step('Show signup', async () => {
    await page.getByRole('link', { name: 'Signup' }).first().click()
    await page.waitForURL('**/signup', { timeout: 20000 })
    await page.locator('main').getByText('Signup').first().waitFor({ timeout: 10000 })
    await page.waitForTimeout(1500)
  })

  await page.close()
  await context.close()

  if (!video) {
    throw new Error('Video was not recorded')
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  await video.saveAs(FINAL_VIDEO_PATH)
  await video.delete()

  await browser.close()

  console.log(`Demo video saved to ${FINAL_VIDEO_PATH}`)
}

run().catch(async error => {
  console.error(error)
  process.exitCode = 1
})
