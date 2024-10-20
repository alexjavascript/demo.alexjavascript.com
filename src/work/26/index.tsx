import { OrbitControls, PivotControls, useHelper } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { folder, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
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

const Background = (props: { background: string}) => {
  const { background } = props

  return <color args={ [background] } attach="background" />
}

const Scene = () => {
  const pointLightRef = useRef<THREE.PointLight>(null!)
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!)

  const { background } = useControls('Scene', {
    background: 'ivory'
  })

  const lightControls = useControls('Lights', {
    Point: folder({
      PointPosition: {
        value: { x: 0, y: 4, z: 0 },
        label: 'Position'
      },
      PointIntensity: {
        value: 50,
        label: 'Intensity' 
      },
      PointColor: {
        value: 'yellowgreen',
        label: 'Color'
      },
      PointVisible: {
        value: false,
        label: 'Visible'
      },
      Helper: folder({
        PointHelperSize: {
          value: 1,
          label: 'Point'
        },
        PointHelperColor: {
          value: 'red',
          label: 'Color'
        }
      })
    }, {
      collapsed: true
    }),
    Directional: folder({
      DirectionalRotation: {
        value: {x: 0, y: 0, z: 0},
        label: 'Rotation'
      },
      DirectionalIntensity: {
        value: 10,
        label: 'Intensity' 
      },
      DirectionalColor: {
        value: 'white',
        label: 'Color'
      },
      DirectionalVisible: {
        value: true,
        label: 'Visible'
      },
      Helper: folder({
        DirectionalHelperSize: {
          value: 5,
          label: 'Directional'
        },
        DirectionalHelperColor: {
          value: 'orange',
          label: 'Color'
        }
      })
    }),
    Ambient: folder({
      AmbientColor: {
        value: 'white',
        label: 'Color'
      },
      AmbientIntensity: {
        value: 1,
        label: 'Intensity'
      },
      AmbientVisible: {
        value: true,
        label: 'Visible'
      },
    }, {
      collapsed: true
    })
  })

  // @TODO 
  // The following does not work
  // if (lightControls.PointVisible) {
    useHelper(pointLightRef, THREE.PointLightHelper, lightControls.PointHelperSize, lightControls.PointHelperColor)
  // }
  // if (lightControls.DirectionalVisible) {
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, lightControls.DirectionalHelperSize, lightControls.DirectionalHelperColor)
  // }

  return (
    <>
      <Background background={background} />

      <group>
        <pointLight 
          ref={pointLightRef} 
          position={[ 
            lightControls.PointPosition.x, 
            lightControls.PointPosition.y, 
            lightControls.PointPosition.z 
          ]} 
          color={lightControls.PointColor}
          intensity={lightControls.PointIntensity} 
          visible={lightControls.PointVisible}
        />

        <directionalLight 
          ref={directionalLightRef}
          rotation={[ 
            // @TODO
            // The following does not work
            0,
            0,
            Math.PI / 2,
            // lightControls.DirectionalRotation.x, 
            // lightControls.DirectionalRotation.y, 
            // lightControls.DirectionalRotation.z 
          ]} 
          color={lightControls.DirectionalColor}
          intensity={lightControls.DirectionalIntensity} 
          visible={lightControls.DirectionalVisible}
        />

        <ambientLight 
          color={lightControls.AmbientColor} 
          intensity={lightControls.AmbientIntensity} 
          visible={lightControls.AmbientVisible} 
        />
      </group>     

      <group>
        <PivotControls anchor={[1, 1, 0]} lineWidth={1}>
          <mesh position={[-1, 0, 0]}>
            <sphereGeometry args={[0.8]}  />
            <meshStandardMaterial color="orange" />
          </mesh>
        </PivotControls>

        <mesh position={[1, 0, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="plum" />
        </mesh>

        <mesh rotation-x={Math.PI / 2 * -1} position-y={-1}>
          <planeGeometry args={ [5, 5] } />
          <meshStandardMaterial color="yellowgreen" side={THREE.DoubleSide}/>
        </mesh>
      </group>
    </>
  )
}

const Performance = () => {
  const { visibility } = useControls('Performance Monitor', {
    visibility: true
  })

  if (!visibility) {
    return null
  }

  return <Perf position="bottom-left" />
}

const App = () => {
  return (
    <>
      <Leva />
    
      <Canvas style={{ height: '100vh' }} camera={{
        position: [0, 8, 12]
      }}>
        <OrbitControls makeDefault />
        <Performance />
        <Scene />
      </Canvas>
    </>
  )
}


const root = createRoot(document.body.querySelector('#app') as HTMLDivElement)
root.render(<App />)