const { spawn } = require('child_process');

console.log('Starting Expo build process...');

const expo = spawn('npx', ['expo', 'start', '--verbose'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

expo.on('error', (error) => {
  console.error('Error starting Expo:', error);
});

expo.on('close', (code) => {
  console.log(`Expo process exited with code ${code}`);
});