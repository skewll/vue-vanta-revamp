# vue-vanta-revamp: Add Animated Vanta.js Backgrounds to Your Vue and Nuxt Projects

> **[vue-vanta-revamp](https://www.npmjs.com/package/vue-vanta-revamp)** is a revamped version of the original **[vue-vanta](https://www.npmjs.com/package/vue-vanta)** package, offering a seamless way to integrate animated Vanta.js backgrounds into your Vue and Nuxt projects. With Vue-vanta-revamp, you can enhance your applications with stunning visual effects in just a few lines of code.


## Features

- **Simplified Setup**: Easily add animated Vanta.js backgrounds to your projects.
- **Automatic Initialization and Destruction**: Vanta.js setup is handled automatically on mount and destroyed on unmount.
- **Efficient Script Handling**: P5 and/or THREE scripts are appended to the DOM only once, and the Three.js effect script loads only once.
- **Versatile Customization**: Change effect options, switch effects, and resize effects with ease.

|    Methods(params)     |    Description   |   params Type   |	Required	|
| -----------------  | ---------------- | :--------: | :----------: |
| **setupVanta**(*effect, options*) | Sets up Vanta.js with the specified effect and options. | String,Object | optional |
| **destroyVanta**()         | Destroys the Vanta.js instance. | n/a | -- |
| **changeOptions**(*newOptions*)         | Changes the effect options. | Object | required |
| **changeEffect**(*newEffect, newOptions*)         | Changes the Vanta.js effect and options. | String,Object | required |
| **resizeEffect**()         | Not entirely clear how this works yet, but it's available. | n/a | -- |   


## Installation
```bash
npm i vue-vanta-revamp
```

## Usage
### Quick use example for Nuxt3
_/components/Background.vue_
```vue
<template>
  <div>   
      <v-vanta></v-vanta>
  </div>
</template>

<script>
import VVanta from 'vue-vanta-revamp';
export default {
  components: { VVanta }
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


_/pages/index.vue_
```vue
<template>
  <div>
    <Background></Background>
    <div>
      <h1>skewll.com</h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>
```


### A little more advanced example usage for Nuxt3
_/components/Background.vue_
```vue
<template>
    <div>   
        <v-vanta ref="vantaInstance" vantaId="vanta-bg" :effect=effect :options=options>
            <slot/>
        </v-vanta>
    </div>
</template>
  
<script>
import VVanta from 'vue-vanta-revamp';
export default {
    components: { VVanta },
    data() {
        return {
            effect: 'waves',
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
    },
    methods: {
        setupVanta(effect = this.effect, options = this.options) {
            this.$refs.vantaInstance.setupVanta(effect, options);
        },
        destroyVanta() {
          this.$refs.vantaInstance.destroyVanta();
        },
        changeOptions(newOptions) {
            this.$refs.vantaInstance.changeOptions(newOptions);
        },
        changeEffect(newEffect, newOptions) {
            this.$refs.vantaInstance.changeEffect(newEffect,newOptions);
        },
        resizeEffect() {
            this.$refs.vantaInstance.resizeEffect();
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


_/pages/index.vue_
```vue
<template>
  <div>

    <Background>Hi I will become background text via the slot</Background>
  
    <div>
      <h1>skewll.com</h1>
    </div>
    
    <div>
      <ul>
        <li>
          <button @click="this.$refs.vantaBackground.destroyVanta();">-destroy-</button>
        </li>
        <li>
          <button @click="this.$refs.vantaBackground.setupVanta();">-setup-</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
```
## Parameters

The following parameters can be passed into the component:

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| vantaId  | #id of your vanta element | String | vanta-bg |
| effect   | See all effects at vantajs.com | String | waves |
| options  | Each effect has its own specific parameters. Check them out at vantajs.com | Object |  |

## Methods

The component provides the following methods:

- **setupVanta(effect, options)**: Sets up Vanta.js with the specified effect and options.
- **destroyVanta()**: Destroys the Vanta.js instance.
- **changeOptions(newOptions)**: Changes the effect options.
- **changeEffect(newEffect, newOptions)**: Changes the Vanta.js effect and options.
- **resizeEffect()**: Not entirely clear how this works yet, but it's available.

## Notes

- I found inconsistent behavior when using the `changeEffect` method with certain Vanta.js effects. This may be an issue with the Vanta.js library itself.
- If you want to completely destroy everything for some reasom, not just the background instace, you can delete the scripts from the DOM. The possible script IDs are 'p5', 'three', and the specific `${effect}-vanta` effect(s) you've intialized.
  