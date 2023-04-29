import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { EdenClient } from 'eden-sdk';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authToken = req.session.token;
  const { balance } = req.body;
  const allowedUsers = null;

  const eden = new EdenClient();
  const apiUrl = eden.getApiUrl();

  if (!authToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await fetch(`${apiUrl}/user/manna/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({balance}),
    });    
    if (response.ok) {
      const edenResponse = await response.json();
      return res.status(200).json(edenResponse);
    } 
    else {
      return res.status(500).json({ error: "Error creating manna" });
    }
  } 
  catch (error: any) {
    return res.status(500).json({error: error.message});
  }
};

export default withSessionRoute(handler);
