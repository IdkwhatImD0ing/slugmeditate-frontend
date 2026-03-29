// three-extensions.d.ts
declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher } from 'three';
    
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement?: HTMLElement);
      object: Camera;
      domElement: HTMLElement;
      
      // Optional: add additional properties or methods as needed
      enableDamping: boolean;
      dampingFactor: number;
      update(): boolean;
    }
  }
  


declare module 'three/examples/jsm/loaders/PLYLoader' {
  import { BufferGeometry, Loader, LoadingManager } from 'three';

  export class PLYLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (geometry: BufferGeometry) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(data: ArrayBuffer | string): BufferGeometry;
  }
}

declare module '@mkkellogg/gaussian-splats-3d' {
  import { Camera, Scene, WebGLRenderer, Vector3 } from 'three';

  export class SplatLoader {
    constructor();
    load(url: string, onLoad?: () => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): Promise<any>;
  }

  export class SplatMesh {
    constructor(splats: any);
    material: any;
    geometry: any;
  }

  export class Viewer {
    constructor(options?: {
      camera?: Camera,
      scene?: Scene,
      renderer?: WebGLRenderer,
      selfDrivenMode?: boolean,
      useBuiltInControls?: boolean,
      rootElement?: HTMLElement,
      container?: HTMLElement,
      cameraUp?: [number, number, number],
      initialCameraPosition?: [number, number, number],
      initialCameraLookAt?: [number, number, number]
    });
    
    init(): void;
    render(): void;
    loadFile(url: string): Promise<void>;
    dispose(): void;
    start(): void;
    addSplatScene(url: string, options?: {
      splatAlphaRemovalThreshold?: number;
      showLoadingUI?: boolean;
      position?: [number, number, number];
      rotation?: [number, number, number, number];
      scale?: [number, number, number];
    }): Promise<void>;
  }
}
