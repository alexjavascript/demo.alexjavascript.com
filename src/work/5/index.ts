import THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

document.body.style.margin = '0'

const textureLoader = new THREE.TextureLoader()

const scene = new THREE.Scene()

/**
 * Fog
 */

const fog = new THREE.Fog(0x262836, 4, 30)
scene.fog = fog

/**
 * Meshes
 */

// Grass
const grassGeometry = new THREE.PlaneGeometry(30, 30)
grassGeometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(grassGeometry.attributes.uv.array, 2)
)
const grassTextures: THREE.MeshStandardMaterialParameters = {
  map: textureLoader.load('/public/images/work/5/grass/color.jpg'),
  roughnessMap: textureLoader.load('/public/images/work/5/grass/roughness.jpg'),
  normalMap: textureLoader.load('/public/images/work/5/grass/normal.jpg'),
  aoMap: textureLoader.load('/public/images/work/5/grass/ambient-occlusion.jpg'),
}

Object.values(grassTextures).map((texture: THREE.Texture) => {
  texture.repeat.set(8, 8)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
})

const grassMaterial = new THREE.MeshStandardMaterial({
  ...grassTextures
})
const grass = new THREE.Mesh(grassGeometry, grassMaterial)
grass.rotation.x = -1 * Math.PI * 0.5
grass.receiveShadow = true;

// House

const houseGroup = new THREE.Group()

const wallsGeometry = new THREE.BoxGeometry(4, 2.5, 4)
wallsGeometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(wallsGeometry.attributes.uv.array, 2)
)
const wallsTextures: THREE.MeshStandardMaterialParameters = {
  map: textureLoader.load('/public/images/work/5/bricks/color.jpg'),
  roughnessMap: textureLoader.load('/public/images/work/5/bricks/roughness.jpg'),
  normalMap: textureLoader.load('/public/images/work/5/bricks/normal.jpg'),
  aoMap: textureLoader.load('/public/images/work/5/bricks/ambient-occlusion.jpg'),
}
const wallsMaterial = new THREE.MeshStandardMaterial({
  ...wallsTextures,
})

const walls = new THREE.Mesh(wallsGeometry, wallsMaterial)
walls.position.y = 1.25
walls.castShadow = true

const doorGeometry = new THREE.PlaneGeometry(2, 2, 128, 128)
doorGeometry.setAttribute(
  'uv2', 
  new THREE.Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
)
const doorTextures: THREE.MeshStandardMaterialParameters = {
  map: textureLoader.load('/public/images/work/5/door/color.jpg'),
  alphaMap: textureLoader.load('/public/images/work/5/door/alpha.jpg'),
  aoMap: textureLoader.load('/public/images/work/5/door/ambient-occlusion.jpg'),
  displacementMap: textureLoader.load('/public/images/work/5/door/height.jpg'),
  normalMap: textureLoader.load('/public/images/work/5/door/normal.jpg'),
  roughnessMap: textureLoader.load('/public/images/work/5/door/roughness.jpg')
}
const doorMaterial = new THREE.MeshStandardMaterial({
  ...doorTextures,
  transparent: true,
  displacementScale: 0.1,
})

const door = new THREE.Mesh(doorGeometry, doorMaterial)
door.position.y = 1
door.position.z = 2 + 0.01

const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5, 2, 4), new THREE.MeshStandardMaterial({ color: '#9c553f' }))
roof.rotation.y = Math.PI / 4
roof.position.y = 3.5

const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
const bushGeometry = new THREE.SphereGeometry()

const bushes = Array.from({ length: 4}, () => new THREE.Mesh(bushGeometry, bushMaterial))

bushes[0].scale.set(0.5, 0.5, 0.5)
bushes[0].position.set(1, 0.25, 2.5)

bushes[1].scale.set(0.3, 0.3, 0.3)
bushes[1].position.set(1.5, 0.15, 2.25)

bushes[2].scale.set(0.4, 0.4, 0.4)
bushes[2].position.set(-1, 0.25, 2.5)

bushes[3].scale.set(0.2, 0.2, 0.2)
bushes[3].position.set(-1.5, 0.15, 2.25)

bushes.forEach((bush) => (bush.castShadow = true))

// Graves
const graveGeometry = new THREE.BoxGeometry(0.75, 1, 0.25)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

const graves = Array
  .from({ length: 30}, () => new THREE.Mesh(graveGeometry, graveMaterial))
  .map((grave) => {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 10

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    grave.rotation.z = grave.rotation.z - Math.random() * Math.PI / 9 / 2 + Math.random() * Math.PI / 9
    grave.position.set(x, 0.3, z)

    grave.castShadow = true

    return grave
  })

houseGroup.add(
  walls,
  door,
  roof
)

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#ff7dff', 2, 3)
const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
const ghost3 = new THREE.PointLight('#ffff00', 2, 3)

ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

const ghostsGroup = new THREE.Group()
ghostsGroup.add(
  ghost1,
  ghost2,
  ghost3,
)

const clock = new THREE.Clock()

scene.add(
  ghost1,
  houseGroup,
  ghostsGroup,
  ...bushes,
  ...graves
)

/**
 * Lights
 */


const directionalLight = new THREE.DirectionalLight(0xb9d5ff, 0.12)
directionalLight.position.set(4, 9, 5)

const pointLight = new THREE.PointLight('#ff7d47', 2, 7)
pointLight.position.set(0, 2.2, 2.7)
pointLight.castShadow = true

/**
 * Scene
 */

scene.add(
  grass,
  houseGroup,
  directionalLight,
  pointLight
)

/**
 * Camera
 */

const perspectiveCamera = new THREE.PerspectiveCamera()
perspectiveCamera.position.set(5, 5, 10)
perspectiveCamera.aspect = window.innerWidth / window.innerHeight
perspectiveCamera.updateProjectionMatrix()

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x262836)

renderer.shadowMap.enabled = true

/**
 * Orbit Controls
 */

const orbitControls = new OrbitControls(perspectiveCamera, renderer.domElement)
orbitControls.enableDamping = true
// orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = -orbitControls.autoRotateSpeed

/**
 * Rendering
 */

const render = () => {
  const time = clock.getElapsedTime();

  ghost1.position.set(
    Math.cos(-time) * 4,
    0.5 + Math.sin(time * 1) * 0.5,
    Math.sin(-time) * 4,
  )

  ghost2.position.set(
    Math.cos(time) * 5,
    0.5 + Math.sin(time * 2) * 0.5,
    Math.sin(time) * 5,
  )

  ghost3.position.set(
    Math.cos(-time / 2) * 7,
    0.5 + Math.sin(time * 3) * 0.5,
    Math.sin(-time / 2) * 7,
  )

  renderer.render(scene, perspectiveCamera)

  orbitControls.update()

  window.requestAnimationFrame(render)
}

render()

document.body.append(renderer.domElement)

window.addEventListener('resize', () => {
  perspectiveCamera.aspect = window.innerWidth / window.innerHeight
  perspectiveCamera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
