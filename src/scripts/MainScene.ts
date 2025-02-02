import { mouse2d } from './Mouse2D'
import { BackBuffer } from './core/BackBuffer'
import { RawShaderMaterial } from './core/ExtendedMaterials'
import vertexShader from './shader/quad.vs'

export class MainScene extends BackBuffer {
  constructor(renderer: THREE.WebGLRenderer, fragmentShader: string) {
    const material = new RawShaderMaterial({
      uniforms: {
        backBuffer: { value: null },
        resolution: { value: [renderer.domElement.width, renderer.domElement.height] },
        mouse: { value: mouse2d.position },
        time: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      glslVersion: '300 es',
    })

    super(renderer, material)
  }

  resize() {
    super.resize()
    this.uniforms.resolution.value = [this.size.width, this.size.height]
  }

  render(dt: number) {
    this.uniforms.backBuffer.value = this.backBuffer
    this.uniforms.mouse.value = mouse2d.position
    this.uniforms.time.value += dt
    super.render()
  }
}
