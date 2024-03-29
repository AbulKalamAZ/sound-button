import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2.js";
import imgNegX from "../../../assets/negx.jpg";
import imgNegY from "../../../assets/negy.jpg";
import imgNegZ from "../../../assets/negz.jpg";
import imgPosX from "../../../assets/posx.jpg";
import imgPosY from "../../../assets/posy.jpg";
import imgPosZ from "../../../assets/posz.jpg";
import * as controlActionCreator from "../../../store/actions/control_actions";
import "./OBJRenderer.css";





class OBJRenderer extends Component {
  constructor(props) {
    super(props);
    this.renderNode = createRef();
    this.state = {
      isModelLoaded: false,
    };
  }

  componentDidMount() {
    // Destructuring values from props
    const {
      models,
      rotateModelByMouse,
      changeBackground,
      noBackground,
      backgroundColor,
      backgroundImageForScene,
      lightColor,
      luminosityLight,
      hidePlatform,
      scale,
      posX,
      posY,
      posZ,
      negX,
      negY,
      negZ,
    } = this.props.buttonInfo;

    // on progress methods
    const onProgress = (xhr) => {
      if (xhr.lengthComputable) {
        if (xhr.loaded === xhr.total) {
          console.log("Model 100% downloaded");
          this.setState({
            isModelLoaded: true,
          });
        }
      }
    };

    // on error methods
    const onError = (error) => {
      console.log(error);
    };

    //load method
    const loadModel = () => {
      setTimeout(function () {
        wrapper.add(head);
        scene.add(wrapper);
      }, 10);
    };

    // on window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    let scene,
      camera,
      renderer,
      directionalLight,
      light,
      light2,
      light3,
      light4,
      controls,
      backgroundLoader,
      texture,
      plane;

    // Explixitly setting body backgrundColor property

    if (backgroundImageForScene) {
      document.querySelector(
        "body"
      ).style.background = `url(${backgroundImageForScene})`;
      document.querySelector("body").style.backgroundaAttachment = "fixed";

      document.querySelector("body").style.backgroundRepeat = "no-repeat";
      document.querySelector("body").style.backgroundSize = "cover";
      document.querySelector("body").style.backgroundPosition = "center center";
    } else {
      document.querySelector("body").style.backgroundColor = backgroundColor;
    }

    // Creating renderer

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: noBackground ? true : false,
    });
    // Configuring renderer

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    this.renderNode.current.appendChild(renderer.domElement);

    // Creating a scene
    scene = new THREE.Scene();

    // Creating camera
    camera = new THREE.PerspectiveCamera(60, 1920 / 1080, 1.0, 1000.0);

    camera.position.set(0, 50, 150);

    // Creating light source

    directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(0, 100, 0);
    directionalLight.castShadow = true;

    if (!noBackground) scene.add(light);

    if (lightColor) {
      light = new THREE.PointLight(lightColor, luminosityLight);
      light.position.set(0, 300, 500);
      scene.add(light);

      light2 = new THREE.PointLight(lightColor, luminosityLight);
      light2.position.set(500, 100, 0);
      scene.add(light2);

      light3 = new THREE.PointLight(lightColor, luminosityLight);
      light3.position.set(0, 100, -500);
      scene.add(light3);

      light4 = new THREE.PointLight(lightColor, luminosityLight);
      light4.position.set(-500, 300, 0);
      scene.add(light4);
    }
    // Configuring loader

    let head;

    let manager = new THREE.LoadingManager(loadModel);

    let loader = new OBJLoader2(manager);

    let wrapper = new THREE.Object3D();

    loader.load(
      models,
      function (obj) {
        obj.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
          }

          if (scale) node.scale.setScalar(scale);
        });
        head = obj;
      },
      onProgress,
      onError,
      null,
      false
    );

    wrapper.position.set(0, 0, 0);
    // wrapper.rotation.x = (25 / 180) * Math.PI;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    // Background loader
    backgroundLoader = new THREE.CubeTextureLoader();

    // Checking whether user sent background image or not
    if (changeBackground) {
      if (posX && posY && posZ && negX && negY && negZ) {
        texture = backgroundLoader.load([posX, negX, posY, negY, posZ, negZ]);
      } else {
        texture = backgroundLoader.load([
          imgPosX,
          imgNegX,
          imgPosY,
          imgNegY,
          imgPosZ,
          imgNegZ,
        ]);
      }
    } else {
      texture = backgroundLoader.load([
        imgPosX,
        imgNegX,
        imgPosY,
        imgNegY,
        imgPosZ,
        imgNegZ,
      ]);
    }

    scene.background = !noBackground && texture;

    // Creating plane

    if(!hidePlatform) {
      
      plane =
      !noBackground &&
      new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500, 10, 10),
        new THREE.MeshStandardMaterial({
          color: 0x202020,
        })
      );

      if (!noBackground) {
        plane.castShadow = true;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(0, 0, 0);
        scene.add(plane);
      }
    }

    //anmate method
    // let delta = 0;
    function animate() {
      if (!rotateModelByMouse) wrapper.rotation.y += 0.01;

      renderer.render(scene, camera);
      controls.update();

      requestAnimationFrame(animate);
    }

    animate();

    // On window resize
    window.addEventListener(
      "resize",
      () => {
        onWindowResize();
      },
      false
    );
  }

  // Handle audio player control
  handlePlayerControl = () => {
    const { playAudio, pauseAudio, control } = this.props;
    const { playAudioAutomatically } = this.props.buttonInfo;

    if (playAudioAutomatically) {
    } else {
      if (control.playAudio) {
        pauseAudio();
      } else {
        playAudio();
      }
    }
  };

  // handle open modal method

  handleOpenModal = () => {
    if (this.props.buttonInfo.redirectTo) {
      if (this.props.buttonInfo.openLinkInAniFrame) {
        this.props.showIframe();
      } else {
        window.open(this.props.buttonInfo.redirectTo);
      }
    }
  };
  render() {
    // const { images } = this.props.buttonInfo;
    const { isModelLoaded } = this.state;

    return (
      <div
        ref={this.renderNode}
        className='model-renderer'
        onClick={this.handlePlayerControl}
        onDoubleClick={this.handleOpenModal}
      >
        {!isModelLoaded ? (
          <CircularProgress
            size={80}
            className='model-loader-indicator'
            color='primary'
          />
        ) : null}
        {/* <img
                    src={images ?? modelBackground}
                    className="model-bg-img"
                    alt="default background media"
                /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    control: state.control,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playAudio: () => dispatch(controlActionCreator.playAudio()),
    pauseAudio: () => dispatch(controlActionCreator.pauseAudio()),
    showIframe: () => dispatch(controlActionCreator.showIframe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OBJRenderer);
