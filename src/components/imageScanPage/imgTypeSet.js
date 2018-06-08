import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform
} from "react-native";
import { isEmpty } from "../../utils";

const window = Dimensions.get("window");

const _imgs = [
    require("../../images/pic/pic_one.jpg"),
    require("../../images/pic/pic_two.png"),
    require("../../images/pic/pic_seven.jpg"),
    require("../../images/pic/pic_six.png"),
    require("../../images/pic/pic_five.jpeg"),
    require("../../images/pic/pic_three.jpg"),
    require("../../images/pic/pic_egit.jpg"),
    // require("../../images/pic/pic_four.jpeg"),
    // require("../../images/pic/pic_one.jpg")
];


const styles = require("./styles");

class ImgTypeSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgLineA: [],
            imgLineB: [],
            imgLineC: []
        };
    }

    componentWillMount() {
        const _imgSize = _imgs.length;
        const _partSize = Math.ceil(_imgSize / 3);

        let _partArray = [];

        for (let i = 0, j = 1; i < _partSize; i++, j++) {
            _partArray = _partArray.concat(_imgs.slice(i * 3, j * 3 > _imgs.length ? _imgs.length : j * 3));

            console.log("_partArray -=--->", _partArray);
            if (i === 0) {
                this.setState({
                    imgLineA: _partArray
                });
            } else if (i === 1) {
                this.setState({
                    imgLineB: _partArray
                });
            } else if (i === 2) {
                this.setState({
                    imgLineC: _partArray
                });
            }
            _partArray = [];
        }

        console.log("_partSize -=->", _partSize);
    }

    visImgClick = (key) => {
        console.log("visImgClick key -=-->", key);
    };


    render() {
        console.log("ImgTypeSet props ->", this.props);
        console.log("ImgTypeSet state ->", this.state);
        const { imgLineA, imgLineB, imgLineC } = this.state;

        return (
          <View style={styles.orgView}>
              {
                  isEmpty(imgLineA)
                    ? null
                    :
                    <View style={styles.showImgViewV2}>
                        {
                            imgLineA.map((imgData, key) => {
                                return (
                                  <TouchableOpacity key={key}
                                                    style={{ flex: 1 }}
                                                    activeOpacity={0.8}
                                                    onPress={() => this.visImgClick(key)}>
                                      <Image
                                        key={key}
                                        style={{
                                            width: window.width / imgLineA.length - 5,
                                            height: window.width * 0.32,
                                            margin: 2
                                        }}
                                        source={imgData}
                                      />
                                  </TouchableOpacity>
                                );
                            })
                        }
                    </View>
              }

              {
                  isEmpty(imgLineB)
                    ? null
                    :
                    <View style={styles.showImgViewV2}>
                        {
                            imgLineB.map((imgData, key) => {
                                return (
                                  <TouchableOpacity key={key}
                                                    style={{ flex: 1 }}
                                                    activeOpacity={0.8}
                                                    onPress={() => this.visImgClick(key)}>
                                      <Image
                                        key={key}
                                        style={{
                                            width: window.width / imgLineB.length - 5,
                                            height: window.width * 0.32,
                                            margin: 2
                                        }}
                                        source={imgData}
                                      />
                                  </TouchableOpacity>
                                );
                            })
                        }
                    </View>
              }


              {
                  isEmpty(imgLineC)
                    ? null
                    :
                    <View style={styles.showImgViewV2}>
                        {
                            imgLineC.map((imgData, key) => {
                                return (
                                  <TouchableOpacity key={key}
                                                    style={{ flex: 1 }}
                                                    activeOpacity={0.8}
                                                    onPress={() => this.visImgClick(key)}>
                                      <Image
                                        key={key}
                                        style={{
                                            width: window.width / imgLineC.length - 5,
                                            height: window.width * 0.32,
                                            margin: 2
                                        }}
                                        source={imgData}
                                      />
                                  </TouchableOpacity>
                                );
                            })
                        }
                    </View>
              }
          </View>
        );
    }
}

export default ImgTypeSet;


// {
//     _imgs.map((imgData, key) => {
//         return (
//           <TouchableOpacity key={key}
//                             activeOpacity={0.8}
//                             onPress={() => this.visImgClick(key)}>
//               <Image
//                 key={key}
//                 style={{
//                     width: window.width * 0.32,
//                     height: window.width * 0.32,
//                     margin: 2
//                 }}
//                 source={imgData}
//               />
//           </TouchableOpacity>
//         );
//     })
// }