import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { type Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any;
    }
  }
}

document.body.insertAdjacentHTML('beforeend', `
  <style>
    body {
      margin: 0;
      background: black;
    }
  </style>

  <div id="app"></div>
`)

const Scene = () => {
  const sphereRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    sphereRef.current.rotateY(Math.PI / 2 * delta)
  })

  return (
    <>
      <ambientLight intensity={0.32}/>
      <pointLight position={[1, 3, 3]} intensity={10} />

      <group>
        <mesh ref={sphereRef}>
          <boxGeometry />
          <meshStandardMaterial color="white" />
        </mesh>

        <mesh rotation-x={Math.PI * -0.5} position-y={-1}>
          <planeGeometry args={ [3, 3] }/>
          <meshStandardMaterial color="white" />
        </mesh>
      </group>
    </>
  )
}

const OrbitControl = () => {
  const { camera, gl } = useThree()

  return (
    <orbitControls args={[camera, gl.domElement]} />
  )
}

const App = () => {
  return (
    <Canvas style={{ 'height': '100vh'}}>
      <OrbitControl />
      <Scene />
    </Canvas>
  )
}

const root = createRoot(document.querySelector('#app') as HTMLDivElement)
root.render(<App />)