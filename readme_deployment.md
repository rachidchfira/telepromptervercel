# Professional Voice Teleprompter

🎬 **Professional voice-controlled teleprompter with social media streaming integration**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/professional-voice-teleprompter)

## 🚀 Quick Deploy to Vercel

### 1. One-Click Deploy
Click the "Deploy with Vercel" button above to deploy instantly.

### 2. Manual Deployment

```bash
# Clone the repository
git clone https://github.com/yourusername/professional-voice-teleprompter.git
cd professional-voice-teleprompter

# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

## 🔧 Environment Variables

Set these in your Vercel dashboard under Settings → Environment Variables:

### Required for Facebook Live Integration:
```env
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
```

### Optional for Other Platforms:
```env
YOUTUBE_CLIENT_ID=your_google_client_id
YOUTUBE_CLIENT_SECRET=your_google_client_secret
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
```

## 📱 Features

### ✨ Core Features
- 🎤 **Voice Control** - Hands-free operation with English/Arabic support
- 📝 **Script Management** - Import, export, save, and auto-sync scripts
- ⚡ **Real-time Updates** - Live text updates and smooth scrolling
- 🪞 **Mirror Mode** - Perfect for front-facing cameras
- 👻 **Transparent Overlay** - OBS and streaming software compatible
- ⛶ **Fullscreen Mode** - Distraction-free presentation view

### 🔴 Live Streaming Integration
- 📺 **YouTube Live** - Direct streaming integration
- 📘 **Facebook Live** - Real OAuth and API integration
- 🎵 **TikTok Live** - Mobile-optimized streaming
- 📷 **Instagram Live** - Stories and IGTV support  
- 🟣 **Twitch** - Gaming and interactive streaming
- 🎛️ **Professional Controls** - RTMP endpoints and stream keys

### 🌍 Multi-Language Support
- 🇺🇸 **English** - Full voice command support
- 🇸🇦 **Arabic** - RTL text support and Arabic voice commands
- 🎯 **Platform Optimization** - Custom themes for each social platform

## 🛠️ Development Setup

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000
```

### Project Structure
```
professional-voice-teleprompter/
├── index.html              # Main teleprompter app
├── package.json             # Project configuration
├── vercel.json             # Vercel deployment config
├── README.md               # This file
└── api/                    # Serverless API functions
    └── facebook/
        ├── token.js        # OAuth token exchange
        ├── live.js         # Create live video
        └── pages.js        # Get user pages
```

## 🔐 Social Media Integration Setup

### Facebook Live Setup
1. **Create Facebook App**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create new app → Business type
   - Add Facebook Login product
   - Add Live Video API

2. **Configure OAuth**
   - Valid OAuth Redirect URIs: `https://yourdomain.vercel.app/auth/facebook/callback`
   - App Domains: `yourdomain.vercel.app`

3. **Required Permissions**
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `publish_video`
   - `pages_show_list`

4. **Set Environment Variables**
   ```env
   FACEBOOK_APP_ID=123456789012345
   FACEBOOK_APP_SECRET=your-secret-key-here
   ```

### YouTube Live Setup
1. **Google Cloud Console**
   - Enable YouTube Data API v3
   - Enable YouTube Live Streaming API
   - Create OAuth 2.0 credentials

2. **Configure OAuth**
   - Authorized redirect URIs: `https://yourdomain.vercel.app/auth/google/callback`

### Other Platforms
Similar setup required for TikTok, Instagram, and Twitch APIs.

## 📊 API Endpoints

### Facebook Integration
- `POST /api/facebook/token` - Exchange OAuth code for access token
- `GET /api/facebook/pages` - Get user's Facebook pages
- `POST /api/facebook/live` - Create live video stream
- `POST /api/facebook/live/[id]/end` - End live stream

### Response Examples

#### Create Live Video
```json
{
  "success": true,
  "liveVideoId": "123456789",
  "streamUrl": "rtmp://live-api-s.facebook.com:80/rtmp/",
  "streamKey": "FB-XXXX-XXXX-XXXX-XXXX",
  "videoUrl": "https://facebook.com/123456789",
  "streamingInstructions": {
    "rtmpUrl": "rtmp://live-api-s.facebook.com:80/rtmp/",
    "streamKey": "FB-XXXX-XXXX-XXXX-XXXX",
    "recommended": {
      "resolution": "1920x1080",
      "framerate": "30fps",
      "bitrate": "4000-6000 kbps"
    }
  }
}
```

## 🎯 Usage Guide

### Basic Operation
1. **Enter Script** - Type or import your script
2. **Select Platform** - Choose YouTube, Facebook, TikTok, Instagram, or Twitch
3. **Configure Settings** - Adjust speed, language, and appearance
4. **Start Voice Control** - Enable hands-free operation
5. **Go Live** - Connect to social media and start streaming

### Voice Commands
**English:**
- "play" / "start" - Begin scrolling
- "pause" / "stop" - Pause scrolling
- "faster" / "slower" - Adjust speed
- "up" / "down" - Manual scroll
- "reset" - Return to beginning
- "mirror on/off" - Toggle mirror mode

**Arabic:**
- "تشغيل" / "ابدأ" - Begin scrolling
- "توقف" / "إيقاف" - Pause scrolling  
- "أسرع" / "أبطأ" - Adjust speed
- "فوق" / "تحت" - Manual scroll
- "إعادة تعيين" - Return to beginning

### Streaming Workflow
1. **Click "Go Live"**
2. **Select Platform** - Choose your streaming platform
3. **Authenticate** - Connect your social media account
4. **Configure Stream** - Set title, description, privacy
5. **Start Streaming** - Get RTMP endpoint and stream key
6. **Use Voice Commands** - Control teleprompter while live

## 🔒 Security & Privacy

- ✅ **HTTPS Only** - Secure connections required
- 🔐 **OAuth 2.0** - Industry-standard authentication
- 🛡️ **CORS Protection** - Cross-origin request security
- 🔑 **Environment Variables** - Secure API key storage
- 📱 **Permissions Policy** - Controlled camera/microphone access

## 📞 Support & Issues

- 📚 **Documentation**: Check this README for setup instructions
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Submit enhancement requests
- 💬 **Community**: Join discussions in GitHub Discussions

## 📄 License

MIT License - see LICENSE file for details.

## 🎬 Perfect For

- 📺 **Content Creators** - YouTube, TikTok, Instagram creators
- 📱 **Live Streamers** - Twitch, Facebook Live broadcasters  
- 🎤 **Public Speakers** - Presentations and speeches
- 📰 **News Anchors** - Professional broadcasting
- 🎓 **Educators** - Online teaching and tutorials
- 🎪 **Event Hosts** - Conferences and live events

---

**Deploy now and start creating professional content with voice-controlled teleprompter technology!** 🚀