
import React, { FC } from 'react'
import Head from 'next/head'

interface Props {
    title: string;
    pageDescription: string;
    imageFull: string;
    children: React.ReactNode;
}

export const ShopLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <nav>
                {/* TODO: Navbar */}
            </nav>


            {/* TODO: sidebar */}

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
