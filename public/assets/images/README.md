# Images Folder

This folder is designated for storing icons and images used in the CoC Pro Dashboard.

## Structure
- `icons/` - Store UI icons and small graphics
- `badges/` - Store clan badges or league badges if needed
- `backgrounds/` - Store background images or textures

## Supported Formats
- PNG (recommended for icons with transparency)
- JPG/JPEG (recommended for photos/backgrounds)
- SVG (recommended for scalable icons)
- GIF (for animated elements if needed)

## Usage in Code
Reference images using relative paths from the public folder:
```html
<img src="images/icons/clan-icon.png" alt="Clan Icon">
```

```css
background-image: url('images/backgrounds/hero-bg.jpg');
```