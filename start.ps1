# Start server
cd .\server\
Start-Process npm start
cd ..

# Start client
cd .\client\
Start-Process npx 'vite --host'
cd ..