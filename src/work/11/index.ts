import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' 

const scene = new THREE.Scene()

const gltfLoader = new GLTFLoader()
let mesh: THREE.Object3D | null = null

gltfLoader.load(
  '/public/models/Duck/glTF-Binary/Duck.glb',
  (gltf) => {
    console.log('onLoad event', { gltf })

    const gltfScene = gltf.scene.children[0]

    const boundingBox = new THREE.Box3().setFromObject(gltfScene)
    const size = new THREE.Vector3()
    boundingBox.getSize(size)
    const height = size.y
    gltfScene.position.y = -1 * height / 2

    scene.add(gltfScene)

    mesh = gltfScene.children[0]
  },
  (progress) => {
    console.log('onProgress event', { progress })
  },
  (error) => {
    console.log('onError event', { error })
  }
)

const directionalLight = new THREE.DirectionalLight('white', 2.1)
const ambientLight = new THREE.AmbientLight('white', 0.9)
scene.add(directionalLight, ambientLight)

const camera = new THREE.PerspectiveCamera()
camera.position.set(6, 2, 2)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

const raycaster = new THREE.Raycaster()

document.body.style.margin = '0'
document.body.append(renderer.domElement)

const tick = () => {
  if (mesh) {
    const intersections = raycaster.intersectObject(mesh)
    console.log(mesh)

    if (intersections.length) {
      mesh.scale.set(1.2, 1.2, 1.2)
    } else {
      mesh.scale.set(1, 1, 1)
    }
  }
  
  renderer.render(scene, camera)
  orbitControls.update()

  requestAnimationFrame(tick)
}

tick()

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}, false)

window.addEventListener('mousemove', (event) => {
  const normalizedX = event.clientX / window.innerWidth * 2 - 1
  const normalizedY = -1 * (event.clientY / window.innerHeight * 2 - 1)
  
  const coords = new THREE.Vector2(normalizedX, normalizedY)

  raycaster.setFromCamera(coords, camera)
})