import { OrbitControls, PivotControls, TransformControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useRef } from 'react'
import { createRoot } from 'react-dom/client'
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
  const mesh01Ref = useRef<THREE.Mesh>(null!)
  const mesh02Ref = useRef<THREE.Mesh>(null!)
  const mesh03Ref = useRef<THREE.Mesh>(null!)
  const mesh04Ref = useRef<THREE.Mesh>(null!)

  return (
    <group>
      <pointLight intensity={15} position={[-4, 2, -2]}/>
      <pointLight intensity={15} position={[-4, 2, 2]}/>

      <pointLight intensity={15} position={[-2, 2, 2]}/>
      <pointLight intensity={15} position={[2, 2, -2]}/>

      <pointLight intensity={15} position={[4, 2, -2]}/>
      <pointLight intensity={15} position={[4, 2, 2]}/>

      <mesh position-x={-3} ref={mesh01Ref}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <TransformControls object={mesh01Ref} mode="translate" />

      <mesh position-x={-1} ref={mesh02Ref}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <TransformControls object={mesh02Ref} mode="scale" />

      <mesh position-x={1} ref={mesh03Ref}>
        <boxGeometry />
        <meshStandardMaterial color="tomato"/>
      </mesh>
      <TransformControls object={mesh03Ref} mode="rotate" />

      <PivotControls 
        anchor={[1, 1, 1]}
        depthTest={true}
        scale={2}
        lineWidth={1}
        axisColors={['red', 'blue', 'green']}
      >
        <mesh position-x={3}>
          <boxGeometry />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </PivotControls>

      <mesh rotation-x={Math.PI / -2} position-y={-1}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial side={THREE.DoubleSide} color="yellowgreen" />
      </mesh>
    </group>
  )
}
const App = () => {
  return (
    <Canvas style={{ height: '100vh'}} camera={{
      position: [0, 3, 7]
    }}>
      <OrbitControls makeDefault autoRotate autoRotateSpeed={-1} />
      <Scene />
    </Canvas>
  )
}

const root = createRoot(document.body.querySelector('#app') as HTMLDivElement)
root.render(<App />)