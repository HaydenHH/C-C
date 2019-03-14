




function myObject(){
    let s,camera,renderer,loader;
    let obGroup,obGeo
    s = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,0.1,1000)
    camera.position.set(0,-5,-10)
    camera.lookAt(0,5,5)
    s.add(camera)

    var light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 50, 50, 50 );
    s.add( light );

    renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setClearColor(new THREE.Color(0xEEEEEE));

    let div = document.getElementById('threeScene')
    div.appendChild( renderer.domElement );

    let cube = new THREE.BoxBufferGeometry(1,1,1)
    let mtr = new THREE.MeshNormalMaterial()

    let mesh = new THREE.Mesh(cube,mtr)
    // s.add(mesh)

    obGroup = new THREE.Group()


    loader = new THREE.GLTFLoader();
    loader.load(
        "js/keke.glb",
        function ( gltf ) {
            obGeo = gltf.scene.children[0].geometry
            createMore()
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            console.log(renderer);
        },
    );

    function createMore(){
        let count = 230
        let mtr = new THREE.MeshNormalMaterial()
        for(let i=0;i<count;i++ ){
            let geo = obGeo.clone()
            let scale = Math.random()*3
            let trans = (x)=> Math.random()*x /7


            geo.scale(scale,scale,scale)
            geo.translate(trans(count),trans(count),trans(count))
            let mesh = new THREE.Mesh(geo,mtr)
            obGroup.add(mesh)
        }
        s.add(obGroup)
    }


    let control = new THREE.OrbitControls(camera,renderer.domElement)

    function animate() {
        requestAnimationFrame( animate)

          obGroup.rotation.x += 1/1000

        for(let i in obGroup.children){
            obGroup.children[i].rotation.z += 1/10/i
        }

        renderer.render(s,camera)
    }
    animate()





}
