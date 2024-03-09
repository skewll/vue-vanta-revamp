<template>
  <div class="v-vanta-container" :id="vantaId">

    <slot/>

  </div>
</template>

<script>
export default {
  name: 'VueVanta',
  props: {
    // The Vanta.js effect to use
    effect: {
      type: String,
      default: 'waves'
    },
    // Options for the Vanta.js effect
    options: {
      type: Object,
      default: () => ({})
    },
    // URL for the Vanta.js script
    src: {
      type: String,
      default: 'https://cdn.jsdelivr.net/gh/tengbao/vanta@master/dist'
    },
    // ID of the container element for the effect
    vantaId: {
      type: String,
      default: 'vanta-bg'
    }
  },
  mounted() {
    // Initialize the Vanta.js effect
    this.setupVanta();
  },
  beforeUnmount() {
    // Destroy the Vanta.js effect
    this.destroyVanta();
  },
  setup(props) {
    // Variable to store the Vanta.js instance
    let vantaInstance = null;

    // Function to set up the Vanta.js effect
    const setupVanta = (effect = props.effect, options = props.options) => {
      //console.log("setting up Vanta")
      // Normalize the URL
      const normalize = (string) => (string.endsWith('/') ? string.slice(0, -1) : string);
      const url = normalize(props.src);

      //get Correct script
      let thisScript = null;
      if (effect !== 'trunk' && effect !== 'topology') {
        if (!document.getElementById('three')) {
          //console.log("appending three Script")
          thisScript = document.createElement('script');
          thisScript.id = 'three';
          thisScript.async = true;
          thisScript.defer = true;
          thisScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
          document.head.appendChild(thisScript);
        }
        // else { console.log("three Script already exists") }
      }
      else {
        if (!document.getElementById('p5')) {
          //console.log("appending p5 Script")
          thisScript = document.createElement('script');
          thisScript.id = 'p5';
          thisScript.async = true;
          thisScript.defer = true;
          thisScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
          document.head.appendChild(thisScript);
        }
        // else { console.log("p5 Script already exists") }
      }

      // console.log(`effect: ${effect}`)  
      // Check if the Vanta.js script already exists
      const vantaScript = document.getElementById(`${effect}-vanta`);
      if (vantaScript) {
      // Initialize the Vanta.js effect with the existing script
          // console.log(`${effect}-vanta Script already exists`)
          if (!vantaInstance) {
              // console.log(`no vantaInstance found`)
              vantaInstance = window.VANTA[effect.toUpperCase()](
                  Object.assign(options, {
                      el: `#${props.vantaId}`,
                  })
              ); 
              // console.log(`vantaInstance created`)
          }
          // else console.log(`vantaInstance already exists`)
          return;
      }

      if (thisScript) {
        //thisScript is new so wait for it to load before creating the Vanta.js script.
        thisScript.onload = () => {

          // Create and append the Vanta.js script
          const newVantaScript = document.createElement('script');
          newVantaScript.id = `${effect}-vanta`;
          newVantaScript.async = true;
          newVantaScript.defer = true;
          newVantaScript.src = `${url}/vanta.${effect}.min.js`;
          newVantaScript.onload = () => {
            if (!vantaInstance) {
              // console.log(`no vantaInstance found`)
              vantaInstance = window.VANTA[effect.toUpperCase()](
                Object.assign(options, {
                  el: `#${props.vantaId}`,
                })
              );
              // console.log(`vantaInstance created`)
            }
          };
          // console.log(`appending ${effect}-vanta Script`)
          document.head.appendChild(newVantaScript);
        }
      }
      else {


          // Create and append the Vanta.js script
          const newVantaScript = document.createElement('script');
          newVantaScript.id = `${effect}-vanta`;
          newVantaScript.async = true;
          newVantaScript.defer = true;
          newVantaScript.src = `${url}/vanta.${effect}.min.js`;
          newVantaScript.onload = () => {
            if (!vantaInstance) {
              // console.log(`no vantaInstance found`)
              vantaInstance = window.VANTA[effect.toUpperCase()](
                Object.assign(options, {
                  el: `#${props.vantaId}`,
                })
              );
              // console.log(`vantaInstance created`)
            }
          };
          // console.log(`appending ${effect}-vanta Script`)
          document.head.appendChild(newVantaScript);


      }
      
    };

    // Function to destroy the Vanta.js effect
    const destroyVanta = () => {
      if (vantaInstance) {
        // console.log("destroying vantaInstance")
        vantaInstance.destroy();
        vantaInstance = null;
      }
      // else console.log("no vantaInstance to destroy")
    };

    // Function to change the Vanta.js effect
    const changeEffect = (effect, options) => {
      if (vantaInstance) {
        destroyVanta();
      }
      setupVanta(effect, options);
    };

    // Function to change the Vanta.js effect options
    const changeOptions = (options) => {
      if (vantaInstance) {
        vantaInstance.setOptions(options);
      }
    };

    // Function to resize the Vanta.js effect
    const resizeEffect = () => {
      if (vantaInstance && typeof vantaInstance.resize === 'function') {
        vantaInstance.resize();
      }
    };

    // Return setup, destroy, changeEffect, changeOptions, and resizeEffect functions
    return {
      setupVanta,
      destroyVanta,
      changeEffect,
      changeOptions,
      resizeEffect,
    };
  },
};
</script>

<style>
/* CSS styles for the Vanta.js effect container */
 /* .v-vanta-container {
  width: 100vw;
  height: 100vh;
}
*/
</style>
