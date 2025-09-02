// api/facebook/token.js - Facebook OAuth Token Exchange
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
    const { code, redirect_uri } = req.body;

    if (!code || !redirect_uri) {
      return res.status(400).json({ error: 'Missing required parameters: code, redirect_uri' });
    }

    // Environment variables needed (set in Vercel dashboard):
    const clientId = process.env.FACEBOOK_APP_ID;
    const clientSecret = process.env.FACEBOOK_APP_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'Missing Facebook app credentials. Please set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET in Vercel environment variables.'
      });
    }

    // Exchange authorization code for access token
    const tokenUrl = 'https://graph.facebook.com/v18.0/oauth/access_token';
    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirect_uri,
      code: code
    });

    const tokenResponse = await fetch(`${tokenUrl}?${tokenParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      return res.status(400).json({ 
        error: 'Token exchange failed', 
        details: errorData 
      });
    }

    const tokenData = await tokenResponse.json();

    // Get long-lived access token
    const longLivedUrl = 'https://graph.facebook.com/v18.0/oauth/access_token';
    const longLivedParams = new URLSearchParams({
      grant_type: 'fb_exchange_token',
      client_id: clientId,
      client_secret: clientSecret,
      fb_exchange_token: tokenData.access_token
    });

    const longLivedResponse = await fetch(`${longLivedUrl}?${longLivedParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const longLivedData = await longLivedResponse.json();

    res.status(200).json({
      access_token: longLivedData.access_token || tokenData.access_token,
      token_type: tokenData.token_type || 'bearer',
      expires_in: longLivedData.expires_in || tokenData.expires_in,
      scope: tokenData.scope
    });

  } catch (error) {
    console.error('Facebook token exchange error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}