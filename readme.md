### MODULE
- npm i -g typescript
- npm i -g -D pm2
- npm i 
- npm i -D typescript @type/node @types/express @types/dotenv @type/ts-node-dev
- npm install -g ts-node@latest
### ERROR
- ts.Debug.assert(typeof typeReferenceDirectiveName === "string", "Non-string value passed to `ts.
    - npm install -g ts-node@latest
### CONFIG
- mkdir src
- mkdir dist
- tsc --init (tsconfig.json)
- debug mode > create file > select <node> 
### RUN
- command palette > build task > watch tsconfig
- pm2-dev expressJS.js
- terminal > ...\src> npx tsc    (run all tsc files and store js files to /dist) Option
- terminal > ...\src> tsc   (run tsc files and store js files in same folder) Option
- terminal > ...\src> ts-node index.ts  ( run only the ts file and do not transpire JS file)
- terminal > ...\src> npm run dev