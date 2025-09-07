# 🚀 Quick Deployment Guide - Vercel + Railway

## Backend Deployment (Railway)

### 1. Prepare Railway Deployment
1. Go to [Railway.app](https://railway.app) and sign up
2. Connect your GitHub account
3. Create new project from GitHub repo: `divya4234/CampusOS`
4. Set root directory to `backend`

### 2. Configure Environment Variables in Railway
In Railway dashboard, add these environment variables:

```bash
# Required for production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/campusos
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app

# Optional
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
OPENAI_API_KEY=your-openai-api-key
```

### 3. Railway Auto-Deploy
- Railway will automatically detect Node.js and run `npm start`
- Your backend will be available at: `https://your-app-name.up.railway.app`

## Frontend Deployment (Vercel)

### 1. Prepare Vercel Deployment
1. Go to [Vercel.com](https://vercel.com) and sign up
2. Import project from GitHub: `divya4234/CampusOS`
3. Set root directory to `frontend`
4. Framework preset: Vite (auto-detected)

### 2. Configure Environment Variables in Vercel
In Vercel dashboard > Settings > Environment Variables:

```bash
# Required for production
VITE_API_URL=https://your-railway-app.up.railway.app/api
VITE_NODE_ENV=production

# Optional features
VITE_USE_MOCK_AI=false
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_ENABLE_CHATBOT=true
VITE_CAMPUS_NAME=CampusOS
```

### 3. Deploy
- Click "Deploy" - Vercel will automatically build and deploy
- Your frontend will be available at: `https://your-app-name.vercel.app`

## Quick Setup Checklist

### Prerequisites
- [ ] MongoDB Atlas account (for database)
- [ ] Railway account
- [ ] Vercel account
- [ ] OpenAI API key (optional, for chatbot)

### Backend (Railway) - 5 minutes
- [ ] Create Railway project from GitHub
- [ ] Set root directory to `backend`
- [ ] Add environment variables (especially MONGO_URI and JWT_SECRET)
- [ ] Deploy automatically

### Frontend (Vercel) - 3 minutes
- [ ] Create Vercel project from GitHub
- [ ] Set root directory to `frontend`
- [ ] Add VITE_API_URL with your Railway backend URL
- [ ] Deploy automatically

### Post-Deployment
- [ ] Test login/register functionality
- [ ] Verify API calls work between frontend and backend
- [ ] Test chatbot (if OpenAI key is configured)
- [ ] Check browser console for any errors

## Environment URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### Production
- Frontend: https://your-app-name.vercel.app
- Backend: https://your-app-name.up.railway.app

## Troubleshooting

### Common Issues
1. **CORS Error**: Update CORS_ORIGIN in Railway with your Vercel URL
2. **Database Connection**: Verify MONGO_URI in Railway settings
3. **API Calls Failing**: Check VITE_API_URL in Vercel settings
4. **Build Failures**: Check build logs in respective dashboards

### Quick Fixes
- Always use HTTPS URLs in production environment variables
- Ensure environment variables are set in both platforms
- Check that root directories are correctly set
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

## Notes
- Vercel automatically handles HTTPS and CDN
- Railway automatically handles scaling and monitoring
- Both platforms support automatic deployments on git push
- Free tiers are sufficient for development and small-scale production
