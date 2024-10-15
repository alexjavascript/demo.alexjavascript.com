import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, extend, useThree } from "@react-three/fiber";
import { createRoot } from "react-dom/client";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any
    }
  }
}

document.body.insertAdjacentHTML('beforeend', `
  <style>
    body {
      margin: 0;
      background-color: black;
    }
  </style>

  <div id="app"></div>
`)

extend({ OrbitControls })

const NUMBER_OF_TRIANGLES = 32
const NUMBER_OF_VERTICES_PER_TRIANGLE = 3
const NUMBER_OF_COORDINATES_PER_VERTEX = 3

const CustomObject = () => {
  const bufferGeometryRef = useRef<THREE.BufferGeometry>(null!)
  const verticesCount = NUMBER_OF_TRIANGLES * NUMBER_OF_VERTICES_PER_TRIANGLE
  const positions = useMemo(() => new Float32Array(verticesCount * NUMBER_OF_COORDINATES_PER_VERTEX).map(() => -0.5 + Math.random()), []) 
  
  useEffect(() => {
    bufferGeometryRef.current.computeVertexNormals()
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={bufferGeometryRef}>
        <bufferAttribute 
          attach="attributes-position"
          count={verticesCount}
          itemSize={NUMBER_OF_COORDINATES_PER_VERTEX}
          array={positions}
        />
      </bufferGeometry>
      <meshBasicMaterial color="tomato" wireframe />
      {/* <meshStandardMaterial color="tomato" side={THREE.DoubleSide} /> */}
    </mesh>
  )
}

const Scene = () => {
  return (
    <group>
      <pointLight position={[-2, -2, -2]} intensity={10}/>
      <pointLight position={[-2, -2, 2]} intensity={10}/>
      <pointLight position={[-2, -2, 2]} intensity={10}/>
      <pointLight position={[2, -2, 2]} intensity={10}/>

      <pointLight position={[-2, 2, -2]} intensity={10}/>
      <pointLight position={[-2, 2, 2]} intensity={10}/>
      <pointLight position={[-2, 2, 2]} intensity={10}/>
      <pointLight position={[2, 2, 2]} intensity={10}/>

      <CustomObject />

      <mesh>
        <boxGeometry />
        <meshBasicMaterial wireframe />
      </mesh>
    </group>
  )
}

const OrbitControl = () => {
  const { camera, gl } = useThree()

  camera.position.set(0, 0, 2)

  return <orbitControls args={ [camera, gl.domElement] } />
}

const App = () => {
  return (
    <Canvas style={{height: '100vh'}}>
      <OrbitControl />
      <Scene />
    </Canvas>
  )
}

const root = createRoot(document.querySelector('#app') as HTMLDivElement)
root.render(<App />)