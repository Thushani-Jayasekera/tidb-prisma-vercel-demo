FROM node:18-alpine

RUN apk update \
	&& apk add --no-cache openssl\
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/cache/apk/*
    
RUN npm install -g pnpm
WORKDIR /app        
COPY . .

ENV npm_config_cache=/app

RUN if [ -f "./package-lock.json" ]; then npm install; \
    elif [ -f "./yarn.lock" ]; then yarn; \           
    elif [ -f "./pnpm-lock.yaml" ]; then pnpm install;fi

COPY . .

# RUN npx eslint src
RUN npx prisma generate
RUN npm run build

RUN chown -R 10500:10500 "/app"

USER 10500

EXPOSE 3000

CMD [ "npm", "start" ]
