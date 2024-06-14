## Controlling the state

You can easily control the state of the value by binding it to the `value` prop.

You can also change the number of inputs through the `numOfInputs` prop.

<br/>

```js
<script>
	import SvelteOtp from ‘svelte-num-otp’;

  let value = '12345'

</script>

<SvelteOtp numOfInputs={5} bind:value />
```
