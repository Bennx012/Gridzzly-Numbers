# Gridzzly Numbers

Gridzzly Numbers is a minimalist, vintage-inspired puzzle game designed to test your visual scanning and reaction speed. Find numbers in a grid from 1 to N as fast as you can.

## Features

- **Multiple Grid Sizes**: Choose between 3x3, 4x4, and 5x5 grids.
- **Two Game Modes**:
  - **Read Mode**: Practice your visual scanning without clicking.
  - **Game Mode**: Race against the clock to find and click numbers in order.
- **Difficulty Levels**:
  - **One Tone**: Clean, single-color numbers for a focused experience.
  - **Colored**: Randomly colored numbers to increase visual noise and difficulty.
- **Performance Analytics**: Detailed post-game stats including total time, average time per number, and a performance chart showing your speed for each number found.
- **Responsive Design**: Playable on desktop and mobile devices.
- **Clean Aesthetic**: A soft, "coffee-bar" inspired UI with smooth animations.

## Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Motion** (Animations)
- **Lucide React** (Icons)
- **Recharts** (Data Visualization)
- **Vite** (Build Tool)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd gridzzly-numbers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

### Building for Production

To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs TypeScript type checking.
- `npm run clean`: Removes the `dist` directory.

## License

GNU General Public License v3.0
