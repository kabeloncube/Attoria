# CSS Organization Structure

This project uses a modular CSS architecture for better maintainability and organization.

## File Structure

### Core CSS Files (New Architecture)
```
📁 css/
├── 🎨 theme.css          - Colors, typography, brand-specific styles
├── 📐 layout.css         - Structure, positioning, spacing, grid systems
├── 🧩 components.css     - Reusable UI components (buttons, cards, forms)
└── 📋 dropdowns.css      - Enhanced select element styling
```

### Specialized CSS Files (Existing)
```
├── 🔧 enhanced-styles.css   - Enhanced UI features
├── 📅 events-tracker.css    - Event tracking components
├── ⚔️ war-management.css    - War management features
├── 📊 clan-analytics.css    - Analytics dashboard styles
├── 🔗 flaticon-icons.css    - Icon font styles
└── 📜 styles.css            - Legacy file (being phased out)
```

## Loading Order (HTML)
```html
<!-- Core Architecture (load first) -->
<link rel="stylesheet" href="assets/css/theme.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/dropdowns.css">

<!-- Specialized Features -->
<link rel="stylesheet" href="assets/css/enhanced-styles.css">
<link rel="stylesheet" href="assets/css/events-tracker.css">
<link rel="stylesheet" href="assets/css/war-management.css">
<link rel="stylesheet" href="assets/css/clan-analytics.css">
<link rel="stylesheet" href="assets/css/flaticon-icons.css">
```

## Benefits

### 🎯 Better Organization
- Easy to find styles for specific features
- Clear separation of concerns
- Reduced file complexity

### 🎨 Theme Management
- All colors centralized in `theme.css`
- Easy to create new themes
- Consistent brand styling

### 🚀 Performance
- Smaller, focused files
- Better caching strategies
- Faster loading times

### 🔧 Maintainability
- Easier to debug issues
- Reduced style conflicts
- Clear dependency structure

## CSS Variables (theme.css)

### Primary Colors
```css
--primary-dark: #000047
--primary-blue: #184287
--primary-purple: #42109D
--primary-magenta: #91207E
--icon-color: #42109D
```

### Text Colors
```css
--text-primary: #ffffff
--text-secondary: #e0e0e0
--text-muted: #b0b0b0
```

### UI Colors
```css
--bg-card: rgba(255, 255, 255, 0.1)
--bg-secondary: rgba(255, 255, 255, 0.05)
--border-color: rgba(255, 255, 255, 0.2)
--success-color: #2ecc71
--error-color: #e74c3c
--warning-color: #f39c12
```

## Migration Status

✅ **Completed:**
- Color variables extracted to `theme.css`
- Layout styles moved to `layout.css`
- Component styles organized in `components.css`
- Dropdown styles enhanced in `dropdowns.css`
- HTML updated to use new structure

🔄 **In Progress:**
- Gradual migration from `styles.css`
- Integration testing with existing features

## Usage Examples

### Creating New Themes
To create a new theme, copy `theme.css` and modify the color variables:

```css
/* dark-theme.css */
:root {
    --primary-purple: #8A2BE2;
    --primary-magenta: #FF1493;
    --icon-color: #8A2BE2;
    /* ... other colors */
}
```

### Adding New Components
Add reusable UI components to `components.css`:

```css
/* New component */
.my-component {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    /* ... */
}
```

---

**Last Updated:** $(date)
**Architecture:** Modular CSS with CSS Variables
**Framework:** Vanilla CSS with BEM-like methodology