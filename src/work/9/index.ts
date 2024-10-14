import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' 

const scene = new THREE.Scene()
const meshes: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[] = Array.from({ length: 3}, (_, index) => {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({ wireframe: true }))
  mesh.position.set(index * 3 - 3, 0, 0)
  return mesh 
})

const raycaster = new THREE.Raycaster()

const camera = new THREE.PerspectiveCamera()

camera.position.set(0, 0, 16);

scene.add(...meshes, camera)

const renderer = new THREE.WebGLRenderer()

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

document.body.style.margin = '0'
document.body.append(renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}, false)

const clock = new THREE.Clock();

const tick = () => {
  meshes[0].position.y = Math.sin(clock.getElapsedTime() / 0.5) * 6;
  meshes[1].position.y = Math.sin(clock.getElapsedTime()) * 3;
  meshes[2].position.y = Math.sin(clock.getElapsedTime() * 0.5) * 6;

  const raycasterOrigin = new THREE.Vector3(-4, 0, 0)
  const raycasterDirection = new THREE.Vector3(10, 0, 0)
  raycasterDirection.normalize()
  raycaster.set(raycasterOrigin, raycasterDirection)
  const intersects: THREE.Intersection<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>[] = raycaster.intersectObjects(meshes)

  meshes.forEach(mesh => mesh.material.color.set('white'))
  
  let color = 'yellow'

  if (intersects.length === 2) {
    color = 'lightgreen'
  }

  if (intersects.length === 3) {
    color = 'green'
  }
  
  intersects.forEach(intersect => intersect.object.material.color.set(color))

  renderer.render(scene, camera)
  orbitControls.update()

  requestAnimationFrame(tick)
}

tick()
