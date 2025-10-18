# Robotics Skills Marketplace

A beautiful, modern web application for discovering, sharing, and acquiring robotics skills for open-source robotics platforms. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Advanced Search & Filtering** - Find skills quickly with real-time search and category filtering
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode support
- 🤖 **Robotics-Focused** - Categories for navigation, manipulation, vision, speech, planning, and more
- 💰 **Free & Paid Skills** - Support for both free open-source and commercial skills
- ⭐ **Ratings & Reviews** - See what the community thinks about each skill
- 📊 **Stats Dashboard** - Track downloads, ratings, and popularity
- 🚀 **Fast & Optimized** - Built with Next.js App Router for optimal performance

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 10.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skills
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
skills/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── SkillCard.tsx
│   ├── data/            # Mock data
│   │   └── mockData.ts
│   └── types/           # TypeScript types
│       └── index.ts
├── public/              # Static assets
├── .github/             # GitHub configuration
└── package.json
```

## Features in Detail

### Skill Categories

- 🧭 **Navigation** - SLAM, path planning, localization
- 🤖 **Manipulation** - Gripper control, motion planning
- 👁️ **Computer Vision** - Object detection, segmentation
- 💬 **Speech & NLP** - Voice commands, natural language processing
- 🗺️ **Path Planning** - A*, RRT, dynamic planning
- 🎮 **Control Systems** - PID, MPC, feedback control
- 📡 **Perception** - Sensor fusion, LiDAR processing
- 🔗 **Integration** - Hardware bridges, middleware

### Sorting Options

- Most Popular (by downloads)
- Recently Updated
- Highest Rated

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

Alternatively, build locally:
```bash
pnpm build
pnpm start
```

## Future Enhancements

- User authentication and profiles
- Skill upload and management
- Reviews and comments system
- Payment integration for paid skills
- Hardware component marketplace
- Integration with robotics platforms (ROS, ROS2)
- API for programmatic access
- Advanced filtering (compatibility, version requirements)

## Contributing

Contributions are welcome! This is currently a tech demo with stubbed data, but we plan to expand functionality.

## License

ISC

## Contact

For questions or support, please open an issue on GitHub.
