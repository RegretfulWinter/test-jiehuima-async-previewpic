import { ImageResponse } from 'next/og';
import { Parser, fromURL } from '@asyncapi/parser';

 
export const runtime = 'nodejs';
 
export async function GET(request) {
    
  try {
    
    const { searchParams } = new URL(request.url);
    let base64UrlValue = searchParams.get('base64Url');
    if (!base64UrlValue) {
      base64UrlValue = 'https://testjiehuimaasyncapi.netlify.app/?base64=' + searchParams.get('base64');
    }
    console.log("searchParams:", { searchParams })
    const parsedUrl = new URL(base64UrlValue);
    const base64Value = parsedUrl.searchParams.get('base64');
    console.log(base64Value);
    const parser = new Parser();
    const title = Buffer.from(base64Value, 'base64').toString('utf-8');
    console.log("title:",title);
    const { document } = await parser.parse(title);
    let mode = document.json();
    const header = mode.info.title + " " + mode.info.version;
    if (document) {
        console.log(document);
      }
    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'white',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
            }}
          >
            <img
              alt="AsyncAPI"
              height={200}
              src="https://svgshare.com/i/dNo.svg"
              style={{ margin: '0 30px' }}
              width={300}
            />
          </div>
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'black',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {header}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new ImageResponse(
        (
          <div
            style={{
              backgroundColor: 'white',
              backgroundSize: '150px 150px',
              height: '100%',
              width: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
            >
              <img
                alt="AsyncAPI"
                height={200}
                src="https://svgshare.com/i/dNo.svg"
                style={{ margin: '0 30px' }}
                width={300}
              />
            </div>
            <div
              style={{
                fontSize: 60,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                color: 'black',
                marginTop: 30,
                padding: '0 120px',
                lineHeight: 1.4,
                whiteSpace: 'pre-wrap',
              }}
            >
              "Welcome to AsyncAPI"
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        },
      );
  }
}