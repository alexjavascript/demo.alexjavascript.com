import * as THREE from 'three' 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

document.body.style.margin = '0';

const scene = new THREE.Scene()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/js/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer: THREE.AnimationMixer | null = null

gltfLoader.load(
  '/public/models/Fox/glTF/Fox.gltf',
  (gltf) => {
    console.log('success');
    console.log(gltf)
    
    gltf.scene.scale.set(0.025, 0.025, 0.025)

    mixer = new THREE.AnimationMixer(gltf.scene)
    const action = mixer.clipAction(gltf.animations[1])

    scene.add(gltf.scene)
    action.play()
  },
  () => console.log('progress'),
  () => console.log('error')
)

const light = new THREE.AmbientLight('white', 1)
light.position.setY(3)
scene.add(light)

const camera = new THREE.PerspectiveCamera()
camera.position.set(8, 8, 8)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

renderer.render(scene, camera)

document.body.append(renderer.domElement)

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

const clock = new THREE.Clock()
let previousTime = 0

const render = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  renderer.render(scene, camera)
  
  requestAnimationFrame(render)
  orbitControls.update()
  
  if (mixer) {
    mixer.update(deltaTime)
  }
}

render()
