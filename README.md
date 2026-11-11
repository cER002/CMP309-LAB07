# CMP309 - Assignment 7

## File Organization

```text

/src
├── /api
│   ├── authApi.js          —> Mock authentication api
│   └── productsApi.js      —> fetch api layer
├── App.css                 —> app styling
├── App.jsx                 —> root component
├──/components
│   ├── Layout.jsx          —> main layout
│   ├── NavBar.jsx          —> navigation bar
│   ├── ProductCard.jsx     —> single product on product list
│   └── ProtectedRoute.jsx  —> login redirect for cart
├──/context
│   └── AuthContext.jsx     —> context provider for authentication
├──/hooks
│   ├── useFetch.js         —> custom fetch hook with states
│   └── useLocalStorage.js  —> custom hook for presistent storage 
├── index.css               —> default styling
├── main.jsx                —> entry point
├──/pages
│   ├── Cart.jsx            —> user cart page
│   ├── Home.jsx            —> user home page
│   ├── Login.jsx           —> user login page
│   ├── NotFound.jsx        —> Not found page for bad URL's
│   ├── ProductDetail.jsx   —> a products own page
│   └── ProductList.jsx     —> a parent component that lists all products as product cards
└──/store
    └──  cartStore.js       —> zustand store for frequently changing values

```

## Reasoning Questions

### Q1

- **User**: `reducer` state in context, because it rarely changes and needs to be distributed among distant components
- **Cart**: In zustand store, because it is a frequently changing value many components read it, and selectors keeps the re-renders small
- **Filter values**: In URL, they survive refreshes, are more sharable, also works with a back button
- **Product list**: `useFetch` state in product list, only product list requires the full list of products and derives values from it
- **Theme**: `useLocalStorage` state in layout, it is passed down as prop because component state isn't shared down by default

### Q2

- When context changes it triggers a render on all consumers, while with store only components whose subscribed slice change are rendered again. If they were swapped any change in card would re-render all consumers regardless of what changed  within card.
- Context is meant for values that change rarely and shared among distant components. If they were swapped useAuth wouldnt be able check that its within the provider range (even though the context provider here covers all App)
- It would still work albeit less effcient

### Q3

- `useFetch` deliberately shares the same reducer, abort cleanup, loading/data/error state logic between the components, but not the state itself, 2 components that call it will have 2 different states

### Q4

- `useParams` return an object whose fields are just strings, would have mattered if it was being compared to other data types

```jsx
    const params = useParams()
    const id = params.id
    const fetchState = useFetch((signal) => fetchProduct(id, signal), [id])
```

### Q5

- the credential check runs in the browser, with JS the user can easily inspect and modify how they want. An external server could check the creds and issue a session token, then checks the token every time protected data is being accessed.  the mock api in this assignment does nothing to actually protect anything only simulates a latency while logging in. The client side protection here is only for UX, the data itself must be withheld by the server

### Q6

- On reload browser would request the path `/product/3` from the server and it fail because the file doesn't exist there, vite is able to overcome it with SPA fallback, it serves index.html for paths that aren't a real file. A static file sever would need rewrite/fallback rules to serve index.html

## Self-Study

- **Query params**: I used `URLSearchParams(...)` object and the functional form to get the old parameters and update them according to the new values from the event
- **Safe local storage**: on initial creation, loadCart uses `Array.isArray(...)` to check if the stored value is a valid array, however this approach cannot check if the value in the array is still valid
- **Theming**: descendant selectors like `.dark a` will reach correct children on the element with `.dark` property

## Challenges Faced

- Mixup with named and default exports (an AuthContext import crash)
- `createContext(...)` not in top-level
- Double `<BrowserRouter>` causing crashes
- controlled input and form flow
- immutable updates with spread instead of ++
- abort controller inside the effect
- `useFetch` dependency array loops
- `fetchProduct` needs signal and id, but `useFetch` passes only the signal so used functional form
- pathless layouts
