# JSON Preview

A modern web application for visualizing, exploring, and searching JSON data with ease.

![JSON Preview](https://github.com/davidus27/json-preview/raw/main/public/logo192.png)

## Overview

JSON Preview is a React-based tool that allows users to:
- Drag and drop JSON files for immediate visualization
- Search and filter through complex JSON structures
- Navigate JSON data using an interactive breadcrumb path explorer
- Inspect specific values with the detailed inspector panel
- Expand/collapse all nodes with a single click
- Copy values to clipboard with integrated toast notifications

## Features

- **Interactive Tree View**: Visualize nested JSON structures with expandable/collapsible nodes
- **Search Functionality**: Filter JSON content in real-time
- **Breadcrumb Navigation**: Easily track and navigate your position within the JSON hierarchy
- **Inspector Panel**: View and copy details of selected JSON nodes
- **Drag & Drop Interface**: Simple file loading with no server uploads
- **Web Worker Support**: Handle large JSON files without UI freezing
- **Responsive Design**: Works smoothly across desktop and mobile devices

## Installation

```bash
# Clone the repository
git clone https://github.com/davidus27/json-preview.git

# Navigate to the project directory
cd json-preview

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

1. Visit the application in your browser (locally at http://localhost:3000 or online at https://davidus27.github.io/json-preview)
2. Either drag & drop a JSON file onto the drop area or use the file selector
3. Use the search bar to filter JSON content
4. Click on nodes to expand/collapse them
5. Navigate through the JSON structure using the breadcrumb trail
6. Use the inspector panel to view details of selected nodes

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```bash
# Run tests
npm test

# Create production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Technologies

- React
- CSS + Tailwind
- Web Workers for performance
- GitHub Pages for deployment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
