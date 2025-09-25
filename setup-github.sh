#!/bin/bash

# GitHub Setup Script for CivicLinkMVP
# Run this script to set up the repository for GitHub

echo "🚀 Setting up CivicLinkMVP for GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial project setup with developer assignments and zero merge conflicts"

echo "✅ Local git repository ready!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub.com"
echo "2. Copy the repository URL"
echo "3. Run these commands:"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git push -u origin main"
echo ""
echo "🎯 Each developer should then:"
echo "1. Clone the repository"
echo "2. Create their feature branch"
echo "3. Start developing their assigned features"
echo ""
echo "📖 See docs/GITHUB_SETUP.md for complete instructions"
