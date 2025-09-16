# Xeno Insights — UI (v4, no external store)


This build **removes useSyncExternalStore**, using **Context + Reducers** only — eliminating any chance of the “Maximum update depth exceeded” loop.

## Run
```bash
npm install
npm run dev
# open the URL (usually http://localhost:5173)
```

If you ran older versions, clear storage:
- Visit `/clear`, or
- DevTools → Application → Local Storage → delete `xeno_ui_auth_v4` and `xeno_ui_data_v4`.
