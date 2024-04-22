/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'use-credentials',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // add used host
        hostname: 'st3.depositphotos.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
