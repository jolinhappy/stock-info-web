# Stock Info Web
以React＋TypeScript搭配finmind API開發的股票基本資料查詢頁面。

## 網站功能
- 使用者可以透過股票名字或股票代號取得股票相關資訊(目前只能查詢台股)。
- 使用者可以查看三年、五年、十年的月營收資訊圖表。
- 使用者可以確認到近六個月的月營收及月營收年增率。

## 待完成/優化項目
- 月營收年增率的線圖。
- error handle。
- race condition的狀況。

## 專案畫面
![](https://imgur.com/uYPGMSa.png)

## 安裝/啟動方式

```
yarn
```
```
yarn start
```

## 環境建置與需求
- react: v18.2.0,
- react-router-dom: v6.22.0,
- typescript: v4.9.5,
