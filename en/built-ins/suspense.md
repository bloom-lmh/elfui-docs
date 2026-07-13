# Suspense

`Suspense` is used to undertake asynchronous setup or asynchronous content, providing three states of pending, resolved, and error.

```html
<Suspense>
  <template #default>
    <async-panel></async-panel>
  </template>
  <template #fallback> 加载中... </template>
  <template #error="{ error }"> 加载失败：{{ error.message }} </template>
</Suspense>
```

## Usage suggestions

Place the asynchronous boundary outside the page area or complex components, and do not wrap Suspense for every small node.
