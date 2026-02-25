# Bond Yield Calculator Monorepo

A production-quality Bond Yield Calculator web application built with a modern stack featuring React, Vite, TailwindCSS, and NestJS, within an NPM workspaces monorepo.

## 📖 Project Explanation (App Details)

### 📐 Formulas & Assumptions

#### Assumptions

- **Settlement Date**: Assumed to be "today" for the sake of cash flow dates.
- **Payment Dates**: Calculated by adding exactly $12 / \text{frequency}$ months to the settlement date sequentially.
- **Periods**: `N = round(Years to Maturity * Frequency)`. Rounding ensures a valid integer length for the schedule array.

#### Core Formulas

- **Coupon per Period**: `C = Face Value * (Annual Coupon Rate / 100) / Frequency`
- **Current Yield**: `Current Yield = (Face Value * (Annual Coupon Rate / 100)) / Market Price`
- **Yield to Maturity (Newton-Raphson)**:
  We solve for period yield `y` such that:
  `P(y) = Sum[ C / (1+y)^t ] + F / (1+y)^N - M = 0`
  We iterate `y_new = y - P(y)/P'(y)` until convergence (`< 1e-8`), then annualize `YTM = y * Frequency`.

### 🧠 Design Decisions

- **Monorepo Structure**: Chose `npm workspaces` for simplicity. It avoids heavy tooling while still cleanly separating the `api`, `web`, and `shared` packages.
- **Shared Package**: The `@bond-yield-calculator/shared` package ensures that the DTOs (interfaces) and Types are perfectly synced between the backend and frontend. This eliminates entire classes of potential integration bugs.
- **NestJS Validation**: Used `class-validator` strictly in the API layer rather than the shared layer to keep the shared library lightweight (no heavy decorator dependencies for the frontend).
- **YTM Calculation Solver**: A Newton-Raphson numerical solver was chosen over bisection for its extremely fast quadratic convergence on standard bond cash flows. Due to the monotonic nature of the price-yield curve for standard bonds, Newton's method is highly reliable here. If coupons are 0, it falls back to an exact closed-form solution.
- **Extensibility**: The finance logic is cleanly isolated in `BondService` without HTTP concerns, making it easily testable and simple to extend if new bond types (e.g., floating rate) are added.

### 🌐 API Details

**POST `/bond/calculate`**
Calculates the bond yield metrics and schedule.

- Request Body (`CalculateBondRequest`):
  - `faceValue` (number > 0)
  - `annualCouponRate` (number >= 0)
  - `marketPrice` (number > 0)
  - `yearsToMaturity` (number > 0)
  - `frequency` (1 for Annual, 2 for Semi-Annual)
- Response Body (`CalculateBondResponse`):
  - `currentYield` (%)
  - `yieldToMaturity` (%)
  - `totalInterest` ($)
  - `premiumDiscountIndicator` ("Premium" | "Discount" | "At par")
  - `schedule`: Array of cashflow objects (period, date, payment, interest, remaining principal).

## 📥 How to get from Git

### Prerequisites

- Node.js (v18+)
- npm (v9+)
- Git

### Installation

1. Clone the repository and navigate into the folder:
   ```bash
   git clone https://github.com/Labeeb-nixxie/bond-yield-calculator.git
   cd bond-yield-calculator
   ```
2. Install all dependencies across the workspaces:
   ```bash
   npm install
   ```

## 🚀 How to run locally

### Running the Application

To run both the NestJS backend and React frontend concurrently:

```bash
npm run dev
```

- **Frontend** will be available at `http://localhost:5173`
- **Backend API** will be available at `http://localhost:8080`
- **Swagger Docs** will be available at `http://localhost:8080/api/docs`

### Testing

Run the backend finance logic unit tests via:

```bash
npm run test
```
