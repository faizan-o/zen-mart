import { NextResponse } from "next/server";
import client from '../../client';
import bcrypt from 'bcrypt'

export async function POST(req) {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 5);
    const users = await client.fetch(`*[_type == "user" && (name == "${name}" || email == "${email}")]`);
    const token = 'skC7Y4C56mNBapQpJMKGWgmSn3gTcj4hhSnxeR5FTgESdoxoYGMT12D5JaIDHi3GVQLO83FBDU8rTIj2ppGFjGzRY9jIw6vOlslHXM5evpPWA7oUFhlnpxvzqGfZ6NDmi4fxIj03w3y4C8K29ULYOKXmxTvnHpT3wjzxsIoEH6FQvRBwDkz1';
    const createSanityDocument = async () => {
        try {
            const res = await fetch(`https://pjbv0qei.api.sanity.io/v1/data/mutate/production`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
                body: JSON.stringify({
                    "mutations": [
                      {
                        "create": {
                          "_type": "user",
                          name,
                          email,
                          password: hashedPassword
                        },
                      },
                    ],
                })                
            });
            if (res.ok) {
                return NextResponse.json({ message: 'User created successfully.' }, { status: 200 });
            } else {
                const err = await res.json();
                return NextResponse.json({ message: err.message }, { status: 400 });
            }
        } catch(err) {
            const message = err.message;
            return NextResponse.json({ message: message }, { status: 400 });
        }
    }  
    if (users.length > 0) {
        return NextResponse.json({ message: 'The Email Or Username Already Exists.' }, { status: 400 });
    }
    return createSanityDocument();
}
