import CredentialsProvider from "next-auth/providers/credentials"
import client from "../../../client"
import bcrypt from 'bcrypt'


const options = {
    
    secret: 'bjjj123',
    pages:{
      "signIn" : '/login'
    },
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: {type: 'string', required: true},
          password: {type: 'string', required: true},
        },
        async authorize(credentials) {
          const query = `*[_type=="user" && email=="${credentials.email}"]`;
          const retrievedUser = await client.fetch(query);
          const user = retrievedUser[0];
          if (!user) {
              return null;
          }
      
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
              return null;
          }
      
          return user;
      },
      }),
    ],
    callbacks: {
      async jwt({token, user}){
        if(user){
          token.name = user.name;
          token.email = user.email;
          token.password = user.password;
        }
        return token;
      },
  
      async session({session, token}){
        if(token){
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.password = token.password;
        }
        return session;
      },
    }
  }

export {
    options,
}
