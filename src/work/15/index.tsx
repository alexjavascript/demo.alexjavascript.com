import React, { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, extend, useThree, ThreeElements } from '@react-three/fiber'
import { type Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any;
    }
  }
}

extend({ OrbitControls })

const Scene = () => {
  const boxRef = useRef<Mesh>(null!)
  const sphereRef = useRef<Mesh>(null!)

  const { camera, gl } = useThree()

  useFrame((_, delta) => {
    boxRef.current.rotateY(Math.PI / 4 * delta)
    sphereRef.current.rotateX(-1 * Math.PI / 4 * delta)
  })

  return (
    <>
      <orbitControls args={ [camera, gl.domElement] } />

      <group>
        <mesh ref={boxRef} position-x={-1}>
          <boxGeometry />
          <meshBasicMaterial color="brown" wireframe />
        </mesh>
        <mesh ref={sphereRef} position-x={1} scale={0.65}>
          <sphereGeometry />
          <meshBasicMaterial color="purple" wireframe />
        </mesh>
        <mesh position-y={-1} rotation-x={Math.PI * -0.5} scale={5}>
          <planeGeometry />
          <meshBasicMaterial color="yellowgreen" />
        </mesh>
      </group>
    </>
  )
}

const App = () => {
  return (
    <Canvas style={{"height": "100vh"}}>
      <Scene />
    </Canvas>
  )
}
document.body.insertAdjacentHTML('beforeend', `
  <style>
    body {
      margin: 0;
    }
  </style>  

  <div id="app"></div>
`)

const root = createRoot(document.body.querySelector('#app') as HTMLDivElement)

root.render(<App />)