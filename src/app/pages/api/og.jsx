import { ImageResponse } from 'next/og';
import { Parser, fromURL } from '@asyncapi/parser';
import { parse as urlParse } from 'url';

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb', // Adjust size limit as needed
      },
    },
  };
  
  // Example of handling a POST request
  export async function POST(req, res) {
    try {
      const { base64Url } = req.body;
      if (base64Url) {
        // Decode the base64 URL and process it
        const decodedUrl = Buffer.from(base64Url, 'base64').toString('utf-8');
        // Your logic for using decodedUrl with AsyncAPI parser and generating an image
  
        // Placeholder for sending an image response
        res.setHeader('Content-Type', 'image/png');
        res.status(200).send("Placeholder image data");
      } else {
        res.status(400).json({ error: 'Base64 data is missing from the request body' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  