# Financial Freedom Companion: Personal Budget Maestro

## Project Overview
A comprehensive personal budget tracking mobile application developed as part of a senior React Native developer job application at Foodics.

## Features

### Core Functionality
- **Dashboard**
  - Total income, expenses, and remaining balance visualization
  - Expense categories chart (Pie Chart)
  - 10 most recent transactions display

- **Expense Breakdown**
  - Pie chart of spending categories
  - Stacked bar chart for income sources
  - Financial insights and advice links

- **Transaction Management**
  - Manual transaction entry
  - Flexible date and time logging
  - Income and expense categorization

- **Transaction History**
  - Comprehensive transaction list
  - Sorting capabilities

- **Settings**
  - Theme customization
  - Multi-language support
  - Currency conversion
  - Personal profile settings

### Bonus Features
- Dark mode implementation
- Input validation
- Unit testing
- Internationalization (i18n)
- Multi-currency support

## Technical Stack
- **Framework**: React Native (Expo SDK 52)
- **Language**: TypeScript
- **State Management**: Redux
- **Styling**: Tailwind (Native Wind)
- **Persistent Storage**: AsyncStorage
- **API Integration**: Mock API (mockapi.io)

## Color Palette
```javascript
colors: {
  "budget-midnight": "#000000",
  "budget-charcoal": "#101010",
  "budget-steel": "#2A2A2A",
  "budget-silver": "#ACACAC",
  "budget-cloud": "#F5F5F5",
  "budget-snow": "#FEFEFE",
  "budget-tangerine": "#F76D35",
  "budget-expense": "#FF1919",
  "budget-income": "#00B232"
}
```

## Project Structure
- `src/`
  - `types/`: TypeScript type definitions
  - `contexts/`: React contexts
  - `utils/`: Utility functions
  - `hooks/`: Custom React hooks
  - `api/`: API service configurations
  - `components/`: Reusable UI components
  - `screens/`: Main application screens

## Development Approach
- Modular design
- Clean code practices
- Chronological imports
- Comprehensive commenting
- Performance optimization

## Mission: Financial Clarity & Control

This Budget Tracker transforms complex financial data into actionable insights, empowering users to:
- Decode personal spending patterns
- Gain comprehensive financial understanding
- Make informed monetary decisions

## Future Vision
- Banking app integration
- Advanced financial insights
- Enhanced data visualization
- AI-powered financial coaching
- Global financial ecosystem connections

## Prerequisites
- Node.js
- npm or Yarn
- Expo CLI

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the application:
   ```bash
   npx expo start
   ```

## Testing
- Unit tests for core functions
- Component-level testing

## License
Private project developed for Foodics job application. Not for public distribution.

---

**Note**: This application was developed as a technical assessment for a senior React Native developer position.