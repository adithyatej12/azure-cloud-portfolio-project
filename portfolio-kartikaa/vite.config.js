import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages under a repo (not a custom domain or user/org page),
// set base to '/<repo-name>/'. Left as '/' for local dev, S3+CloudFront, and custom domains.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
