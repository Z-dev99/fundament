/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "147.45.68.231",
                port: "9000",
                pathname: "/img/**",
            },
        ],
    },
};

export default nextConfig;
