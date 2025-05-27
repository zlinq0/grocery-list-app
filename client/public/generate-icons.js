const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateIcons() {
  try {
    const svgPath = path.join(__dirname, 'favicon.svg');
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Generate different sizes
    const sizes = [192, 512];
    
    for (const size of sizes) {
      let outputFilename;
      if (size === 192) {
        outputFilename = 'android-chrome-192x192.png';
      } else if (size === 512) {
        outputFilename = 'android-chrome-512x512.png';
      }
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, outputFilename));
      
      console.log(`Generated ${outputFilename}`);
    }
    
    // Also create favicon.ico size
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'favicon-32x32.png'));
    
    console.log('Icon generation complete!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
