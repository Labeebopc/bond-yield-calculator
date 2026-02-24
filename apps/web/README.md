# Bond Yield Calculator - Web Frontend

This is the React frontend for the Bond Yield Calculator, built with Vite, TypeScript, and TailwindCSS.

## Running the App

Since this project is part of a monorepo, the recommended way to start the application (both frontend and backend) is from the **root directory**.

1. Navigate to the project root:
   ```bash
   cd ../../
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Run the complete application (Web + API):
   ```bash
   npm run dev
   ```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

### Running Frontend Only

If you only want to start the Vite development server for the frontend, you can run the following from within this `apps/web` directory:

```bash
npm run dev
```

*Note: The frontend expects the backend API to be running on `http://localhost:3000`. Some features might not work without it.*

## Building for Production

To build the frontend for production, run:

```bash
npm run build
```
The compiled files will be located in the `apps/web/dist` directory.
