import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    // Override Slidev's default bg-main (bg-white dark:bg-[#121212])
    // so #slide-content uses the Apple theme's near-white background
    'bg-main': 'bg-[#fbfbfd] dark:bg-[#1d1d1f]',
  },
})
