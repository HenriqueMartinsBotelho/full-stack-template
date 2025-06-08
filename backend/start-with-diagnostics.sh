#!/bin/bash

# Backend Diagnostics Script
echo "🔍 Backend Diagnostics Starting..."
echo "================================="

# Check Node.js version
echo "📋 Node.js version:"
node --version

# Check npm version
echo "📋 NPM version:"
npm --version

# Check if port is available
echo "🔌 Checking if port 3004 is available:"
if netstat -tuln | grep :3004; then
    echo "❌ Port 3004 is already in use"
    echo "📋 Processes using port 3004:"
    lsof -i :3004 || echo "lsof not available"
else
    echo "✅ Port 3004 is available"
fi

# Check if port 4003 is available (default port)
echo "🔌 Checking if port 4003 is available:"
if netstat -tuln | grep :4003; then
    echo "❌ Port 4003 is already in use"
    echo "📋 Processes using port 4003:"
    lsof -i :4003 || echo "lsof not available"
else
    echo "✅ Port 4003 is available"
fi

# Check environment variables
echo "🔧 Environment Variables:"
echo "NODE_ENV: ${NODE_ENV:-'not set'}"
echo "PORT: ${PORT:-'not set (will default to 4003)'}"
echo "HOST: ${HOST:-'not set (will default to 0.0.0.0)'}"
echo "DATABASE_URL: ${DATABASE_URL:+'set'}"

# Check if dependencies are installed
echo "📦 Checking dependencies:"
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
else
    echo "❌ node_modules directory not found"
    echo "🔧 Running npm install..."
    npm install
fi

# Check if dist directory exists (for production)
echo "📦 Checking build output:"
if [ -d "dist" ]; then
    echo "✅ dist directory exists"
else
    echo "❌ dist directory not found"
    echo "🔧 Running build..."
    npm run build
fi

# Check system resources
echo "💻 System Resources:"
echo "Memory usage:"
free -h || echo "free command not available"
echo "Disk usage:"
df -h . || echo "df command not available"

# Check firewall status (if available)
echo "🔥 Firewall Status:"
if command -v ufw &> /dev/null; then
    sudo ufw status
elif command -v iptables &> /dev/null; then
    echo "iptables rules (first 10):"
    sudo iptables -L | head -10
else
    echo "No firewall tools detected"
fi

# Network connectivity test
echo "🌐 Network Connectivity:"
echo "Testing external connectivity:"
curl -s --max-time 5 https://google.com > /dev/null && echo "✅ External connectivity OK" || echo "❌ External connectivity failed"

echo "================================="
echo "🚀 Starting backend with logging..."

# Set environment variables for better logging
export NODE_ENV=${NODE_ENV:-development}
export PORT=${PORT:-3004}
export HOST=${HOST:-0.0.0.0}

# Start the application
npm run start:dev
