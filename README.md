
# Dish Recipe APP
### Preview Link: https://akt-dish.herokuapp.com/
## Technologies Used:
- React
- Redux - Saga
- TypeScript
- Node.js
- MongoDB
- TailwindCSS
# Project Setup
## To install the project dependencies
- npm install
### To run the project
- npm run dev
### To build the project
- npm run build

## Demo Video
- Generated capture: `demo/dish-recipe-app-demo.webm`
- Reproduce the capture:
  1. Serve the production build: `npx http-server frontend/build -p 4173`
  2. In a new terminal, run `npm run demo:video` (optionally override the URL with `DEMO_BASE_URL=http://host:port`)
  3. After the script finishes, stop the temporary server.
- The script uses Playwright to mock the API responses and walk through the key flows automatically.
