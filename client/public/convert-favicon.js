const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function generateFavicons() {
  try {
    // Load the SVG
    const svgPath = path.join(__dirname, 'favicon.svg');
    const svgImage = await loadImage(svgPath);
    
    // Generate different sizes
    const sizes = [16, 32, 48, 64, 192, 512];
    
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Draw the SVG on the canvas
      ctx.drawImage(svgImage, 0, 0, size, size);
      
      // Save as PNG
      const buffer = canvas.toBuffer('image/png');
      
      // Define output filename based on size
      let outputFilename;
      if (size === 16 || size === 32 || size === 48 || size === 64) {
        outputFilename = `favicon-${size}x${size}.png`;
      } else if (size === 192) {
        outputFilename = 'android-chrome-192x192.png';
      } else if (size === 512) {
        outputFilename = 'android-chrome-512x512.png';
      }
      
      fs.writeFileSync(path.join(__dirname, outputFilename), buffer);
      console.log(`Generated ${outputFilename}`);
    }
    
    // Create favicon.ico (multi-size icon)
    console.log('Favicon generation complete!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
