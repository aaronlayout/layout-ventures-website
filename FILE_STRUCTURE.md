# Layout Ventures Website - File Structure

## HTML Files
- `index.html` - Main homepage
- `fund-announcement.html` - Fund announcement page

## CSS Files
- `styles.css` - Main stylesheet (12 KB)
- `announcement-styles.css` - Announcement page styles (2.5 KB)

## JavaScript Files
- `script.js` - Interactive features and animations (2.2 KB)

## Image Assets

### Logos - Current Portfolio
- `Ferry_Health_Logo.png` - Ferry Health logo
- `stackpack.png` - Stackpack logo
- `Branch_Logo_Small_Icon_Dark_Green.svg` - Branch Care logo
- `stealth_startup_51_logo.jpeg` - Stealth company placeholder (2 instances)

### Logos - Prior Investments
- `Apella_logo.png` - Apella logo
- `SafeRide_Health_Logo-FULL.png` - SafeRide Health logo
- `Ostro_logo.png` - Ostro logo
- `scanwelllogo-color.png` - Scanwell logo (exited)
- `Memora_Health_Logo2.png` - Memora Health logo (exited)

### Brand Assets
- `Layout-Ventures-Logo-White.png` - Layout Ventures main logo (white)
- `Aaron_Photo.jpg` - Team member photo (265 KB)

## Configuration Files
- `.gitignore` - Git ignore rules
- `README.md` - Repository documentation

## Total Files: 18
## Total Size: ~460 KB

## GitHub Repository Setup

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Layout Ventures website"
   ```

2. Connect to GitHub:
   ```bash
   git remote add origin [your-repo-url]
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Navigate to Pages section
   - Select branch: main
   - Select folder: / (root)
   - Save

Your website will be live at: `https://[username].github.io/[repo-name]/`
