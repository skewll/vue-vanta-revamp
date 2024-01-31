# vue-vanta-revamp - 2024 revamp of vue-vanta npm

> Add animated vanta.js backgrounds to vue and nuxt projects in a few lines of code.

### How to use?
```bash
npm install vue-vanta-revamp
```

### Example for Nuxt3

/components/Background.vue
```vue
<template>
    <div>   
        <v-vanta vantaId="vanta-bg" effect="waves" :options=options></v-vanta>
    </div>
</template>
  
<script>
import VVanta from 'vanta-vue-revamp';
export default {
    components: { VVanta },
    data() {
        return {
            options: {
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x0,
                shininess: 85.00,
                waveHeight: 6.00,
                waveSpeed: 1,
                zoom: .75,
            }
        }
    }
}
</script>
  
<style>
#vanta-bg {
    z-index: -1000;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
  }
</style>

```


/pages/index.vue
```vue
<template>
  <div>
    <Background />
    <div>
      <h1>skewll.com</h1>
    </div>
  </div>
</template>


<script>
export default {}
</script>

<style>
</style>
```

### Options
|    Property    |    Description   |   type   |	default	|
| -----------------  | ---------------- | :--------: | :----------: |
| vantaId | #id of your vanta element | String | vanta-bg |
| effect         | many | String | waves |
| options  | Each effect has its own specific parameters. Explore them all at www.vantajs.com! | Object | |
