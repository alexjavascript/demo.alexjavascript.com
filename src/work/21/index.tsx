import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { createRoot } from "react-dom/client";
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three'

document.body.insertAdjacentHTML('beforeend', `
  <style>
    body {
      margin: 0;
    }
  </style>  

  <div id="app"></div>
`)

const Scene = () => {
  const boxRef = useRef<THREE.Mesh>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    boxRef.current.rotateX(Math.PI / 4 * delta)
    boxRef.current.rotateY(Math.PI / 4 * delta)
    boxRef.current.rotateZ(Math.PI / 4 * delta)
  })

  return (
    <group>
      <pointLight intensity={10} position={[-2, 2, -2]} />
      <pointLight intensity={10} position={[-2, 2, 2]} />
      <pointLight intensity={10} position={[2, 2, -2]} />
      <pointLight intensity={10} position={[2, 2, 2]} />

      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.6]} />
        <meshStandardMaterial color="orange" />
      </mesh>
        
      <mesh ref={boxRef}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh rotation-x={Math.PI / -2} position-y={-1}>
        <planeGeometry args={ [5, 5] } />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

const App = () => {
  return (
    <Canvas style={{ height: '100vh' }} camera={{
      position: [0, 2, 5],
    }}>
      <OrbitControls 
        makeDefault
        enableDamping 
        autoRotate 
        autoRotateSpeed={-1} 
      />
      <Scene />
    </Canvas>
  )
}

const root = createRoot(document.querySelector('#app') as HTMLDivElement)
root.render(<App />)