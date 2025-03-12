import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import getDomain from '@/helpers/getDomain';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const referrer = req.headers.get("referer") || "";
  const ip = req.headers.get("x-forwarded-for") || "Unknown IP";
  // console.log("User IP Address:", ip);

  // Handle robots.txt dynamically
  if (pathname === "/robots.txt") {
    const domain = await getDomain();
    
    try {
      const response = await fetch(req.url);
      let originalRobotsTxt = await response.text();

      // Ensure robots.txt doesn't duplicate comments
      if (!originalRobotsTxt.includes("#")) {
        const comments = [
          `Robots.txt file for https://${domain}`,
          `Generated on: ${new Date().toUTCString()}`,
          "All robots are welcome to crawl our site",
          "Disallowed paths are restricted for privacy and security reasons",
          "Please respect these rules and happy crawling!",
        ];

        const commentString = comments.map((c) => `# ${c}`).join("\n");
        originalRobotsTxt = `${commentString}\n\n${originalRobotsTxt}`;
      }

      return new NextResponse(originalRobotsTxt, {
        status: 200,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } catch (error) {
      console.error("Error fetching robots.txt:", error);
      return new NextResponse("Error fetching robots.txt", { status: 500 });
    }
  }

  // Store referrer in cookies (if available)
  const response = NextResponse.next();

  if (referrer) {
    response.cookies.set("referrer", referrer, { path: "/" });
  }

  if (ip) {
    response.cookies.set("ip", ip, { path: "/" });
  }

  // Set response headers (for debugging purposes)
  response.headers.set("X-User-IP", ip);
  response.headers.set("X-Referrer", referrer);
  response.headers.set("X-Current-Path", pathname);

//   console.log("Referrer:", referrer);
//   console.log("Current Path:", pathname);

  return response;
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};


// export const config = {
//     matcher: ['/', '/about', '/shop', '/robots.txt'], // Added '/robots.txt' to the existing matchers
// };

