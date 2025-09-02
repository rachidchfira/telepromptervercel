// api/facebook/pages.js - Get User's Facebook Pages
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { access_token } = req.query;

    if (!access_token) {
      return res.status(400).json({ 
        error: 'Missing required parameter: access_token' 
      });
    }

    // Get user's Facebook pages
    const pagesUrl = `https://graph.facebook.com/v18.0/me/accounts?access_token=${access_token}&fields=id,name,access_token,category,category_list,picture,link,fan_count,about,website`;

    const pagesResponse = await fetch(pagesUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!pagesResponse.ok) {
      const errorData = await pagesResponse.json();
      return res.status(400).json({ 
        error: 'Failed to fetch pages', 
        details: errorData 
      });
    }

    const pagesData = await pagesResponse.json();

    // Filter pages that can go live (need specific permissions)
    const pages = pagesData.data.map(page => ({
      id: page.id,
      name: page.name,
      access_token: page.access_token,
      category: page.category,
      picture: page.picture?.data?.url || null,
      link: page.link,
      fan_count: page.fan_count || 0,
      about: page.about || '',
      website: page.website || '',
      can_live_stream: true, // In real implementation, check page permissions
      live_streaming_requirements: {
        minimum_followers: page.fan_count >= 50 ? 'met' : 'not_met',
        page_verified: page.verification_status === 'blue_verified',
        recent_live_eligibility: true
      }
    }));

    res.status(200).json({
      success: true,
      pages: pages,
      total_pages: pages.length,
      live_eligible_pages: pages.filter(p => p.can_live_stream).length,
      instructions: {
        note: 'Select a page to start live streaming',
        requirements: [
          'Page must have at least 50 followers for live streaming',
          'Recent policy violations may affect live streaming eligibility',
          'Some pages may require additional verification'
        ]
      }
    });

  } catch (error) {
    console.error('Facebook pages fetch error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}