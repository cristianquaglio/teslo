import { dbUsers } from '@/database';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { signIn } from 'next-auth/react';
import { jwt } from '@/utils';

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: {
                    label: 'Correo',
                    type: 'email',
                    placeholder: 'tucorreo@algo.com',
                },
                password: {
                    label: 'Clave',
                    type: 'password',
                    placeholder: '123456',
                },
            },
            async authorize(credentials) {
                return await dbUsers.checkUserEmailPassword(
                    credentials!.email,
                    credentials!.password,
                );
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],

    // Custom pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    jwt: {},

    session: {
        maxAge: 2592000, // 30d
        strategy: 'jwt',
        updateAge: 86400, // 1d
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser(
                            user?.email || '',
                            user?.name || '',
                        );
                        break;
                    case 'credentials':
                        token.user = user;
                        break;
                }
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.user = token.user as any;
            return session;
        },
    },
};

export default NextAuth(authOptions);
