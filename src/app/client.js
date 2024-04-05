import { createClient } from 'next-sanity';


const client = createClient({
    projectId: 'pjbv0qei',
    dataset: 'production',
    token: 'skC7Y4C56mNBapQpJMKGWgmSn3gTcj4hhSnxeR5FTgESdoxoYGMT12D5JaIDHi3GVQLO83FBDU8rTIj2ppGFjGzRY9jIw6vOlslHXM5evpPWA7oUFhlnpxvzqGfZ6NDmi4fxIj03w3y4C8K29ULYOKXmxTvnHpT3wjzxsIoEH6FQvRBwDkz1',
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    apiVersion: 'v2022-03-07',
});

export default client


