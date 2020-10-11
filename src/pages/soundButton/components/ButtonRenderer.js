import React, { Component, createRef } from 'react'

import * as THREE from 'three'

import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2.js'

export default class ButtonRenderer extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isLoading: true
        }
        this.renderNode = createRef()
    }

    componentDidMount() {

        // Destructuring values from props
        const {width, height, model} = this.props;
        

        // Creating a scene 
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
        var renderer = new THREE.WebGLRenderer({
            alpha: true
        });

        // Configuring renderer
        renderer.setSize(width, height);
        this.renderNode.current.appendChild(renderer.domElement)

        //Moved loader.load and passed correct sync args
        var head;

        var manager = new THREE.LoadingManager(loadModel);
        
        var loader = new OBJLoader2(manager);

        loader.load(model , function (obj) {
            head = obj;
        }, onProgress, onError, null, false);

        
        var wrapper = new THREE.Object3D();


        // Defining required methods
        function onError(error) {
            console.log(error)
        }

        function onProgress(xhr) {
            if (xhr.lengthComputable) {
                if(xhr.loaded === xhr.total) {
                    console.log('Model 100% downloaded');
                }
                
            }
        }

        function loadModel() {
            setTimeout(function () {
                wrapper.add(head);
                scene.add(wrapper);
            }, 10);
        }

        // Adding light
        var light = new THREE.DirectionalLight(0xffffff, 1.0);
        light.position.set(100, 100, 100);
        scene.add(light);


        // Setting camera a bit out of it
        camera.position.z= 25;
        camera.position.y= 5;
        camera.position.x= 0;


        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        
        

        animate();

    }

    render() {
        return (
            <div ref={this.renderNode} className="3d-button-renderer" style={{zIndex: "999"}}>
            </div>
        )
    }
}
