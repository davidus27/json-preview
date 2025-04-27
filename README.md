# JSON Preview

A web application and chromium extension for visualizing and searching large JSON objects easily.

![JSON Preview](./public/logo.png)

You can try it out in [web](https://davidus27.github.io/json-preview/) or as an extension.

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

## Installation for development

```bash
git clone https://github.com/davidus27/json-preview.git
cd json-preview
npm install
npm start
```

## Usage

1. Either drag & drop a JSON file onto the drop area or use the file selector
2. Use the search bar to filter JSON content
3. Click on nodes to expand/collapse them
4. Navigate through the JSON structure using the breadcrumb trail
5. Use the inspector panel to view details of selected nodes

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

.
├── src
│   ├── App.jsx
│   ├── components
│   │   ├── Breadcrumbs.jsx
│   │   ├── Clipboard.jsx
│   │   ├── DragDropArea.jsx
│   │   ├── InspectorPanel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── Toast.jsx
│   │   ├── Tree
│   │   └── TreeRenderer.jsx
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   ├── services
│   │   ├── tree-filter.worker.js
│   │   ├── WorkerService.js
│   │   └── worker.js
│   ├── setupTests.js
│   └── utils
│       ├── json-parser.js
│       ├── search-utils.js
│       ├── ui-utils.js
├── tailwind.config.js


```bash
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
