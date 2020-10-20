import React, { Component, createRef } from 'react'
import { connect } from 'react-redux';
import './OBJRenderer.css'

import * as controlActionCreator from '../../../store/actions/control_actions'

import modelBackground from '../../../assets/button_background.png'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2.js'

class OBJRenderer extends Component {

    constructor(props) {

        super(props);
        this.renderNode = createRef()
    }


    componentDidMount() {

        // Destructuring values from props
        const {models} = this.props.buttonInfo;

        // on progress methods
        const onProgress = (xhr) => {
            if (xhr.lengthComputable) {
                if(xhr.loaded === xhr.total) {
                    console.log('Model 100% downloaded');
                    
                }
                
            }
        }

        // on error methods
        const onError = (error) => {
            console.log(error)
        }

        //load method
        const loadModel = () => {
            setTimeout(function () {
                wrapper.add(head);
                scene.add(wrapper);
            }, 10);
        }
        

        let scene, camera, renderer, light, light2, controls;


        // Creating a scene 
        scene = new THREE.Scene();

        // Creating camera
        camera = new THREE.PerspectiveCamera(10, window.innerWidth / (window.innerHeight * 0.9), 1, 1500);
        // let cameraHelper = new THREE.CameraHelper(camera);

        camera.position.set( 0, 0, 600 );
        

        // scene.add(cameraHelper)


        // Creating light source

        light = new THREE.DirectionalLight(0xffffff, 0.6);
        light.position.set(100, 100, 100);
        scene.add(light);
        
        light2 = new THREE.DirectionalLight(0x2b3c4e, 0.8);
        light2.position.set(-50, 0, 200);
        scene.add(light2);

        // Creating renderer

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, (window.innerHeight * 0.9));

        // Configuring renderer
    
        this.renderNode.current.appendChild(renderer.domElement)

        // Configuring loader

        let head;

        let manager = new THREE.LoadingManager(loadModel);

        let loader = new OBJLoader2(manager)

        let wrapper = new THREE.Object3D();

        loader.load(models , function (obj) {
            head = obj;
        }, onProgress, onError, null, false);

        wrapper.position.set(0, -10, 0)
        wrapper.rotation.x = (25/180 * Math.PI);


        controls = new OrbitControls(camera, renderer.domElement, );
        controls.enableRotate = false;
        controls.minDistance = 1;
        controls.maxDistance = 1000;
        
        

        //anmate method
        // let delta = 0;
        function animate() {
            wrapper.rotation.y += 0.01;
            renderer.render(scene, camera);
            controls.update()
            
            requestAnimationFrame(animate);
        }

        animate();


    }


    // Handle audio player control
    handlePlayerControl = () => {
        const { playAudio, pauseAudio, control } = this.props;

        if(control.playAudio) {
            pauseAudio();
        } else {
            playAudio();
        }
    }
    render() {

        const { images } = this.props.buttonInfo

        return (
            <div ref={this.renderNode} className="model-renderer" >
                <img src={images ?? modelBackground} className="model-bg-img" alt="default background media" />
            </div>
            
        )
    }
}


const mapStateToProps = state => {
    return {
        control: state.control
    }
}

const mapDispatchToProps = dispatch => {
    return {
        playAudio: () => dispatch(controlActionCreator.playAudio()),
        pauseAudio: () => dispatch(controlActionCreator.pauseAudio())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OBJRenderer)
