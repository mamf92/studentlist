# About the project

This is a simple React project showing basic manipulation of a student list. Sort, filter, and search is combined, in addition to CRUD functionality.

## How to run

You need: Node.js (v16+) and npm (or yarn / pnpm).

Install & run (development):

```bash
git clone https://github.com/mamf92/studentlist.git
cd studentlist
npm install
npm run dev
```

Open the app, typically on http://localhost:5173.

To view on mobile:

```bash
npm run dev -- --host
```

Open the app, typically on http://10.0.0.36:5173/

## Decisions and trade-offs

The app works with a provided example data set, and imports it using a fake API call. The data can be sorted from A - Å and in reverse, and a search field is also provided.

The original data lacked IDs, so an UUID is added to every element on initial load to help later CRUD functionality.

State is passed between the different sections using callback functions. If more pages were added a context would be usefull, and a global state manager like Zustand could be a better option to streamline state and persist management.

Currently, to persist the data on page reload the list is stored in localStorage on every edit and add. In a project with an actual API cached data would be a better solution to limit API calls, and hydrating the page.
