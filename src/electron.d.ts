/// <reference types="vite/client" />
/// <reference types="electron" />

declare interface Window {
    api: import('./preload').WindowApi;
}
