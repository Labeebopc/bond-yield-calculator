# Bond Yield Calculator - Backend API

This is the NestJS backend for the Bond Yield Calculator, providing the financial logic and endpoints.

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

The backend API will be available at [http://localhost:3000](http://localhost:3000).
The **Swagger API Documentation** is automatically generated and available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

### Running Backend Only

If you only want to start the NestJS server for the backend, you can run the following from within this `apps/api` directory:

```bash
# development
npm run start

# watch mode
npm run start:dev
```

## Testing

To run the unit tests for the financial calculation logic:
```bash
npm run test
```
