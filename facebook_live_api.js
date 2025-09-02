// api/facebook/live.js - Facebook Live Video Creation
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pageId, pageAccessToken, title, description, privacy = 'EVERYONE' } = req.body;

    if (!pageId || !pageAccessToken || !title) {
      return res.status(400).json({ 
        error: 'Missing required parameters: pageId, pageAccessToken, title' 
      });
    }

    // Create live video on Facebook
    const liveVideoUrl = `https://graph.facebook.com/v18.0/${pageId}/live_videos`;
    
    const liveVideoData = {
      title: title,
      description: description || '',
      privacy: privacy,
      status: 'LIVE_NOW',
      access_token: pageAccessToken
    };

    const liveResponse = await fetch(liveVideoUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(liveVideoData)
    });

    if (!liveResponse.ok) {
      const errorData = await liveResponse.json();
      return res.status(400).json({ 
        error: 'Failed to create live video', 
        details: errorData 
      });
    }

    const liveData = await liveResponse.json();

    // Return streaming details
    res.status(200).json({
      success: true,
      liveVideoId: liveData.id,
      streamUrl: liveData.stream_url,      // RTMP endpoint
      streamKey: liveData.stream_key,      // Stream key
      videoUrl: `https://facebook.com/${liveData.id}`,
      embedUrl: liveData.embed_html || null,
      status: 'LIVE_NOW',
      created_time: new Date().toISOString(),
      
      // Instructions for streaming
      streamingInstructions: {
        rtmpUrl: liveData.stream_url,
        streamKey: liveData.stream_key,
        recommended: {
          resolution: '1920x1080',
          framerate: '30fps',
          bitrate: '4000-6000 kbps',
          encoder: 'x264',
          keyframeInterval: 2
        },
        software: [
          'OBS Studio (recommended)',
          'XSplit',
          'Wirecast',
          'FFmpeg',
          'Browser-based streaming'
        ]
      }
    });

  } catch (error) {
    console.error('Facebook live video creation error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}