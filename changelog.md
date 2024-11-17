# Changelog of quotly-frontend
All notable changes to this project will be documented in this file.

## [0.6.0] - 2024-11-09
### Additions
- Added Landing Page for [#15](https://github.com/quotly-eu/quotly-frontend/issues/15)
- Added styling templates util for easy access for sharing css rulesets which are not worth to be directly a component.

### Changes
- Updated useFetch Hook with RequestInit arg
- Updated env App description
- Updated GuideLinks to allow to center the items

## [0.5.0] - 2024-11-07
### Additions
- Added ApiContext and useFetch Hook for [#12](https://github.com/quotly-eu/quotly-frontend/issues/12)
- Added ApiResponse & User type declaration 

### Changes
- Updated Button, GuideLinks & Input Components
- Updated index file with ApiContextProvider

## [0.4.0] - 2024-11-07
### Additions
- Added Dialog & QuoteDialog Component for [#11](https://github.com/quotly-eu/quotly-frontend/issues/11)
- Added ability to route pages outside given app structure

### Changes
- Updated Button & Input Components
- Updated README.md
- Updated profile placeholder
- Changed from className prop inside component to catch-all rest property
- Avatar URL on Quote is optional

## [0.3.0] - 2024-10-29
### Additions
- Added i18n for translations [#4](https://github.com/quotly-eu/quotly-frontend/issues/4)
- Added Feeds Component for [#8](https://github.com/quotly-eu/quotly-frontend/issues/8) & [#9](https://github.com/quotly-eu/quotly-frontend/issues/9)
- Added GuideLinks Component

### Changes
- theme file now has get values for font sizes
- Switched from manual PWA to Vite-plugin-pwa
- Button now vibrate shortly on click
- Disabled ContextMenu
- dated now uses date for locale formatting
- 404 page has now been updated
- Switched from fontawesome css to react-fontawesome
- Adjusted ProfileButton Component

### Fixes
- Adjusted mobile responsiveness
- Added -webkit-tap-highlight-color: transparent; to links

## [0.2.0] - 2024-10-10
### Additions
- Quote Component [#1](https://github.com/quotly-eu/quotly-frontend/issues/1)
- ButtonPalette Component [#2](https://github.com/quotly-eu/quotly-frontend/issues/2)
- Vite for development and build
- placeOrientation for positional use
- iconify package for icons
- mocks for testing

### Changes
- FloatDropDown Component
- favicon and logo
- manifest
- ProfileButton Component
- setupTests file
- serviceWorker file
- theme file
- Types of component are inside the component folder
- Types of other files are inside the types folder

### Fixes
- Button Component
- FloatDropDown Component
- Fonts and colors
- spacing theme vars are now get values

## [0.1.0] - 2024-09-06
### Additions
- Initial quotly-frontend release

---

## Versioning Template

Please follow the [Semantic Versioning](https://semver.org/) guidelines:

- **MAJOR** version when you make incompatible e.g. API changes (breaking changes)
- **MINOR** version when you add functionality in a backwards-compatible manner
- **PATCH** version when you make backwards-compatible bug fixes.

Format: `[MAJOR.MINOR.PATCH] - YYYY-MM-DD`

### Example:
```
## [1.2.3] - 2023-10-01
### Additions
- New feature description

### Changes
- Updated functionality description

### Fixes
- Bug fix description
```
