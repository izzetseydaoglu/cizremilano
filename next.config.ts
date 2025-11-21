import type { NextConfig } from 'next';
import WebpackObfuscator from 'webpack-obfuscator';

const deploymentPath = '/_qrMenuSiteleri/cizremilano';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
    //Static HTML export ayarları
    output: 'export', // <--- asıl kilit ayar bu!
    images: {
        unoptimized: true // next/image hatası almamak için
    },
    assetPrefix: isProd ? deploymentPath : undefined,
    basePath: isProd ? deploymentPath : undefined,
    trailingSlash: true, // her sayfa / ile bitsin (dosya sistemi için güvenli)
    // Static HTML export ayarları sonu

    reactStrictMode: false,
    devIndicators: false,
    env: {
        // NEXT_PUBLIC_ ile başlayan değişkenler client tarafında da erişilebilir
        DEVKEY: 'qrmenusistemidevkey.',
        GOOGLEANALYTICS: 'G-WX09GT859K',
        NEXT_PUBLIC_GOOGLE_API_KEY: 'AIzaSyANZ2JSpDv7ibLKSZDROtIJ4j0KDOUrXV8',
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: '169966473024-u51dtev7ao0u198s8h93c31hre2806ot.apps.googleusercontent.com',
        NEXT_PUBLIC_BASE_PATH: isProd ? deploymentPath : ''
    },
    compiler: {
        styledComponents: true,
        removeConsole: {
            exclude: ['error']
        }
    },
    // e-udf için production'da source maps'i kapat; hata izleme istiyorsan upload et
    productionBrowserSourceMaps: false, // üretimde source-map bırakma
    // performans / gzip
    compress: true,

    // production'da 'X-Powered-By' header'ını kaldır, NextJS kullanıldığını gizle
    poweredByHeader: false,

    webpack: (config, { dev, isServer }) => {
        // sadece production client bundle'a uygula
        // if (dev) {
        if (!dev && !isServer) {
            config.plugins.push(
                new WebpackObfuscator(
                    {
                        sourceMap: false,
                        compact: true,
                        controlFlowFlattening: false,
                        deadCodeInjection: true,
                        debugProtection: false,
                        debugProtectionInterval: 0,
                        disableConsoleOutput: true,
                        identifierNamesGenerator: 'mangled-shuffled',
                        log: false,
                        numbersToExpressions: false,
                        renameGlobals: true,
                        selfDefending: true,
                        simplify: true,
                        splitStrings: false,
                        stringArray: true,
                        stringArrayCallsTransform: true,
                        stringArrayCallsTransformThreshold: 0.5,
                        stringArrayEncoding: [],
                        stringArrayIndexShift: true,
                        stringArrayRotate: true,
                        stringArrayShuffle: true,
                        stringArrayWrappersCount: 1,
                        stringArrayWrappersChainedCalls: true,
                        stringArrayWrappersParametersMaxCount: 2,
                        stringArrayWrappersType: 'variable',
                        stringArrayThreshold: 0.75,
                        unicodeEscapeSequence: false
                    },
                    // exclude patterns: Next.js runtime ve vendor dosyalarını gizleme
                    ['**/_next/static/chunks/**', '**/_next/static/runtime/**', '**/node_modules/**']
                )
            );
        }

        return config;
    },
    turbopack: {} // boş bile olsa uyarıyı susturur
};

export default nextConfig;
