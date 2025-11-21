import '@/styles/globals.css';
import '@/styles/sydsoft.css';

import { Metadata } from 'next';
import { ReduxProvider } from './providers';
import { withBasePath } from '@/_lib/publicAsset';

export const metadata: Metadata = {
    title: 'sydSOFT Bilişim Hizmetleri'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="tr">
            <head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no" />
                <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=Material+Icons|Lato:400,400i|Roboto:300,400,500,700&display=swap`} />
                {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLEANALYTICS}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', '${process.env.GOOGLEANALYTICS}');`
                    }}
                /> */}

                <link rel="favicon shortcut icon" href={withBasePath('/images/favicon.png')} />
                <link rel="manifest" href={withBasePath('/site.webmanifest')} />

                <meta name="robots" content="all, index, follow" />
                <meta name="author" content="izzetseydaoglu" />
                <meta name="copyright" content="sydsoft.com.tr" />
                <meta name="distribution" content="Global" />
            </head>
            <body>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
