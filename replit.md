# SkincareIQ - AI-Powered Skincare Ingredient Analyzer

## Overview
SkincareIQ is a web application that analyzes skincare product ingredients using AI to provide detailed pros and cons for each ingredient. Users can enter a product URL and receive instant analysis of ingredients with ratings (beneficial, caution, or concern) along with comprehensive benefits and potential concerns.

## Recent Changes (October 3, 2025)
- Implemented URL scraping functionality using Cheerio
- Connected backend API with OpenAI GPT-5 for real-time ingredient analysis
- Fixed input text color visibility issue for better UX
- Removed mock data and connected frontend to actual API
- Added comprehensive error handling and user feedback with toasts
- Integrated OpenAI API key via Replit's secure secrets management

## Previous Changes (October 2, 2025)
- Transformed from allergen detection to skincare ingredient analysis
- Updated color scheme to purple/beauty theme
- Created ingredient analysis cards with pros/cons display
- Implemented product rating system based on ingredient quality
- Added skincare-specific disclaimer and educational content

## Current State
The application features:
- Beautiful purple-themed UI optimized for beauty/wellness
- URL scanner for product pages
- AI-powered ingredient analysis using OpenAI GPT-5
- Real-time web scraping from product URLs (e.g., isclinical.com)
- Detailed ingredient cards showing benefits and concerns
- Overall product rating system
- Ingredient list highlighting
- Dark/light mode support
- Fully responsive design
- Toast notifications for analysis results and errors

## Project Architecture

### Frontend (React + TypeScript)
- **Components**:
  - `Header`: Navigation with branding and theme toggle
  - `Hero`: Landing section with URL input
  - `IngredientAnalysisCard`: Shows individual ingredient analysis with pros/cons
  - `ProductRating`: Overall product quality rating
  - `AnalysisResults`: Main results display
  - `UrlScanner`: Input component for product URLs
  - `IngredientsList`: Highlighted ingredient list
  - `ThemeProvider`: Dark/light mode management

### Backend (Express + TypeScript)
- Currently using in-memory storage
- API endpoint `/api/analyze` for URL scraping and ingredient analysis
- Web scraping implementation using Axios and Cheerio
- OpenAI GPT-5 integration for AI-powered ingredient analysis
- Comprehensive error handling for scraping failures

### Styling
- Tailwind CSS with custom purple theme
- Shadcn UI components
- Inter font for clean, modern look
- JetBrains Mono for technical ingredient names

## Tech Stack
- **Frontend**: React, TypeScript, Wouter, TanStack Query
- **Backend**: Express, TypeScript, Axios, Cheerio
- **Styling**: Tailwind CSS, Shadcn UI
- **AI**: OpenAI GPT-5 (fully integrated)
- **Web Scraping**: Cheerio for HTML parsing

## Next Steps
1. Create database schema for analysis history
2. Add user accounts for saved analyses
3. Implement batch analysis for multiple products
4. Add support for more product websites
5. Enhance ingredient database with more detailed information

## User Preferences
- Focus on clean, professional design
- Prioritize ingredient education and clarity
- Ensure mobile-responsive experience
