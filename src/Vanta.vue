<template>
    <div>
        <div class="vanta-container" :id="vantaId">
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueVanta',
    props: {
        effect: {
            type: String,
            default: () => 'waves'
        },
        options: {
            type: Object,
            default: () => ({})
        },
        src: {
            type: String,
            default: () => 'https://cdn.jsdelivr.net/gh/tengbao/vanta@master/dist'
        },
        vantaId: {
            type: String,
            default: () => 'vanta-bg'
        }
    },
    beforeMount() {
        this.setup()
    },
    methods: {
        setup() {
            // Normalize the url
            const normalize = string =>
                string.substr(-1) === '/'
                    ? string.substr(0, string.length - 1)
                    : string
            const url = normalize(this.src)
            // Create the script for threejs
            const threejs = document.createElement('script')
            threejs.async = true
            threejs.defer = true
            threejs.id = 'three'
            // get proper script.
            let effectsT = ['birds','fog','waves','clouds','clouds2','globe','net','cells','dots','rings','halo']
            let effectsP = ['trunk','topology']
            if (effectsT.includes(this.effect)) {
                threejs.src= 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
            }
            if (effectsP.includes(this.effect)) {
                threejs.src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js'
            }
            document.head.appendChild(threejs)

            // Create the script for Vanta
            threejs.onload = () => {
                const vantaScript = document.createElement('script')
                vantaScript.async = true
                vantaScript.defer = true
                vantaScript.id = 'vanta'
                vantaScript.src = `${url}/vanta.${this.effect}.min.js`
                document.head.appendChild(vantaScript)
                vantaScript.onload = () => {
                    window.VANTA[this.effect.toUpperCase()](
                        Object.assign(this.options, {
                            el: `#${this.vantaId}`
                        })
                    )
                }
            }
        }
    }
}
</script>