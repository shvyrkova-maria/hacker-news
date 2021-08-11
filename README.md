# hacker-news

Develop an app which makes a request to any of provided api and lists the result as a table of 3 columns:
time added, title and domain

- create a project without CRA (create-react-app)
- use React Hooks
- you can use 1 helper library besides react
- use any flux-like state management strategy(useReducer hook, flux utilities, context)
- table headers should be clickable and should sort the entries by according column
- upon reaching end of page load new entries using pagination api (inifinity scroll)
- entry should be clickable and should lead to HackerNews comments(link)
- implement mobile version which consists of entry title column only (fills screen completely) and has floating sort by date button
- make table adaptive: breakline entries, truncate by ellipsis any overflow that doesn't fit into 3 lines
- implement the same functionality for other list (news if you implemented newest, newest otherwise,etc.), add ability to transition between lists
- deploy app(Netlify, Vercel, GH Pages etc.)

### Dev

Запустить режим разработки

```shell
npm start
```

Во вкладке браузера перейти по адресу
[http://localhost:8081](http://localhost:8081)

### Building

Для того чтобы создать оптимизированные файлы для хостинга

```shell
npm run build
```

### Deploying/Publishing

```shell
npm run deploy
```

### Adaptive breakpoints

mobile 420
tablet 768
desktop 1200
