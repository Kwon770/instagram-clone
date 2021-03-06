# Graphql API

## Send Mail with NodeMailer and SendGrid

### Setup

```bash
$ yarn add nodemailer
$ yarn add nodemailer-sendgrid-transport
```

### Usage

```js
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const sendMail = email => {
  const options = {
    auth: {
      // process.env.SOMETHING : get SOMETHING from .env by dotenv
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "sckwon770@instaclone.com",
    to: address,
    subject: "🔒Login Secret for instagram-clone 🔒",
    html: `Hello! Your login secret it ${secret}.<br/>Copy and Paste on the app/website to log in`
  };
  return sendMail(email);
};
```

```env
# .env

SENDGRID_USERNAME=""
SENDGRID_PASSWORD=""
```

## Manage Token with PassportJS

[Passport Web](http://www.passportjs.org/packages/passport-jwt/)

### Setup (Using JWT)

```bash
$ yarn add passport passport-jwt
```

```js
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
```

### Usage

```env
# .env
JWT_SECRET=""
```

```js
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // The parameter string to encrypt
  secretOrKey: process.env.JWT_SECRET
};

// payload is an object containing the decoded JTW
// done is the fuction what will be executed when we found user
// done(error, user)
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    // user !== null : found user
    if (user !== null) {
      return done(null, user);
    }
    // done(error, user)
    else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new Strategy(jwtOptions, verifyUser));
```

## Generate JWT Token with JsonWebToken

[Document from NPM](https://www.npmjs.com/package/jsonwebtoken)

### Setup & Usage

```bashh
$ yarn add jsonwebtoken
```

```js
import jwt from "jsonwebtoken";
export const GenerateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
```

## Server Flow

**server.js** <br>
서버에 전잘되는 모든 요청은 server.press.use()로 등록된 autheniticateJwt() 함수(미들웨이) 통과 <br>
-> <br>
**passport.js** <br>
authenticateJwt() 에서 passport.authenticate("jwt", _, _) \<첫번째 인자> 실행 <br>
-> <br>
passport.use(new Strategy(jwtOptions, verifyUser)) 으로 토근 추출 <br>
-> <br>
토근이 추출되면 verifyUser가 payload와 함께 실행 -> payload는 토큰에서 해석된 id를 받아서 user를 찾고 리턴 <br>
-> <br>
passport.authenticagte(_, _, (error, user)=>{ ... }) \<세번째 인자> 실행 <br>
콜백 함수가 실행되서 사용자가 있으면 requestDP user추가 <br>
-> <br>
**server.js** <br>
const server = new GraphQlServer({\_, contest: ({requesr} : {request})}) <br>
context에 request를 담음 (request에 관련되 작업이므로) <br>

## Prisma Grammer

**! You can find a lot of function which is made automatically according to Data-Model !**
**! You can use them. Check From Playground !**

```js
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { following: { connect: { id } } }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
```

```js
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { following: { disconnect: { id } } }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
```

## Return promise from Resolver

promise 를 return 과 함께 수행할시 마지막 statement이므로, 서버에서 자동으로 resolve 되서 결과가 전달되기를 기다림

```js
export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      // ~~
      // ~~
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });
    }
  }
};
```

```js
export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      // ~~
      // ~~
      const user = await prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });
      return user;
    }
  }
};
```

## Using Fragment

[Why we should use `$fragment`](https://github.com/Kwon770/instagram-clone/blob/master/document/basic-prisma.md#fragment-for-prevent-error)

**If you will request data in data of data, you must use**

This is the Query you must handle. It request userName in user of comments.

```
{
  seeFullPost(id: "ck7v25ea22vhu0981qbc4qdv2") {
    post {
      location
    }
    comments {
      id
      text
      user {
        userName
      }
    }
    likeCount
  }
}
```

```js
// fragment.js
export const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment {
        id
        text
        user {
            userName
        }
    }
`;
```

```js
export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post({ id });
      const comments = await prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT); // FRAGMENT
      const likeCount = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return {
        post,
        comments,
        likeCount
      };
    }
  }
};
```

## Computed Field in Prisma

Computed Field is the virtual field what is computed. There is no computed field in the DB.

### Usage

1. Add a field in DataModel of graphql __(NOT DATAMODEL OF PRISMA)__
2. Add a resolver __(It doesn't matter where you add it. The schema will combine all resolver at once)__

### Example

fullName is the computed field

```graphql
type User {
  firstName: String
  lastName: String
  fullName: String
}
```

Because me and user resolver will do the authenticated method, fullName field don't have to do it.

So fullName only need a parent parameter `(_, __, {request})` => `(_)` => `(parent)`

```js
// me.js

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      //  return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
      return {
        user: userProfile,
        posts
      };
    }
  },
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    }
  }
};
``` 

parent parameter is the resolver what call fullName, computed field.

In this case, parent is the user in me resolver
```
{
  me {
    user {
      fullName
    }
  }
}
```

In this case, parent is the user in seeUser resolver
```
{
  seeUser(id: "~~~") {
    user {
      fullName
    }
  }
}
```