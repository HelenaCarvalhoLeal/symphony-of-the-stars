# Symphony Of The Stars

We are all frequency

Our project brings inclusion to blind and visually impaired people.

It also educates through detailed image information, whose images the user can drag and drop to listen. Furthermore, our project tells the story of the James Webb telescope from its mission, discoveries and future perspectives.

In this synesthesia of senses, what emotion or sensation does the image provoke in you? Vastness, wonder, excitement, curiosity or something else?

Now try our final project, close your eyes and listen.

Thanks.

## Packages

### ReactJS
###
```
axios = "^1.7.7"
```

### Rust
###
```
wasm-bindgen = "0.2.93"
image = "0.23.14"
rand = "0.8.5"
hound = "3.4.0"
getrandom = { version = "0.2", features = ["js"] }
```

### Usage

#### To compile Rust language code to WebAssembly:

```
If you haven't yet: cargo install wasm-bindgen-cli

Build: cargo build --target wasm32-unknown-unknown --release

Build to WebAssembly: wasm-bindgen target/wasm32-unknown-unknown/release/wasm.wasm --out-dir ./pkg --target web

```

#### To start the project, use the command: `npm start`

#### To build: `npm run dev`

Links: 
- https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/allfrequency/?tab=details
- https://www.youtube.com/watch?v=kFvFFpKtFEY
- https://symphony-of-the-stars.vercel.app/
