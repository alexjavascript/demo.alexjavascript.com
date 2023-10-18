import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const updateScreen = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

const render = () => {
  renderer.render(scene, camera)
  orbitControls.update()
  window.requestAnimationFrame(render)
}

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera()
const renderer = new THREE.WebGLRenderer()
const orbitControls = new OrbitControls(camera, renderer.domElement)

camera.position.set(50, 50, 100)
camera.lookAt(new THREE.Vector3(0, 0, 0))
renderer.setPixelRatio(window.devicePixelRatio)
orbitControls.enableDamping = true
orbitControls.autoRotate = true
orbitControls.autoRotateSpeed = orbitControls.autoRotateSpeed * -0.5

const fontLoader = new FontLoader()

fontLoader.load('/public/fonts/redcollar.json', (font) => { 
  const material = new THREE.MeshNormalMaterial()

  const geometry = new TextGeometry('*', {
    font,
    size: 0.5,
    height: 0.1,
    curveSegments: 4,
    bevelEnabled: false
  }) 

  for (let i = 0; i < 500; i++) {    
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
    )

    mesh.rotation.set(
      Math.PI * 2 * Math.random(),
      Math.PI * 2 * Math.random(),
      Math.PI * 2 * Math.random(),
    )

    scene.add(mesh)
  }

  const symbols = ['A', 'V', 'O', 'I', 'D']
  let currentSymbol = symbols[Math.floor(Math.random() * symbols.length)]
  let mesh: THREE.Mesh;

  const renderLetter = () => {
    const availableSymbols = symbols.filter(symbol => symbol != currentSymbol)
    currentSymbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)]

    const geometry = new TextGeometry(currentSymbol, {
      font,
      size: 5,
      height: 3,
      curveSegments: 4,
      bevelEnabled: false
    })

    geometry.center()

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
  }

  renderLetter()

  const clock = new THREE.Clock()

  const updateLetter = () => {
    requestAnimationFrame(updateLetter)

    if (clock.getElapsedTime() < 1) {
      return
    }

    scene.remove(mesh)
    renderLetter()

    clock.elapsedTime = 0
  }

  updateLetter()
})

render()
updateScreen()
window.addEventListener('resize', updateScreen)
document.body.append(renderer.domElement)

document.body.style.margin = '0';
