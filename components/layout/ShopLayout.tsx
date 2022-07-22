
import React, { FC } from 'react'
import Head from 'next/head'
import { Navbar, SideMenu } from '../ui';

interface Props {
    title: string;
    pageDescription: string;
    imageFull?: string;
    children: React.ReactNode;
}

export const ShopLayout: FC<Props> = ({ title, pageDescription, imageFull, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={pageDescription} />
                {
                    imageFull && (<meta property="og:image" content={imageFull} />)
                }
            </Head>
            <nav>
                <Navbar />
            </nav>
            <SideMenu />
            <main
                style={{
                    margin: '80px auto',
                    maxWidth: '1440px',
                    padding: '0px 30px',
                }}
            >
                {children}
            </main>
            <footer>
                {/* footer */}
            </footer>
        </>
    )
}
