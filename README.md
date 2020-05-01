# 미국개미 백엔드

## Local에서 실행하기

1.  postgre DB와 Prisma Client 실행
```
docker-compose up -d
```
2.  패키지 설치하기
```
yarn add
```
3.  DB에 prisma schema migration하기
```
prisma deploy
```
4.  graphql-yoga 실행하기
```
yarn start
```
5. .env 추가하기
prisma 폴더 내에 `.env` 파일 추가
src 폴더 내에 `.env` 파일 추가
