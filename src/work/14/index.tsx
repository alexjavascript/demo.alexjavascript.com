import { Canvas, useFrame } from '@react-three/fiber';
import React, { PropsWithChildren, useRef } from 'react'
import { createRoot } from "react-dom/client"
import { Group, Mesh } from 'three';

document.body.style.margin = '0'
document.body.insertAdjacentHTML('beforeend', `<div id="app"></div>`)

const root = createRoot(document.querySelector('#app') as HTMLBodyElement);

const MyCanvas = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <Canvas style={{ height: '100vh'}}>
      {children}
    </Canvas>
  )
}

const Scene = () => {
  const cubeRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y += delta / 4
  })

  return (
    <>
      <group ref={groupRef}>
        <mesh ref={cubeRef} scale={1.5} position-x={2}>
          <boxGeometry />
          <meshBasicMaterial color="purple" wireframe />
        </mesh>

        <mesh position-x={-2}>
          <sphereGeometry />
          <meshBasicMaterial color="orange" wireframe />
        </mesh>
      </group>

      <mesh scale={8} rotation-x={-1 * Math.PI / 2} position-y={-1}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow"  />
      </mesh>
    </>
  )
}

const App = () => {
  return (
    <MyCanvas>
      <Scene />
    </MyCanvas>
  )
}

root.render(<App />)