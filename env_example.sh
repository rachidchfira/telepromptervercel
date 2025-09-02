# Professional Voice Teleprompter - Environment Variables
# Copy this file to .env.local for local development
# Set these variables in your Vercel dashboard for production

# ==============================================
# FACEBOOK LIVE INTEGRATION (Required)
# ==============================================
# Get these from: https://developers.facebook.com/
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here

# ==============================================
# YOUTUBE LIVE INTEGRATION (Optional)
# ==============================================
# Get these from: https://console.cloud.google.com/
YOUTUBE_CLIENT_ID=your_google_client_id_here
YOUTUBE_CLIENT_SECRET=your_google_client_secret_here

# ==============================================
# INSTAGRAM LIVE INTEGRATION (Optional)
# ==============================================
# Get these from: https://developers.facebook.com/docs/instagram-basic-display-api
INSTAGRAM_CLIENT_ID=your_instagram_client_id_here
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret_here

# ==============================================
# TIKTOK LIVE INTEGRATION (Optional)
# ==============================================
# Get these from: https://developers.tiktok.com/
TIKTOK_CLIENT_KEY=your_tiktok_client_key_here
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret_here

# ==============================================
# TWITCH INTEGRATION (Optional)
# ==============================================
# Get these from: https://dev.twitch.tv/console/apps
TWITCH_CLIENT_ID=your_twitch_client_id_here
TWITCH_CLIENT_SECRET=your_twitch_client_secret_here

# ==============================================
# GENERAL SETTINGS
# ==============================================
NODE_ENV=production
VERCEL_URL=your-app-name.vercel.app

# ==============================================
# SETUP INSTRUCTIONS
# ==============================================

# 1. FACEBOOK SETUP:
#    - Go to https://developers.facebook.com/
#    - Create new app → Business type
#    - Add Facebook Login product
#    - Add Live Video API permissions
#    - Set OAuth redirect: https://your-domain.vercel.app/auth/facebook/callback
#    - Required scopes: pages_manage_posts, pages_read_engagement, publish_video, pages_show_list

# 2. YOUTUBE SETUP:
#    - Go to https://console.cloud.google.com/
#    - Create new project
#    - Enable YouTube Data API v3
#    - Enable YouTube Live Streaming API
#    - Create OAuth 2.0 credentials
#    - Set redirect URI: https://your-domain.vercel.app/auth/google/callback

# 3. TIKTOK SETUP:
#    - Apply for TikTok Live Access API (invitation only)
#    - Minimum 1000 followers required
#    - Business verification may be required

# 4. INSTAGRAM SETUP:
#    - Instagram Live API is limited availability
#    - Requires Instagram Business Account
#    - May require Facebook Business verification

# 5. TWITCH SETUP:
#    - Go to https://dev.twitch.tv/console/apps
#    - Create new application
#    - Set OAuth redirect: https://your-domain.vercel.app/auth/twitch/callback
#    - Required scopes: channel:manage:broadcast, channel:edit:commercial

# ==============================================
# VERCEL DEPLOYMENT
# ==============================================

# To deploy to Vercel:
# 1. Install Vercel CLI: npm i -g vercel
# 2. Run: vercel --prod
# 3. Set environment variables in Vercel dashboard
# 4. Go to Settings → Environment Variables
# 5. Add each variable above with your actual values

# ==============================================
# DOMAIN CONFIGURATION
# ==============================================

# After deployment, update OAuth redirect URLs in all platforms:
# Facebook: https://your-app.vercel.app/auth/facebook/callback
# Google: https://your-app.vercel.app/auth/google/callback  
# TikTok: https://your-app.vercel.app/auth/tiktok/callback
# Instagram: https://your-app.vercel.app/auth/instagram/callback
# Twitch: https://your-app.vercel.app/auth/twitch/callback